import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { detectEmbeddingModel, chunkMdxContent, EMBEDDING_MODELS, invalidateChunkCache } from "@/lib/rag";

function findMdxFiles(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMdxFiles(fullPath));
    } else if (entry.name.endsWith(".mdx")) {
      results.push(fullPath);
    }
  }
  return results;
}

const prisma = new PrismaClient();
const OLLAMA_URL = "http://localhost:11434";
const CONTENT_DIR = path.join(process.cwd(), "content", "topics");

// GET — indexing status
export async function GET() {
  let embeddingModel: string | null = null;
  let ollamaAvailable = false;

  try {
    const res = await fetch(`${OLLAMA_URL}/api/tags`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      const models: string[] = (data.models ?? []).map((m: { name: string }) => m.name);
      embeddingModel = detectEmbeddingModel(models);
      ollamaAvailable = true;
    }
  } catch {
    // Ollama not running
  }

  const count = await prisma.contentChunk.count();

  // Compute how many MDX files are not yet indexed
  const allFiles = findMdxFiles(CONTENT_DIR);
  const indexedPaths = count > 0
    ? (await prisma.contentChunk.findMany({ select: { filePath: true }, distinct: ["filePath"] })).map((r) => r.filePath)
    : [];
  const indexedSet = new Set(indexedPaths);
  const newFileCount = allFiles.filter(
    (f) => !indexedSet.has(path.relative(process.cwd(), f))
  ).length;

  return NextResponse.json({
    count,
    embeddingModel,
    ollamaAvailable,
    isReady: count > 0,
    newFileCount,
    supportedModels: EMBEDDING_MODELS,
  });
}

// POST — run indexing (SSE streaming progress)
// body: { incremental?: boolean } — if true, skip files already indexed
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const incremental: boolean = body.incremental === true;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      try {
        // Detect embedding model + optional chat model for summary pre-generation
        let embeddingModel: string | null = null;
        let chatModel: string | null = null;
        try {
          const res = await fetch(`${OLLAMA_URL}/api/tags`, { signal: AbortSignal.timeout(5000) });
          if (res.ok) {
            const data = await res.json();
            const models: string[] = (data.models ?? []).map((m: { name: string }) => m.name);
            embeddingModel = detectEmbeddingModel(models);
            // Pick the first non-embedding model for summary generation
            chatModel = models.find(
              (m) => !EMBEDDING_MODELS.some((prefix) => m.startsWith(prefix))
            ) ?? null;
          }
        } catch {
          send({ error: "ollama_unavailable", message: "Ollama에 연결할 수 없습니다." });
          controller.close();
          return;
        }

        if (!embeddingModel) {
          send({
            error: "embedding_model_unavailable",
            message: `임베딩 모델이 없습니다. 아래 명령어로 설치해주세요.`,
            pullCommand: `ollama pull ${EMBEDDING_MODELS[0]}`,
          });
          controller.close();
          return;
        }

        // Find all MDX files, optionally skip already-indexed ones
        let files = findMdxFiles(CONTENT_DIR);
        if (incremental) {
          const indexed = await prisma.contentChunk.findMany({
            select: { filePath: true },
            distinct: ["filePath"],
          });
          const indexedSet = new Set(indexed.map((r) => r.filePath));
          files = files.filter((f) => !indexedSet.has(path.relative(process.cwd(), f)));
        }
        const total = files.length;

        send({ status: "start", total, embeddingModel, chatModel });

        let progress = 0;
        for (const filePath of files) {
          const raw = fs.readFileSync(filePath, "utf-8");
          const { data: frontmatter, content } = matter(raw);

          const title = (frontmatter.title as string) ?? path.basename(filePath, ".mdx");
          const topic = (frontmatter.topic as string) ?? path.dirname(filePath).split("/").pop() ?? "";
          const relPath = path.relative(process.cwd(), filePath);

          const chunks = chunkMdxContent(raw, title);

          for (let chunkIdx = 0; chunkIdx < chunks.length; chunkIdx++) {
            const chunkText = chunks[chunkIdx];

            // Get embedding from Ollama
            let embedding: number[];
            try {
              const embRes = await fetch(`${OLLAMA_URL}/api/embeddings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ model: embeddingModel, prompt: chunkText }),
                signal: AbortSignal.timeout(30000),
              });
              if (!embRes.ok) throw new Error(`Embedding failed: ${embRes.status}`);
              const embData = await embRes.json();
              embedding = embData.embedding;
            } catch (err) {
              send({ error: "embedding_failed", file: relPath, chunkIdx, message: String(err) });
              continue;
            }

            // Pre-generate tags using chat model (only for chunkIdx 0)
            let tags: string[] | null = null;
            if (chunkIdx === 0 && chatModel) {
              try {
                const tagRes = await fetch(`${OLLAMA_URL}/api/chat`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    model: chatModel,
                    messages: [
                      {
                        role: "system",
                        content:
                          "다음 CS 강의 문서의 핵심 키워드와 관련 용어를 20-30개 추출하여 JSON 배열로만 반환하세요. 한국어·영어 키워드, 동의어, 약어, 상위/하위 개념 모두 포함. 출력 형식: [\"키워드1\", \"keyword2\"] — 배열만, 설명 없이.",
                      },
                      { role: "user", content: chunkText },
                    ],
                    stream: false,
                  }),
                  signal: AbortSignal.timeout(30000),
                });
                if (tagRes.ok) {
                  const raw: string = ((await tagRes.json()).message?.content as string) ?? "";
                  const match = raw.match(/\[[\s\S]*\]/);
                  if (match) tags = JSON.parse(match[0]) as string[];
                }
              } catch {
                // tags stays null
              }
            }

            // Pre-generate summary using chat model (if available)
            let summary: string | null = null;
            if (chatModel) {
              try {
                const sumRes = await fetch(`${OLLAMA_URL}/api/chat`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    model: chatModel,
                    messages: [
                      {
                        role: "system",
                        content: "반드시 한국어로만 답변하세요. CS 개념 설명을 2-3문장으로 핵심만 요약합니다. 불필요한 서두 없이 바로 요약 내용만 출력하세요.",
                      },
                      {
                        role: "user",
                        content: `다음 내용을 한국어로 2-3문장으로 요약:\n\n${chunkText}`,
                      },
                    ],
                    stream: false,
                  }),
                  signal: AbortSignal.timeout(60000),
                });
                if (sumRes.ok) {
                  const sumData = await sumRes.json();
                  summary = (sumData.message?.content as string | undefined) ?? null;
                }
              } catch {
                // summary stays null — live LLM fallback at search time
              }
            }

            // Upsert into DB
            await prisma.contentChunk.upsert({
              where: { filePath_chunkIdx: { filePath: relPath, chunkIdx } },
              create: {
                filePath: relPath,
                topic,
                title,
                chunkIdx,
                chunkText,
                embedding: JSON.stringify(embedding),
                summary,
                tags: tags ? JSON.stringify(tags) : null,
              },
              update: {
                topic,
                title,
                chunkText,
                embedding: JSON.stringify(embedding),
                summary,
                tags: tags ? JSON.stringify(tags) : null,
              },
            });
          }

          progress++;
          send({ status: "progress", progress, total, file: relPath, chunks: chunks.length });
        }

        const finalCount = await prisma.contentChunk.count();
        invalidateChunkCache();
        send({ status: "done", progress: total, total, totalChunks: finalCount });
      } catch (err) {
        send({ error: "unexpected", message: String(err) });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
