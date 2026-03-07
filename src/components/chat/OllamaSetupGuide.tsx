"use client";

import { useState, useCallback } from "react";
import { Check, Circle, Copy, RefreshCw, Terminal, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface OllamaStatus {
  installed: boolean;
  running: boolean;
  version: string | null;
  platform: string;
  models: string[];
}

interface Step {
  id: number;
  title: string;
  description: string;
  command?: string;
  note?: string;
  done: boolean;
  active: boolean;
}

interface OllamaSetupGuideProps {
  status: OllamaStatus;
  recommendedModel?: string;
  onStatusChange: (status: OllamaStatus) => void;
}

function installCommand(platform: string): string {
  if (platform === "darwin") return "brew install ollama";
  if (platform === "win32") return "# winget install Ollama.Ollama";
  return "curl -fsSL https://ollama.com/install.sh | sh";
}

function installNote(platform: string): string | undefined {
  if (platform === "win32")
    return "Windows에서는 ollama.com 에서 설치 파일(.exe)을 직접 다운로드하는 것이 가장 편리합니다.";
  if (platform === "darwin")
    return "Homebrew가 없으면 ollama.com 에서 macOS 앱을 직접 다운로드할 수 있습니다.";
  return undefined;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <button
      onClick={copy}
      className="ml-2 p-1 rounded text-ink/40 hover:text-ink/70 hover:bg-ink/10 transition-colors shrink-0"
      title="복사"
    >
      {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
    </button>
  );
}

function CommandBlock({ command }: { command: string }) {
  return (
    <div className="flex items-center mt-2 px-3 py-2 rounded-lg bg-ink/5 border border-ink/10 font-mono text-xs text-ink/80">
      <Terminal size={12} className="mr-2 text-ink/30 shrink-0" />
      <span className="flex-1 select-all">{command}</span>
      <CopyButton text={command} />
    </div>
  );
}

function StepIcon({ done, active, index }: { done: boolean; active: boolean; index: number }) {
  if (done)
    return (
      <div className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
        <Check size={12} className="text-emerald-600" />
      </div>
    );
  if (active)
    return (
      <div className="w-6 h-6 rounded-full bg-ink border border-ink flex items-center justify-center shrink-0">
        <span className="text-paper text-xs font-bold">{index}</span>
      </div>
    );
  return (
    <div className="w-6 h-6 rounded-full border border-ink/20 flex items-center justify-center shrink-0">
      <span className="text-ink/30 text-xs">{index}</span>
    </div>
  );
}

export default function OllamaSetupGuide({
  status,
  recommendedModel = "llama3.2",
  onStatusChange,
}: OllamaSetupGuideProps) {
  const [checking, setChecking] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const recheck = useCallback(async () => {
    setChecking(true);
    try {
      const res = await fetch("/api/ollama/status");
      if (res.ok) {
        const next: OllamaStatus = await res.json();
        onStatusChange(next);
      }
    } finally {
      setChecking(false);
    }
  }, [onStatusChange]);

  const steps: Step[] = [
    {
      id: 1,
      title: "Ollama 설치",
      description: "로컬 LLM 런타임인 Ollama를 설치합니다.",
      command: installCommand(status.platform),
      note: installNote(status.platform),
      done: status.installed,
      active: !status.installed,
    },
    {
      id: 2,
      title: "Ollama 실행",
      description: "설치 후 Ollama 서버를 시작합니다.",
      command: status.platform === "win32" ? "# 시스템 트레이에서 Ollama 앱을 실행하세요" : "ollama serve",
      note:
        status.platform === "win32"
          ? "Windows에서는 설치 후 Ollama 앱이 자동으로 시스템 트레이에 나타납니다."
          : "Linux/macOS에서는 설치 스크립트 실행 시 자동으로 시작될 수 있습니다.",
      done: status.running,
      active: status.installed && !status.running,
    },
    {
      id: 3,
      title: "채팅 모델 설치",
      description: "AI 채팅에 사용할 언어 모델을 다운로드합니다.",
      command: `ollama pull ${recommendedModel}`,
      note: `이 컴퓨터의 하드웨어 사양에 맞게 "${recommendedModel}"을 추천합니다. 다른 모델을 원하면 /chat 설정 패널을 확인하세요.`,
      done: status.running && status.models.length > 0,
      active: status.running && status.models.length === 0,
    },
  ];

  const currentStep = steps.find((s) => s.active);
  const allDone = steps.every((s) => s.done);

  if (allDone) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 rounded-xl border border-ink/10 bg-white/70 overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-ink/8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">Ollama 설정 가이드</p>
          {currentStep && (
            <p className="text-xs text-ink-light mt-0.5">
              현재 단계: <span className="text-ink font-medium">{currentStep.title}</span>
            </p>
          )}
        </div>
        <button
          onClick={recheck}
          disabled={checking}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg border border-ink/10 text-ink-light hover:text-ink hover:bg-ink/5 transition-colors disabled:opacity-50"
        >
          {checking ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <RefreshCw size={12} />
          )}
          상태 확인
        </button>
      </div>

      {/* Steps */}
      <div className="divide-y divide-ink/5">
        {steps.map((step) => {
          const isExpanded = expanded === step.id || step.active;
          return (
            <div key={step.id} className={step.done ? "opacity-60" : ""}>
              <button
                className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-ink/3 transition-colors"
                onClick={() => setExpanded(isExpanded && !step.active ? null : step.id)}
              >
                <StepIcon done={step.done} active={step.active} index={step.id} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${step.active ? "text-ink" : step.done ? "text-ink/50" : "text-ink/40"}`}>
                    {step.title}
                  </p>
                  {step.done && (
                    <p className="text-xs text-emerald-600 mt-0.5">완료됨</p>
                  )}
                </div>
                <div className="text-ink/30">
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-0 ml-9">
                      <p className="text-xs text-ink-light">{step.description}</p>
                      {step.command && <CommandBlock command={step.command} />}
                      {step.note && (
                        <p className="text-xs text-ink/40 mt-2 leading-relaxed">{step.note}</p>
                      )}
                      {step.active && (
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            onClick={recheck}
                            disabled={checking}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-ink text-paper hover:bg-ink/80 transition-colors disabled:opacity-50"
                          >
                            {checking ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                            완료했어요, 확인하기
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="px-4 py-2 border-t border-ink/5 flex items-center gap-2">
        <div className="flex-1 bg-ink/8 rounded-full h-1">
          <div
            className="bg-ink h-1 rounded-full transition-all duration-500"
            style={{ width: `${(steps.filter((s) => s.done).length / steps.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-ink/30">
          {steps.filter((s) => s.done).length}/{steps.length}
        </span>
      </div>
    </motion.div>
  );
}
