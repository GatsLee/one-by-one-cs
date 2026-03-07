import { NextRequest, NextResponse } from "next/server";
import { spawn, exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  const { action } = await req.json().catch(() => ({ action: "" }));

  if (action === "start") {
    try {
      // Spawn ollama serve detached so it outlives this request
      const child = spawn("ollama", ["serve"], {
        detached: true,
        stdio: "ignore",
      });
      child.unref();

      // Give it 1.5s to start, then confirm via HTTP
      await new Promise((r) => setTimeout(r, 1500));
      try {
        const res = await fetch("http://localhost:11434/api/tags", {
          signal: AbortSignal.timeout(2000),
        });
        if (res.ok) return NextResponse.json({ success: true, message: "Ollama가 시작되었습니다." });
      } catch {
        // Still starting — not an error
      }
      return NextResponse.json({ success: true, message: "Ollama 시작 중입니다. 잠시 후 재확인하세요." });
    } catch (err) {
      return NextResponse.json({ success: false, message: String(err) }, { status: 500 });
    }
  }

  if (action === "stop") {
    try {
      // Try systemctl user service first, fall back to pkill
      await execAsync("pkill -SIGTERM -f 'ollama serve' 2>/dev/null || pkill -SIGTERM ollama 2>/dev/null || true");
      return NextResponse.json({ success: true, message: "Ollama가 중지되었습니다." });
    } catch (err) {
      return NextResponse.json({ success: false, message: String(err) }, { status: 500 });
    }
  }

  return NextResponse.json({ success: false, message: "알 수 없는 action" }, { status: 400 });
}
