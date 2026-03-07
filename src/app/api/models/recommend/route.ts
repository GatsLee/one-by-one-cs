import { NextResponse } from "next/server";
import os from "os";
import { execSync } from "child_process";

const OLLAMA_URL = "http://localhost:11434";

interface ModelTier {
  model: string;
  reason: string;
  minVram?: number; // GB
  minRam?: number;  // GB
}

// Ordered from highest spec requirement to lowest
const MODEL_TIERS: ModelTier[] = [
  { model: "qwen2.5:14b", reason: "고품질 추론 (VRAM ≥ 10GB)", minVram: 10 },
  { model: "llama3.1:8b", reason: "균형 잡힌 성능 (VRAM ≥ 6GB)", minVram: 6 },
  { model: "llama3.2:3b", reason: "빠른 응답 (VRAM ≥ 3GB)", minVram: 3 },
  { model: "mistral:7b", reason: "CPU 실행 권장 (RAM ≥ 16GB)", minVram: 0, minRam: 16 },
  { model: "llama3.2:1b", reason: "최소 사양용 경량 모델", minVram: 0, minRam: 0 },
];

function getVramGB(): number | null {
  try {
    const raw = execSync(
      "nvidia-smi --query-gpu=memory.total --format=csv,noheader,nounits",
      { timeout: 5000, stdio: ["pipe", "pipe", "pipe"] }
    )
      .toString()
      .trim();
    // sum all GPUs (multi-GPU support)
    const total = raw
      .split("\n")
      .map((line) => parseInt(line.trim(), 10))
      .filter((n) => !isNaN(n))
      .reduce((a, b) => a + b, 0);
    return total > 0 ? total / 1024 : null; // MiB → GB
  } catch {
    return null;
  }
}

function getRamGB(): number {
  return os.totalmem() / 1024 / 1024 / 1024;
}

function pickTier(vramGB: number | null, ramGB: number): ModelTier {
  for (const tier of MODEL_TIERS) {
    if (tier.minVram === undefined) continue;
    if (vramGB !== null && vramGB >= (tier.minVram ?? 0)) return tier;
    if (tier.minVram === 0 && ramGB >= (tier.minRam ?? 0)) return tier;
  }
  return MODEL_TIERS[MODEL_TIERS.length - 1];
}

export async function GET() {
  const vramGB = getVramGB();
  const ramGB = getRamGB();
  const tier = pickTier(vramGB, ramGB);

  // Fetch installed models from Ollama
  let installedModels: string[] = [];
  let ollamaAvailable = false;
  try {
    const res = await fetch(`${OLLAMA_URL}/api/tags`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      installedModels = (data.models ?? []).map((m: { name: string }) => m.name);
      ollamaAvailable = true;
    }
  } catch {
    // Ollama not running
  }

  const alreadyInstalled = installedModels.some((m) =>
    m.startsWith(tier.model.split(":")[0])
  );

  return NextResponse.json({
    recommended: tier.model,
    reason: tier.reason,
    vram: vramGB !== null ? Math.round(vramGB * 10) / 10 : null,
    ram: Math.round(ramGB * 10) / 10,
    alreadyInstalled,
    ollamaAvailable,
    installedModels,
    pullCommand: alreadyInstalled ? null : `ollama pull ${tier.model}`,
  });
}
