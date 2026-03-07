import { NextRequest, NextResponse } from "next/server";
import { searchChunks, detectEmbeddingModel } from "@/lib/rag";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const OLLAMA_URL = "http://localhost:11434";

const BASE_SYSTEM_PROMPT = `당신은 비전공자와 입문자를 위한 CS(컴퓨터 과학) 튜터입니다.

**중요: 반드시 한국어로만 답변하세요.** 영어, 중국어 등 다른 언어는 절대 사용하지 마세요. 기술 용어는 한국어 설명 후 괄호 안에 영어 원문을 병기해도 됩니다 (예: 해시 테이블(Hash Table)).

답변 방식:
- 비유와 실생활 예시를 사용해 쉽게 설명합니다
- 간결하지만 핵심을 빠뜨리지 않게 설명합니다
- 코드 예시가 도움될 때는 사용합니다
- 자료구조, OS, 네트워크, 데이터베이스 등 CS 주제라면 실제 프로그래밍 상황과 연결해 설명합니다`;

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatRequestBody {
  messages: Message[];
  model: string;
  useRag?: boolean;
}

export async function POST(req: NextRequest) {
  let body: ChatRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { messages, model, useRag = false } = body;
  if (!messages || !model) {
    return NextResponse.json({ error: "messages and model are required" }, { status: 400 });
  }

  // RAG path
  if (useRag) {
    const chunkCount = await prisma.contentChunk.count();
    if (chunkCount === 0) {
      return NextResponse.json({ error: "not_indexed", message: "먼저 문서를 인덱싱해주세요." }, { status: 400 });
    }

    // Get embedding model
    let embeddingModel: string | null = null;
    try {
      const res = await fetch(`${OLLAMA_URL}/api/tags`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const data = await res.json();
        const models: string[] = (data.models ?? []).map((m: { name: string }) => m.name);
        embeddingModel = detectEmbeddingModel(models);
      }
    } catch {
      return NextResponse.json({ error: "ollama_unavailable" }, { status: 503 });
    }

    // Find last user message to embed
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    let sources: { title: string; topic: string; filePath: string; score: number }[] = [];

    if (lastUserMessage && embeddingModel) {
      try {
        const embRes = await fetch(`${OLLAMA_URL}/api/embeddings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: embeddingModel, prompt: lastUserMessage.content }),
          signal: AbortSignal.timeout(15000),
        });
        if (embRes.ok) {
          const embData = await embRes.json();
          const chunks = await searchChunks(embData.embedding, 3);
          sources = chunks.map((c) => ({
            title: c.title,
            topic: c.topic,
            filePath: c.filePath,
            score: c.score,
          }));

          // Build RAG context
          if (chunks.length > 0) {
            const contextText = chunks
              .map((c, i) => `[문서 ${i + 1}: ${c.title}]\n${c.chunkText}`)
              .join("\n\n---\n\n");

            const ragSystem = `${BASE_SYSTEM_PROMPT}

다음은 질문과 관련된 강의 자료입니다. 이 내용을 참고하여 답변해주세요:

${contextText}`;

            return streamOllamaWithSources(model, ragSystem, messages, sources);
          }
        }
      } catch {
        // Fall through to normal chat if embedding fails
      }
    }

    return streamOllamaWithSources(model, BASE_SYSTEM_PROMPT, messages, sources);
  }

  // Non-RAG path — proxy directly to Ollama
  try {
    const ollamaRes = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: BASE_SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
      signal: AbortSignal.timeout(120000),
    });

    if (!ollamaRes.ok) {
      const errBody = await ollamaRes.json().catch(() => ({}));
      const detail = typeof errBody.error === "string" ? errBody.error : `Ollama error: ${ollamaRes.status}`;
      return NextResponse.json({ error: detail }, { status: ollamaRes.status });
    }

    return new Response(ollamaRes.body, {
      headers: {
        "Content-Type": "application/x-ndjson",
        "Cache-Control": "no-cache",
        "X-Rag-Sources": "[]",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 503 });
  }
}

function streamOllamaWithSources(
  model: string,
  systemPrompt: string,
  messages: Message[],
  sources: { title: string; topic: string; filePath: string; score: number }[]
): Response {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // First line: sources metadata
      controller.enqueue(
        encoder.encode(
          JSON.stringify({ type: "sources", sources }) + "\n"
        )
      );

      try {
        const ollamaRes = await fetch(`${OLLAMA_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model,
            messages: [{ role: "system", content: systemPrompt }, ...messages],
            stream: true,
          }),
          signal: AbortSignal.timeout(120000),
        });

        if (!ollamaRes.ok || !ollamaRes.body) {
          const errBody = await ollamaRes.json().catch(() => ({}));
          const detail = typeof errBody.error === "string" ? errBody.error : `Ollama error: ${ollamaRes.status}`;
          controller.enqueue(encoder.encode(JSON.stringify({ error: detail }) + "\n"));
          controller.close();
          return;
        }

        const reader = ollamaRes.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          controller.enqueue(value);
        }
      } catch (err) {
        controller.enqueue(
          encoder.encode(JSON.stringify({ error: String(err) }) + "\n")
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "no-cache",
    },
  });
}
