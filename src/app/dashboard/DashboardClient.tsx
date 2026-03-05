"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, CheckCircle, ChevronRight } from "lucide-react";
import type { TopicCategory, DocMeta } from "@/lib/content";

interface TopicWithDocs extends TopicCategory {
  docs: DocMeta[];
}

const STORAGE_KEY = "cs-tutor-progress";

function getProgress(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function setProgress(progress: Record<string, boolean>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export default function DashboardClient({ topics }: { topics: TopicWithDocs[] }) {
  const [progress, setProgressState] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setProgressState(getProgress());
  }, []);

  const toggleDoc = useCallback((topicDir: string, slug: string) => {
    const key = `${topicDir}/${slug}`;
    setProgressState((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      setProgress(next);
      return next;
    });
  }, []);

  const toggleTopic = useCallback((dirName: string) => {
    setExpandedTopics((prev) => ({ ...prev, [dirName]: !prev[dirName] }));
  }, []);

  const totalDocs = topics.reduce((sum, t) => sum + t.docCount, 0);
  const completedDocs = Object.values(progress).filter(Boolean).length;
  const overallPct = totalDocs > 0 ? completedDocs / totalDocs : 0;

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <h1 className="text-3xl font-bold text-ink mb-6 tracking-tight">대시보드</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "전체 주제", value: topics.length, color: "text-ink" },
          { label: "전체 문서", value: totalDocs, color: "text-ink" },
          { label: "완료", value: `${completedDocs} / ${totalDocs}`, color: "text-book-blue" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            className="rounded-lg bg-white/60 border border-ink/5 p-5 paper-texture"
          >
            <div className="text-xs text-ink-light font-mono uppercase tracking-widest mb-1">{stat.label}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Overall progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        className="rounded-lg bg-white/60 border border-ink/5 p-5 paper-texture mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-ink">전체 진행률</span>
          <span className="text-sm font-mono text-ink-light">{Math.round(overallPct * 100)}%</span>
        </div>
        <div className="w-full bg-paper-dark rounded-full h-3 border border-ink/10">
          <motion.div
            className="h-3 rounded-full bg-book-blue"
            initial={{ width: 0 }}
            animate={{ width: `${overallPct * 100}%` }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Topics */}
      <h2 className="text-sm font-bold text-ink/50 uppercase tracking-widest mb-4 border-b border-ink/5 pb-2">주제별 현황</h2>
      <motion.div
        className="space-y-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.04 } },
        }}
      >
        {topics.map((topic) => {
          const isExpanded = expandedTopics[topic.dirName] ?? false;
          const topicCompleted = topic.docs.filter(
            (d) => progress[`${topic.dirName}/${d.slug}`]
          ).length;
          const topicPct = topic.docCount > 0 ? topicCompleted / topic.docCount : 0;

          return (
            <motion.div
              key={topic.dirName}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
              }}
              className="rounded-lg bg-white/60 border border-ink/5 paper-texture overflow-hidden"
            >
              {/* Topic header */}
              <button
                onClick={() => toggleTopic(topic.dirName)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/40 transition-colors"
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <ChevronRight size={16} className="text-ink-light" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-semibold text-ink">{topic.label}</h3>
                    <span className="text-xs text-ink-light font-mono flex items-center gap-1 shrink-0 ml-2">
                      <BookOpen size={14} />
                      {topicCompleted}/{topic.docCount}
                    </span>
                  </div>
                  <div className="w-full bg-paper-dark rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        topicPct >= 1 ? "bg-book-green" : "bg-book-blue"
                      }`}
                      style={{ width: `${topicPct * 100}%` }}
                    />
                  </div>
                </div>
              </button>

              {/* Documents list - animated collapse */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-ink/5 px-4 py-2 space-y-0.5">
                      {topic.docs.map((doc) => {
                        const docKey = `${topic.dirName}/${doc.slug}`;
                        const isDone = progress[docKey] ?? false;
                        return (
                          <button
                            key={doc.slug}
                            onClick={() => toggleDoc(topic.dirName, doc.slug)}
                            className="w-full flex items-center gap-2 text-sm py-1.5 px-2 rounded hover:bg-paper-dark/60 transition-colors text-left"
                          >
                            <CheckCircle
                              size={16}
                              className={`shrink-0 transition-colors ${isDone ? "text-book-green" : "text-ink/20"}`}
                            />
                            <span className={`transition-all ${isDone ? "text-ink line-through opacity-60" : "text-ink-light"}`}>
                              {doc.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
