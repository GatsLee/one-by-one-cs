import { NextRequest, NextResponse } from "next/server";

const OLLAMA_URL = "http://localhost:11434";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(req: NextRequest) {
  let body: { messages: Message[]; model: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { messages, model } = body;
  if (!messages?.length || !model) {
    return NextResponse.json({ error: "messages and model are required" }, { status: 400 });
  }

  const conversationText = messages
    .filter((m) => m.role !== "system")
    .map((m) => `${m.role === "user" ? "사용자" : "AI"}: ${m.content}`)
    .join("\n\n");

  try {
    const res = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: "반드시 한국어로만 답변하세요. 주어진 대화의 핵심 질문과 답변을 400자 이내로 간결하게 요약합니다.",
          },
          {
            role: "user",
            content: `다음 대화를 한국어로만 요약해주세요. 영어나 다른 언어는 사용하지 마세요:\n\n${conversationText}`,
          },
        ],
        stream: false,
      }),
      signal: AbortSignal.timeout(60000),
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: typeof errBody.error === "string" ? errBody.error : `Ollama error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const summary: string = data.message?.content ?? "";
    return NextResponse.json({ summary });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 503 });
  }
}
