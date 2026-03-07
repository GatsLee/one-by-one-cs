import { NextResponse } from "next/server";
import os from "os";
import { execSync } from "child_process";

export interface OllamaStatus {
  installed: boolean;
  running: boolean;
  version: string | null;
  platform: string;
  models: string[];
}

export async function GET() {
  const platform = os.platform();

  // Check if Ollama binary is installed
  let installed = false;
  let version: string | null = null;
  try {
    const out = execSync("ollama --version", {
      timeout: 4000,
      stdio: ["pipe", "pipe", "pipe"],
    })
      .toString()
      .trim();
    installed = true;
    version = out; // e.g. "ollama version 0.6.5"
  } catch {
    installed = false;
  }

  // Check if Ollama is running (HTTP)
  let running = false;
  let models: string[] = [];
  try {
    const res = await fetch("http://localhost:11434/api/tags", {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      models = (data.models ?? []).map((m: { name: string }) => m.name);
      running = true;
      if (!installed) installed = true; // running implies installed
    }
  } catch {
    // not running or unreachable
  }

  return NextResponse.json({ installed, running, version, platform, models } satisfies OllamaStatus);
}
