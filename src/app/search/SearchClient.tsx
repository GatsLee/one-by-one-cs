"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, ExternalLink, BookOpen, AlertTriangle, Sparkles, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/motion/PageTransition";

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

interface ChunkSource {
  id: number;
  filePath: string;
  topic: string;
  title: string;
  chunkIdx: number;
  chunkText: string;
  score: number;
}

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

function filePathToStudyUrl(filePath: string): string {
  return "/" + filePath.replace(/^content\/topics\//, "study/").replace(/\.mdx$/, "");
}

function loadSavedModel(): string {
  try {
    const s = JSON.parse(localStorage.getItem("chat_settings") ?? "{}");
    return s.model ?? "";
  } catch {
    return "";
  }
}

function topicLabel(topic: string): string {
  const map: Record<string, string> = {
    "01-data-structures": "자료구조",
    "02-os": "운영체제",
    "03-network": "네트워크",
    "04-database": "데이터베이스",
    "05-system-design": "시스템 설계",
    "06-ai": "AI",
    "07-infra": "인프라",
    "08-ai-agent": "AI 에이전트",
    "09-architecture": "아키텍처",
  };
  return map[topic] ?? topic;
}

const TOPIC_COLORS: Record<string, string> = {
  "01-data-structures": "bg-blue-50 text-blue-700 border-blue-100",
  "02-os": "bg-purple-50 text-purple-700 border-purple-100",
  "03-network": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "04-database": "bg-amber-50 text-amber-700 border-amber-100",
  "05-system-design": "bg-rose-50 text-rose-700 border-rose-100",
  "06-ai": "bg-cyan-50 text-cyan-700 border-cyan-100",
  "07-infra": "bg-orange-50 text-orange-700 border-orange-100",
  "08-ai-agent": "bg-indigo-50 text-indigo-700 border-indigo-100",
  "09-architecture": "bg-teal-50 text-teal-700 border-teal-100",
};

function topicColor(topic: string): string {
  return TOPIC_COLORS[topic] ?? "bg-ink/5 text-ink/60 border-ink/10";
}

const EMBEDDING_MODEL_PREFIXES = ["mxbai-embed-large", "nomic-embed-text"];
const isChatModel = (name: string) =>
  !EMBEDDING_MODEL_PREFIXES.some((prefix) => name.startsWith(prefix));

const SUGGESTED = [
  "해시 테이블",
  "데드락",
  "HTTP",
  "인덱스",
  "캐시",
];

// ──────────────────────────────────────────────
// RagAnswerPanel
// ──────────────────────────────────────────────

function RagAnswerPanel({ answer, loading }: { answer: string; loading: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="p-4 rounded-xl bg-ink/[0.03] border border-ink/10 space-y-2"
    >
      <div className="flex items-center gap-1.5 text-xs font-medium text-ink/50">
        <Sparkles size={12} />
        AI 답변 <span className="text-ink/30 font-normal">· 문서 기반</span>
      </div>
      {loading ? (
        <div className="flex gap-1 items-center py-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-ink/25 animate-bounce"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          ))}
        </div>
      ) : answer ? (
        <p className="text-sm text-ink/80 leading-relaxed">{answer}</p>
      ) : null}
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// ResultCard
// ──────────────────────────────────────────────

function ResultCard({ source }: { source: ChunkSource }) {
  const [expanded, setExpanded] = useState(false);
  const studyUrl = filePathToStudyUrl(source.filePath);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.05 }}
      className="rounded-xl bg-white/80 border border-ink/10 overflow-hidden"
    >
      {/* Header — always visible, click to expand */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-ink/[0.02] transition-colors"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-sm font-semibold text-ink leading-snug">{source.title}</h3>
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${topicColor(source.topic)}`}>
            {topicLabel(source.topic)}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] text-ink/30">
            {(source.score * 100).toFixed(0)}%
          </span>
          <ChevronDown
            size={14}
            className={`text-ink/30 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t border-ink/5 pt-3">
              <p className="text-xs text-ink/60 leading-relaxed bg-ink/[0.03] rounded-lg px-3 py-2.5 font-mono whitespace-pre-wrap">
                {source.chunkText}
              </p>
              <div className="flex justify-end">
                <Link
                  href={studyUrl}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink text-paper text-xs font-medium hover:bg-ink/80 transition-colors"
                >
                  <BookOpen size={12} />
                  강의 바로가기
                  <ExternalLink size={10} className="opacity-60" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────

export default function SearchClient() {
  const [query, setQuery] = useState("");
  const [titleMatch, setTitleMatch] = useState<ChunkSource | null>(null);
  const [tagMatches, setTagMatches] = useState<ChunkSource[]>([]);
  const [result, setResult] = useState<ChunkSource | null>(null);
  const [ragAnswer, setRagAnswer] = useState("");
  const [ragAnswerLoading, setRagAnswerLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ollamaReady, setOllamaReady] = useState<boolean | null>(null);
  const [embeddingReady, setEmbeddingReady] = useState<boolean | null>(null);
  const [model, setModel] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/ollama/status")
      .then((r) => r.json())
      .then((status) => {
        const running: boolean = status.running ?? false;
        const models: string[] = (status.models ?? []).filter(isChatModel);
        setOllamaReady(running);
        if (running && models.length > 0) {
          setModel((prev) => {
            const saved = loadSavedModel();
            if (saved && models.includes(saved)) return saved;
            if (prev && models.includes(prev)) return prev;
            return models[0];
          });
        }
      })
      .catch(() => setOllamaReady(false));

    fetch("/api/embed")
      .then((r) => r.json())
      .then((data) => setEmbeddingReady(!!data.embeddingModel))
      .catch(() => setEmbeddingReady(false));
  }, []);

  const runSearch = async (q?: string) => {
    const term = (q ?? query).trim();
    if (!term || searching) return;

    setTitleMatch(null);
    setTagMatches([]);
    setResult(null);
    setRagAnswer("");
    setRagAnswerLoading(false);
    setNoResults(false);
    setError(null);
    setSearching(true);

    const activeModel = model || loadSavedModel();

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: term, model: activeModel }),
      });

      if (!res.ok || !res.body) throw new Error(`검색 오류: ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        for (const line of text.split("\n\n").filter(Boolean)) {
          if (!line.startsWith("data: ")) continue;
          try {
            const event = JSON.parse(line.slice(6));

            if (event.type === "title_match") {
              setTitleMatch(event.source);
            } else if (event.type === "tag_match") {
              setTagMatches((prev) => [...prev, event.source as ChunkSource]);
            } else if (event.type === "error") {
              setError(event.message);
            } else if (event.type === "no_results") {
              setNoResults(true);
            } else if (event.type === "result") {
              setResult(event.source);
              if (activeModel) setRagAnswerLoading(true);
            } else if (event.type === "rag_answer") {
              setRagAnswer(event.text ?? "");
              setRagAnswerLoading(false);
            } else if (event.type === "done") {
              setRagAnswerLoading(false);
            }
          } catch {
            // skip malformed
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") runSearch();
  };

  const notReady = ollamaReady === false || embeddingReady === false;
  const hasContent = titleMatch !== null || tagMatches.length > 0 || result !== null || noResults || error;

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto py-4 space-y-5">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-ink tracking-tight mb-1">AI 검색</h1>
          <p className="text-ink-light text-sm">CS 강의 내용을 의미 기반으로 검색합니다</p>
        </div>

        {/* Status banners */}
        {ollamaReady === false && (
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
            <AlertTriangle size={13} />
            <span>
              Ollama가 실행 중이지 않습니다.{" "}
              <Link href="/settings" className="underline underline-offset-2">
                설정
              </Link>
              에서 시작하세요.
            </span>
          </div>
        )}
        {ollamaReady === true && embeddingReady === false && (
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-700">
            <AlertTriangle size={13} />
            <span>
              임베딩 모델이 없습니다.{" "}
              <Link href="/settings" className="underline underline-offset-2">
                설정
              </Link>
              에서 모델 설치 후 인덱싱을 실행하세요.
            </span>
          </div>
        )}

        {/* Search bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/30 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="CS 개념을 검색하세요... (예: 해시 테이블이 뭐야?)"
              disabled={notReady || searching}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/80 border border-ink/10 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/30 transition-colors disabled:opacity-50"
            />
          </div>
          <button
            onClick={() => runSearch()}
            disabled={!query.trim() || notReady || searching}
            className="px-4 py-2.5 rounded-xl bg-ink text-paper text-sm font-medium disabled:opacity-30 hover:bg-ink/80 transition-colors shrink-0 flex items-center gap-2"
          >
            {searching ? <Loader2 size={15} className="animate-spin" /> : <Search size={15} />}
            {searching ? "검색 중" : "검색"}
          </button>
        </div>

        {/* Suggested queries */}
        {!hasContent && !searching && (
          <div className="space-y-2">
            <p className="text-xs text-ink/40 font-medium">추천 검색어</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  onClick={() => { setQuery(q); runSearch(q); }}
                  disabled={notReady}
                  className="px-3 py-1.5 text-xs rounded-full bg-white/70 border border-ink/10 text-ink-light hover:text-ink hover:bg-white transition-colors disabled:opacity-40"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
        )}

        {/* No results */}
        {noResults && !searching && (
          <div className="text-center py-10 text-ink/40 text-sm">
            <Search size={28} className="mx-auto mb-2 opacity-30" />
            <p>관련 내용을 찾지 못했습니다.</p>
            <p className="text-xs mt-1">인덱싱이 완료됐는지 설정에서 확인하세요.</p>
          </div>
        )}

        {/* Results area */}
        <AnimatePresence>
          {(titleMatch || tagMatches.length > 0 || result || ragAnswerLoading || ragAnswer) && (
            <div className="space-y-2">
              {/* AI answer — top */}
              {(ragAnswerLoading || ragAnswer) && (
                <RagAnswerPanel answer={ragAnswer} loading={ragAnswerLoading} />
              )}

              {/* Layer 1: Title match */}
              {titleMatch && <ResultCard source={titleMatch} />}

              {/* Layer 2: Tag matches */}
              {tagMatches.map((src) => (
                <ResultCard key={src.id} source={src} />
              ))}

              {/* Layer 3: RAG result — only if not already shown above */}
              {result &&
                (!titleMatch || result.filePath !== titleMatch.filePath) &&
                !tagMatches.some((t) => t.filePath === result.filePath) && (
                  <ResultCard source={result} />
                )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
