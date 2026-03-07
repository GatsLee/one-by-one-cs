import { NextRequest } from "next/server";
import { searchChunks, searchByTitle, searchByTags, detectEmbeddingModel, EMBEDDING_MODELS } from "@/lib/rag";

const OLLAMA_URL = "http://localhost:11434";

export async function POST(req: NextRequest) {
  const { query, model } = await req.json().catch(() => ({ query: "", model: "" }));

  if (!query?.trim()) {
    return new Response(JSON.stringify({ type: "error", message: "검색어를 입력하세요." }), { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      try {
        // 1. Detect embedding model + chat model (single tags fetch)
        let embeddingModel: string | null = null;
        let chatModel = model?.trim() || "";
        try {
          const tagsRes = await fetch(`${OLLAMA_URL}/api/tags`, { signal: AbortSignal.timeout(3000) });
          if (tagsRes.ok) {
            const data = await tagsRes.json();
            const models: string[] = (data.models ?? []).map((m: { name: string }) => m.name);
            embeddingModel = detectEmbeddingModel(models);
            if (!chatModel) {
              chatModel =
                models.find((m) => !EMBEDDING_MODELS.some((prefix) => m.startsWith(prefix))) ?? "";
            }
          }
        } catch {
          send({ type: "error", message: "Ollama에 연결할 수 없습니다." });
          return;
        }

        if (!embeddingModel) {
          send({ type: "error", message: "임베딩 모델이 없습니다. ollama pull mxbai-embed-large 를 실행하세요." });
          return;
        }

        const seenFilePaths = new Set<string>();

        // Layer 1: Title match — normalized string matching, no LLM
        const titleHit = await searchByTitle(query);
        if (titleHit) {
          send({ type: "title_match", source: titleHit });
          seenFilePaths.add(titleHit.filePath);
        }

        // Layer 2: Tag match — in-memory keyword intersection, no LLM
        const tagHits = searchByTags(query, seenFilePaths);
        for (const hit of tagHits) {
          send({ type: "tag_match", source: hit });
          seenFilePaths.add(hit.filePath);
        }

        // Layer 3: Semantic RAG — embed query, cosine similarity
        const queryPrompt = embeddingModel.startsWith("mxbai")
          ? `Represent this sentence for searching relevant passages: ${query}`
          : query;

        let queryEmbedding: number[];
        try {
          const embRes = await fetch(`${OLLAMA_URL}/api/embeddings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: embeddingModel, prompt: queryPrompt }),
            signal: AbortSignal.timeout(15000),
          });
          if (!embRes.ok) throw new Error(`Embedding failed: ${embRes.status}`);
          const embData = await embRes.json();
          queryEmbedding = embData.embedding;
        } catch (err) {
          send({ type: "error", message: `쿼리 임베딩 실패: ${String(err)}` });
          return;
        }

        const raw = await searchChunks(queryEmbedding, 20);
        const dedupedByFile = new Set<string>();
        const best = raw
          .filter((r) => r.score >= 0.25)
          .filter((r) => !seenFilePaths.has(r.filePath))
          .filter((r) => {
            if (dedupedByFile.has(r.filePath)) return false;
            dedupedByFile.add(r.filePath);
            return true;
          })
          .slice(0, 1);

        // No results across all layers
        if (best.length === 0 && seenFilePaths.size === 0) {
          send({ type: "no_results" });
          return;
        }

        const ragChunk = best[0] ?? null;
        if (ragChunk) {
          send({ type: "result", index: 0, source: ragChunk });
        }

        // RAG answer: use best semantic chunk if available, otherwise fall back to Layer 1/2
        const answerChunk = ragChunk ?? titleHit ?? tagHits[0] ?? null;
        if (chatModel && answerChunk) {
          try {
            const answerRes = await fetch(`${OLLAMA_URL}/api/chat`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                model: chatModel,
                messages: [
                  {
                    role: "system",
                    content:
                      "반드시 한국어로만 답변하세요. 주어진 문서 내용을 근거로 질문에 정확히 한 문장으로 답합니다. 핵심 정의나 특징을 담아 완전한 문장으로 답하고, 서두 없이 바로 시작하세요.",
                  },
                  {
                    role: "user",
                    content: `[참고 문서]\n${answerChunk.chunkText}\n\n[질문]\n${query}`,
                  },
                ],
                stream: false,
              }),
              signal: AbortSignal.timeout(45000),
            });

            if (answerRes.ok) {
              const answerData = await answerRes.json();
              send({ type: "rag_answer", text: answerData.message?.content ?? "" });
            } else {
              send({ type: "rag_answer", text: "" });
            }
          } catch {
            send({ type: "rag_answer", text: "" });
          }
        }

        send({ type: "done" });
      } catch (err) {
        send({ type: "error", message: String(err) });
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
