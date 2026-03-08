"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  X,
  BookOpen,
  Server,
  BrainCircuit,
  Terminal,
} from "lucide-react";

const LearningRoadmap = dynamic(
  () => import("@/components/home/LearningRoadmap"),
  { ssr: false },
);

const GUIDE_SECTIONS = [
  {
    icon: <BookOpen size={18} />,
    label: "CS 기초",
    color: "text-book-blue",
    border: "border-book-blue/20",
    description: "모든 소프트웨어의 토대가 되는 핵심 이론입니다.",
    topics: [
      { name: "자료구조", desc: "배열, 링크드리스트, 트리, 그래프 등 데이터를 효율적으로 저장하고 처리하는 방법을 배웁니다." },
      { name: "운영체제", desc: "프로세스, 스레드, 메모리 관리, 스케줄링 등 컴퓨터가 프로그램을 실행하는 원리를 이해합니다." },
      { name: "네트워크", desc: "TCP/IP, HTTP, DNS 등 컴퓨터 간 통신의 원리와 웹이 작동하는 방식을 다룹니다." },
      { name: "데이터베이스", desc: "SQL, 인덱싱, 트랜잭션 등 데이터를 안전하고 빠르게 저장·조회하는 기술을 배웁니다." },
    ],
  },
  {
    icon: <Server size={18} />,
    label: "시스템 & 설계",
    color: "text-book-charcoal",
    border: "border-book-charcoal/20",
    description: "대규모 서비스를 설계하고 확장하는 방법을 다룹니다.",
    topics: [
      { name: "시스템 설계", desc: "로드밸런싱, 캐싱, 샤딩 등 수백만 사용자를 감당하는 시스템을 설계하는 핵심 패턴입니다." },
      { name: "SW 아키텍처", desc: "클린 아키텍처, 마이크로서비스, 이벤트 드리븐 등 유지보수하기 좋은 코드 구조를 배웁니다." },
    ],
  },
  {
    icon: <BrainCircuit size={18} />,
    label: "AI",
    color: "text-book-red",
    border: "border-book-red/20",
    description: "인공지능의 원리부터 실전 활용까지 배웁니다.",
    topics: [
      { name: "AI/ML", desc: "신경망, 트랜스포머, LLM의 핵심 원리와 모델 학습·추론 과정을 이해합니다." },
      { name: "AI 에이전트", desc: "ReAct, MCP, 오케스트레이션 등 LLM 기반 자율 에이전트를 구축하는 방법을 배웁니다." },
    ],
  },
  {
    icon: <Terminal size={18} />,
    label: "개발 실무",
    color: "text-book-green",
    border: "border-book-green/20",
    description: "현업에서 매일 쓰이는 실무 기술을 익힙니다.",
    topics: [
      { name: "인프라", desc: "Docker, CI/CD, 클라우드 배포 등 서비스를 안정적으로 운영하는 기술입니다." },
      { name: "디버깅", desc: "에러 추적, 로깅, 프로파일링 등 문제를 체계적으로 찾고 해결하는 능력을 키웁니다." },
      { name: "Git", desc: "브랜치 전략, 리베이스, 충돌 해결 등 팀 협업에 필수적인 버전 관리를 배웁니다." },
      { name: "테스팅", desc: "단위 테스트, 통합 테스트, TDD 등 코드 품질을 보장하는 테스트 작성법을 다룹니다." },
    ],
  },
];

function GuideModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end bg-ink/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-paper w-full max-w-md h-full overflow-y-auto border-l border-ink/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink/10 sticky top-0 bg-paper z-10">
          <h2 className="text-xl font-bold text-ink">학습 가이드</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-ink/5 text-ink-light hover:text-ink transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {GUIDE_SECTIONS.map((section) => (
            <section key={section.label}>
              <div className="flex items-center gap-2 mb-1">
                <div className={`${section.color} shrink-0`}>{section.icon}</div>
                <h3 className={`text-base font-bold ${section.color}`}>{section.label}</h3>
              </div>
              <p className="text-sm text-ink/60 mb-3">{section.description}</p>
              <div className="space-y-2">
                {section.topics.map((t) => (
                  <div
                    key={t.name}
                    className={`px-3 py-2.5 rounded-lg bg-white/60 border ${section.border}`}
                  >
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-ink/60 mt-0.5 leading-relaxed">{t.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HomeClient() {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <motion.div
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ink">
            한번에 하나씩, <span className="text-book-blue">CS</span>
          </h1>
          <button
            onClick={() => setGuideOpen(true)}
            className="p-2 rounded-lg border border-ink/10 bg-white/80 hover:bg-ink/5 text-ink-light hover:text-book-blue transition-all shadow-sm hover:shadow-md translate-y-px"
            title="학습 가이드"
          >
            <HelpCircle size={20} />
          </button>
        </div>
        <p className="text-ink-light text-lg max-w-xl">
          복잡해 보이는 컴퓨터 과학도 올바른 순서대로 밟아가면 쉽습니다.
          당신의 여정을 선택하고 학습을 시작해보세요.
        </p>
      </header>

      <LearningRoadmap />

      <AnimatePresence>
        {guideOpen && <GuideModal onClose={() => setGuideOpen(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}
