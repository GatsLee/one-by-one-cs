"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  BookOpen,
  Server,
  BrainCircuit,
  Terminal,
} from "lucide-react";

interface Phase {
  id: string;
  label: string;
  description: string;
  icon: ReactNode;
  bg: string;
  lightBg: string;
  border: string;
  text: string;
  glowColor: string;
  topics: { id: string; label: string }[];
}

const PHASES: Phase[] = [
  {
    id: "foundation",
    label: "CS 기초",
    description: "탄탄한 건물을 짓기 위한 필수 뼈대",
    icon: <BookOpen size={20} />,
    bg: "bg-book-blue",
    lightBg: "bg-book-blue/10",
    border: "border-book-blue/25",
    text: "text-book-blue",
    glowColor: "rgba(58, 95, 166, 0.35)",
    topics: [
      { id: "02-os", label: "운영체제" },
      { id: "03-network", label: "네트워크" },
      { id: "04-database", label: "데이터베이스" },
    ],
  },
  {
    id: "system",
    label: "시스템 & 설계",
    description: "확장 가능하고 견고한 시스템 구조화",
    icon: <Server size={20} />,
    bg: "bg-book-charcoal",
    lightBg: "bg-book-charcoal/10",
    border: "border-book-charcoal/25",
    text: "text-book-charcoal",
    glowColor: "rgba(51, 51, 51, 0.3)",
    topics: [
      { id: "05-system-design", label: "시스템 설계" },
      { id: "09-architecture", label: "SW 아키텍처" },
    ],
  },
  {
    id: "ai",
    label: "AI",
    description: "인공지능의 원리와 에이전트 활용",
    icon: <BrainCircuit size={20} />,
    bg: "bg-book-red",
    lightBg: "bg-book-red/10",
    border: "border-book-red/25",
    text: "text-book-red",
    glowColor: "rgba(166, 58, 58, 0.35)",
    topics: [
      { id: "06-ai", label: "AI/ML" },
      { id: "08-ai-agent", label: "AI 에이전트" },
    ],
  },
  {
    id: "practice",
    label: "개발 실무",
    description: "실제 현업에서 쓰이는 핵심 기술",
    icon: <Terminal size={20} />,
    bg: "bg-book-green",
    lightBg: "bg-book-green/10",
    border: "border-book-green/25",
    text: "text-book-green",
    glowColor: "rgba(58, 143, 90, 0.35)",
    topics: [
      { id: "07-infra", label: "인프라" },
      { id: "10-debugging", label: "디버깅" },
      { id: "11-git", label: "Git" },
      { id: "12-testing", label: "테스팅" },
    ],
  },
];

export default function LearningRoadmap() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="relative">
      {/* Vertical track line */}
      <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-wood/40 rounded-full hidden md:block" />

      <div className="flex flex-col gap-6">
        {PHASES.map((phase) => {
          const isExpanded = expandedId === phase.id;

          return (
            <div key={phase.id} className="relative flex flex-col md:flex-row gap-6 group">
              {/* Timeline node */}
              <div className="hidden md:flex flex-col items-center mt-6 z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-[3px] border-paper transition-colors duration-300 ${
                    isExpanded ? `${phase.bg} text-white` : "bg-white text-ink-light"
                  }`}
                >
                  {phase.icon}
                </div>
              </div>

              {/* Card */}
              <motion.div
                layout
                className={`flex-1 rounded-2xl border ${
                  isExpanded ? `${phase.border} shadow-md` : "border-ink/10 shadow-sm"
                } bg-white/80 overflow-hidden transition-all duration-300 paper-texture`}
              >
                {/* Header */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : phase.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-ink/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`md:hidden p-3 rounded-xl ${phase.lightBg} ${phase.text}`}>
                      {phase.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-ink">{phase.label}</h3>
                      <p className="text-sm text-ink-light mt-1">{phase.description}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isExpanded ? `${phase.lightBg} ${phase.text}` : "bg-ink/5 text-ink-light"
                    }`}
                  >
                    <ChevronDown size={18} strokeWidth={2.5} />
                  </motion.div>
                </button>

                {/* Expanded topics */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-ink/5">
                        <p className="text-xs font-semibold text-ink-light uppercase tracking-wider mb-3 ml-1">
                          세부 학습 주제
                        </p>
                        <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${phase.topics.length}, 1fr)` }}>
                          {phase.topics.map((topic) => (
                            <button
                              key={topic.id}
                              onClick={() => router.push(`/study/${topic.id}`)}
                              className={`flex items-center justify-center px-4 py-3 rounded-xl border ${phase.border} bg-white transition-shadow duration-200`}
                              style={{ "--glow": phase.glowColor } as React.CSSProperties}
                              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 12px var(--glow), 0 0 4px var(--glow)`; }}
                              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                            >
                              <span className="font-medium text-ink">
                                {topic.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
