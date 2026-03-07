"use client";

import { useState, useEffect, useRef } from "react";
import {
  Cpu,
  Check,
  RefreshCw,
  Loader2,
  Play,
  Square,
  Download,
  Database,
  ChevronRight,
} from "lucide-react";
import PageTransition from "@/components/motion/PageTransition";

// ──────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────

const EMBEDDING_MODEL_PREFIXES = ["mxbai-embed-large", "nomic-embed-text"];
const isChatModel = (name: string) =>
  !EMBEDDING_MODEL_PREFIXES.some((prefix) => name.startsWith(prefix));

const EMBEDDING_MODELS = [
  { name: "mxbai-embed-large", desc: "1024차원 고품질 (권장, ~670MB)" },
  { name: "nomic-embed-text", desc: "768차원 경량 (~300MB)" },
];

const SETTINGS_KEY = "chat_settings";

// ──────────────────────────────────────────────
// Settings persistence
// ──────────────────────────────────────────────

function loadSettings(): { model: string } {
  if (typeof window === "undefined") return { model: "" };
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? "{}");
  } catch {
    return { model: "" };
  }
}
function saveSettings(s: { model: string }) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

interface OllamaStatus {
  installed: boolean;
  running: boolean;
  version: string | null;
  models: string[];
}
interface ModelRecommendation {
  recommended: string;
  reason: string;
  vram: number | null;
  ram: number;
  alreadyInstalled: boolean;
  pullCommand: string | null;
}
interface IndexStatus {
  count: number;
  embeddingModel: string | null;
  isReady: boolean;
  newFileCount: number;
}

// ──────────────────────────────────────────────
// ModelPullWidget — shared by chat model & embedding model sections
// ──────────────────────────────────────────────

function ModelPullWidget({
  initialModel = "",
  placeholder = "모델 이름 입력 (예: llama3.2)",
  onDone,
}: {
  initialModel?: string;
  placeholder?: string;
  onDone?: () => void;
}) {
  const [modelInput, setModelInput] = useState(initialModel);
  const [pulling, setPulling] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [success, setSuccess] = useState<boolean | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  const startPull = async () => {
    const m = modelInput.trim();
    if (!m || pulling) return;
    setPulling(true);
    setLog([]);
    setSuccess(null);

    try {
      const res = await fetch("/api/ollama/pull", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: m }),
      });
      if (!res.body) throw new Error("No stream");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        for (const line of text.split("\n\n").filter(Boolean)) {
          if (!line.startsWith("data: ")) continue;
          try {
            const ev = JSON.parse(line.slice(6));
            if (ev.type === "progress" && ev.text) {
              setLog((prev) => [...prev, ev.text]);
            } else if (ev.type === "done") {
              setSuccess(ev.success);
              if (ev.success) onDone?.();
            } else if (ev.type === "error") {
              setLog((prev) => [...prev, `오류: ${ev.message}`]);
              setSuccess(false);
            }
          } catch { /* skip */ }
        }
      }
    } catch (err) {
      setLog((prev) => [...prev, String(err)]);
      setSuccess(false);
    } finally {
      setPulling(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={modelInput}
          onChange={(e) => setModelInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && startPull()}
          placeholder={placeholder}
          disabled={pulling}
          className="flex-1 px-3 py-2 rounded-lg border border-ink/10 bg-white text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/30 disabled:opacity-50"
        />
        <button
          onClick={startPull}
          disabled={!modelInput.trim() || pulling}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-ink text-paper text-xs font-medium hover:bg-ink/80 disabled:opacity-30 transition-colors shrink-0"
        >
          {pulling ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
          {pulling ? "다운로드 중" : "Pull"}
        </button>
      </div>

      {/* Log output */}
      {log.length > 0 && (
        <div
          ref={logRef}
          className="h-24 overflow-y-auto rounded-lg bg-ink/[0.04] border border-ink/8 px-2.5 py-2 text-[11px] font-mono text-ink/60 space-y-0.5"
        >
          {log.map((line, i) => (
            <p key={i} className="leading-tight whitespace-pre-wrap">{line.trim()}</p>
          ))}
        </div>
      )}

      {success === true && (
        <p className="flex items-center gap-1 text-xs text-emerald-600">
          <Check size={12} /> 다운로드 완료
        </p>
      )}
      {success === false && (
        <p className="text-xs text-red-600">다운로드 실패</p>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// IndexingWidget
// ──────────────────────────────────────────────

function IndexingWidget({ onDone }: { onDone?: () => void }) {
  const [indexing, setIndexing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentFile, setCurrentFile] = useState("");
  const [totalChunks, setTotalChunks] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startIndexing = async (incremental: boolean) => {
    if (indexing) return;
    setIndexing(true);
    setProgress(0);
    setTotal(0);
    setCurrentFile("");
    setTotalChunks(null);
    setError(null);

    try {
      const res = await fetch("/api/embed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ incremental }),
      });
      if (!res.body) throw new Error("No stream");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        for (const line of text.split("\n\n").filter(Boolean)) {
          if (!line.startsWith("data: ")) continue;
          try {
            const ev = JSON.parse(line.slice(6));
            if (ev.status === "start") {
              setTotal(ev.total ?? 0);
            } else if (ev.status === "progress") {
              setProgress(ev.progress ?? 0);
              setCurrentFile(ev.file ?? "");
            } else if (ev.status === "done") {
              setTotalChunks(ev.totalChunks ?? null);
              onDone?.();
            } else if (ev.error) {
              setError(ev.message ?? "인덱싱 오류");
            }
          } catch { /* skip */ }
        }
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setIndexing(false);
    }
  };

  const pct = total > 0 ? Math.round((progress / total) * 100) : 0;

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          onClick={() => startIndexing(false)}
          disabled={indexing}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-ink text-paper text-xs font-medium hover:bg-ink/80 disabled:opacity-30 transition-colors"
        >
          {indexing ? <Loader2 size={12} className="animate-spin" /> : <Database size={12} />}
          전체 재인덱싱
        </button>
        <button
          onClick={() => startIndexing(true)}
          disabled={indexing}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-ink/15 text-ink text-xs font-medium hover:bg-ink/5 disabled:opacity-30 transition-colors"
        >
          <ChevronRight size={12} />
          새 문서만
        </button>
      </div>

      {indexing && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-ink/50">
            <span>{currentFile.split("/").pop() ?? "처리 중..."}</span>
            <span>{pct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-ink/8 overflow-hidden">
            <div
              className="h-full bg-ink/40 rounded-full transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-ink/40">{progress} / {total} 파일</p>
        </div>
      )}

      {totalChunks !== null && !indexing && (
        <p className="flex items-center gap-1 text-xs text-emerald-600">
          <Check size={12} /> 완료 — {totalChunks}개 청크 저장됨
        </p>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

// ──────────────────────────────────────────────
// Main SettingsClient
// ──────────────────────────────────────────────

export default function SettingsClient() {
  const [ollamaStatus, setOllamaStatus] = useState<OllamaStatus | null>(null);
  const [recommendation, setRecommendation] = useState<ModelRecommendation | null>(null);
  const [indexStatus, setIndexStatus] = useState<IndexStatus | null>(null);
  const [chatModels, setChatModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [saved, setSaved] = useState(false);
  const [checking, setChecking] = useState(false);
  const [controlling, setControlling] = useState(false);

  const refreshOllama = async () => {
    const status: OllamaStatus = await fetch("/api/ollama/status").then((r) => r.json());
    setOllamaStatus(status);
    const models = status.models.filter(isChatModel);
    setChatModels(models);
    setSelectedModel((prev) => (models.includes(prev) ? prev : models[0] ?? prev));
  };

  const refreshIndex = async () => {
    const data: IndexStatus = await fetch("/api/embed").then((r) => r.json());
    setIndexStatus(data);
  };

  useEffect(() => {
    const settings = loadSettings();
    if (settings.model) setSelectedModel(settings.model);
    refreshOllama().catch(() => {});
    fetch("/api/models/recommend").then((r) => r.json()).then(setRecommendation).catch(() => {});
    refreshIndex().catch(() => {});
  }, []);

  const recheck = async () => {
    setChecking(true);
    try { await refreshOllama(); } finally { setChecking(false); }
  };

  const controlOllama = async (action: "start" | "stop") => {
    setControlling(true);
    try {
      await fetch("/api/ollama/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      await new Promise((r) => setTimeout(r, 500));
      await refreshOllama();
    } finally {
      setControlling(false);
    }
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    saveSettings({ model });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const ollamaRunning = ollamaStatus?.running ?? false;
  const installedEmbedding = ollamaStatus?.models.filter((m) =>
    EMBEDDING_MODEL_PREFIXES.some((p) => m.startsWith(p))
  ) ?? [];

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto py-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-ink tracking-tight mb-1">설정</h1>
          <p className="text-ink-light text-sm">Ollama 및 AI 검색 환경을 구성합니다</p>
        </div>

        {/* ─── Ollama 연결 ─── */}
        <section>
          <h2 className="text-xs font-semibold text-ink/50 uppercase tracking-wide mb-2.5">Ollama 연결</h2>
          <div className="p-4 rounded-xl bg-white/70 border border-ink/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${ollamaRunning ? "bg-emerald-500" : "bg-red-400"}`} />
                <span className="text-sm font-medium text-ink">
                  {ollamaStatus === null
                    ? "확인 중..."
                    : ollamaRunning
                    ? `연결됨 ${ollamaStatus.version ? `(${ollamaStatus.version})` : ""}`
                    : ollamaStatus.installed
                    ? "설치됨, 미실행"
                    : "Ollama 미설치"}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {ollamaRunning ? (
                  <button
                    onClick={() => controlOllama("stop")}
                    disabled={controlling}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    {controlling ? <Loader2 size={11} className="animate-spin" /> : <Square size={11} />}
                    중지
                  </button>
                ) : (
                  <button
                    onClick={() => controlOllama("start")}
                    disabled={controlling}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition-colors disabled:opacity-50"
                  >
                    {controlling ? <Loader2 size={11} className="animate-spin" /> : <Play size={11} />}
                    시작
                  </button>
                )}
                <button
                  onClick={recheck}
                  disabled={checking}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg border border-ink/10 text-ink-light hover:text-ink hover:bg-ink/5 transition-colors disabled:opacity-50"
                >
                  {checking ? <Loader2 size={11} className="animate-spin" /> : <RefreshCw size={11} />}
                  재확인
                </button>
              </div>
            </div>
            {ollamaRunning && (
              <p className="text-xs text-ink/40">
                채팅 모델 {chatModels.length}개 · 임베딩 모델 {installedEmbedding.length}개 설치됨
              </p>
            )}
          </div>
        </section>

        {/* ─── 모델 관리 (Pull) ─── */}
        <section>
          <h2 className="text-xs font-semibold text-ink/50 uppercase tracking-wide mb-2.5">모델 설치</h2>
          <div className="p-4 rounded-xl bg-white/70 border border-ink/10 space-y-4">
            {/* Installed list */}
            {ollamaStatus && ollamaStatus.models.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs text-ink/40 font-medium">설치된 모델</p>
                <div className="flex flex-wrap gap-1.5">
                  {ollamaStatus.models.map((m) => (
                    <span
                      key={m}
                      className={`text-xs px-2 py-0.5 rounded-full border ${
                        isChatModel(m)
                          ? "bg-ink/5 border-ink/10 text-ink/60"
                          : "bg-blue-50 border-blue-100 text-blue-700"
                      }`}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-xs text-ink/40 font-medium mb-2">새 모델 Pull</p>
              <ModelPullWidget
                placeholder="모델 이름 입력 (예: llama3.2, qwen2.5:7b)"
                onDone={refreshOllama}
              />
            </div>

            {/* Hardware recommendation */}
            {recommendation && (
              <div className="pt-3 border-t border-ink/8 space-y-2">
                <div className="flex items-center gap-1.5">
                  <Cpu size={12} className="text-blue-500" />
                  <span className="text-xs font-medium text-blue-700">이 컴퓨터 최적 모델</span>
                  <span className="ml-auto text-xs text-ink/40">
                    RAM {recommendation.ram.toFixed(0)}GB
                    {recommendation.vram != null && ` · VRAM ${recommendation.vram.toFixed(0)}GB`}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <code className="text-xs font-mono bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded border border-blue-100">
                    {recommendation.recommended}
                  </code>
                  <span className="text-xs text-ink/50">{recommendation.reason}</span>
                  {recommendation.alreadyInstalled ? (
                    <span className="text-xs text-emerald-600 ml-auto">설치됨</span>
                  ) : (
                    <span className="text-xs text-ink/40 ml-auto">미설치</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 임베딩 모델 (RAG) ─── */}
        <section>
          <h2 className="text-xs font-semibold text-ink/50 uppercase tracking-wide mb-2.5">임베딩 모델 (RAG)</h2>
          <div className="p-4 rounded-xl bg-white/70 border border-ink/10 space-y-4">
            {EMBEDDING_MODELS.map((em) => {
              const installed = installedEmbedding.some((m) => m.startsWith(em.name));
              return (
                <div key={em.name} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${installed ? "bg-emerald-500" : "bg-ink/15"}`} />
                    <span className="text-sm font-medium text-ink">{em.name}</span>
                    <span className="text-xs text-ink/40">{em.desc}</span>
                    {installed && <span className="ml-auto text-xs text-emerald-600">설치됨</span>}
                  </div>
                  {!installed && (
                    <ModelPullWidget
                      initialModel={em.name}
                      placeholder={em.name}
                      onDone={refreshOllama}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── RAG 인덱싱 ─── */}
        <section>
          <h2 className="text-xs font-semibold text-ink/50 uppercase tracking-wide mb-2.5">RAG 인덱싱</h2>
          <div className="p-4 rounded-xl bg-white/70 border border-ink/10 space-y-3">
            {indexStatus && (
              <div className="flex items-center gap-2 text-sm">
                <span className={`w-2 h-2 rounded-full ${indexStatus.isReady ? "bg-emerald-500" : "bg-ink/15"}`} />
                <span className="text-ink">
                  {indexStatus.isReady ? `${indexStatus.count}개 청크 인덱싱됨` : "인덱싱 안 됨"}
                </span>
                {indexStatus.newFileCount > 0 && (
                  <span className="text-xs text-amber-600 ml-auto">
                    새 문서 {indexStatus.newFileCount}개
                  </span>
                )}
              </div>
            )}
            {!indexStatus?.embeddingModel && (
              <p className="text-xs text-ink/50">임베딩 모델을 먼저 설치하세요.</p>
            )}
            <IndexingWidget onDone={refreshIndex} />
          </div>
        </section>

        {/* ─── 채팅 모델 선택 ─── */}
        <section>
          <h2 className="text-xs font-semibold text-ink/50 uppercase tracking-wide mb-2.5">RAG 답변 모델</h2>
          <div className="p-4 rounded-xl bg-white/70 border border-ink/10 space-y-3">
            {chatModels.length > 0 ? (
              <>
                <div>
                  <label className="text-xs text-ink-light font-medium block mb-1.5">검색 시 AI 답변에 사용할 모델</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => handleModelChange(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-ink/10 bg-white text-ink text-sm focus:outline-none focus:border-ink/30"
                  >
                    {chatModels.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                {saved && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600">
                    <Check size={12} /> 저장됨
                  </div>
                )}
              </>
            ) : (
              <p className="text-xs text-ink-light">
                {ollamaRunning ? "설치된 채팅 모델이 없습니다. 위에서 모델을 Pull하세요." : "Ollama를 먼저 시작하세요."}
              </p>
            )}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
