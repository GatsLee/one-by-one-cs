import { NextRequest } from "next/server";
import { spawn } from "child_process";

export async function POST(req: NextRequest) {
  const { model } = await req.json().catch(() => ({ model: "" }));

  if (!model?.trim()) {
    return new Response(JSON.stringify({ type: "error", message: "모델명을 입력하세요." }), { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const send = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      const child = spawn("ollama", ["pull", model.trim()], {
        stdio: ["ignore", "pipe", "pipe"],
      });

      child.stdout.on("data", (chunk: Buffer) => {
        send({ type: "progress", text: chunk.toString() });
      });

      child.stderr.on("data", (chunk: Buffer) => {
        send({ type: "progress", text: chunk.toString() });
      });

      child.on("close", (code: number | null) => {
        if (code === 0) {
          send({ type: "done", success: true });
        } else {
          send({ type: "done", success: false, message: `종료 코드: ${code}` });
        }
        controller.close();
      });

      child.on("error", (err: Error) => {
        send({ type: "error", message: err.message });
        controller.close();
      });
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
