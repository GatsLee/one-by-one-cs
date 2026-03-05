"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TopicCategory, DocMeta } from "@/lib/content";

interface QuizQuestion {
  question: string;
  answer: string;
}

interface FlashcardData {
  question: string;
  answer: string;
}

interface TopicWithDocs extends TopicCategory {
  docs: DocMeta[];
}

interface QuizDataByTopic {
  [topicDir: string]: {
    quizzes: QuizQuestion[];
    flashcards: FlashcardData[];
  };
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const fadeSlide = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25, ease: "easeOut" as const },
};

// --- Quiz Runner ---
function QuizRunner({ questions, onBack }: { questions: QuizQuestion[]; onBack: () => void }) {
  const [shuffled, setShuffled] = useState(() => shuffle(questions).slice(0, 15));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const restart = useCallback(() => {
    setShuffled(shuffle(questions).slice(0, 15));
    setIdx(0);
    setScore(0);
    setShowAnswer(false);
  }, [questions]);

  if (idx >= shuffled.length) {
    const pct = shuffled.length > 0 ? score / shuffled.length : 0;
    return (
      <motion.div {...fadeSlide} className="rounded-lg bg-white/60 border border-ink/5 p-8 text-center paper-texture">
        <h2 className="text-2xl font-bold text-ink mb-3">퀴즈 완료!</h2>
        <p className="text-lg text-ink/80 mb-4">
          점수: {score}/{shuffled.length} ({Math.round(pct * 100)}%)
        </p>
        <div className="w-full bg-paper-dark rounded-full h-3 mb-6 border border-ink/10">
          <div
            className={`h-3 rounded-full transition-all ${pct >= 0.7 ? "bg-book-green" : "bg-book-red"}`}
            style={{ width: `${pct * 100}%` }}
          />
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={restart} className="px-4 py-2 bg-ink hover:bg-book-charcoal text-paper rounded-lg text-sm font-medium shadow-sm transition-colors">
            새 문제로 다시 풀기
          </button>
          <button onClick={onBack} className="px-4 py-2 bg-paper-dark hover:bg-wood/50 text-ink rounded-lg text-sm font-medium border border-ink/10 transition-colors">
            주제 선택으로
          </button>
        </div>
      </motion.div>
    );
  }

  const q = shuffled[idx];

  const mark = (correct: boolean) => {
    if (correct) setScore((s) => s + 1);
    setIdx((i) => i + 1);
    setShowAnswer(false);
  };

  return (
    <div className="rounded-lg bg-white/60 border border-ink/5 p-6 paper-texture">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs text-ink-light font-mono uppercase tracking-widest">
          Q{idx + 1}/{shuffled.length}
        </div>
        <button onClick={onBack} className="text-xs text-ink-light hover:text-ink font-mono transition-colors">
          ← 돌아가기
        </button>
      </div>

      <div className="w-full bg-paper-dark rounded-full h-1.5 mb-6">
        <div className="h-1.5 rounded-full bg-book-blue transition-all duration-300" style={{ width: `${(idx / shuffled.length) * 100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-lg text-ink font-medium mb-6 whitespace-pre-wrap leading-relaxed">
            {q.question}
          </div>

          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="px-4 py-2 bg-ink hover:bg-book-charcoal text-paper rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              정답 확인
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="border-t border-ink/10 pt-4 mb-4">
                <p className="text-book-green font-medium whitespace-pre-wrap leading-relaxed">{q.answer}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => mark(true)}
                  className="px-4 py-2 bg-book-green hover:opacity-90 text-white rounded-lg text-sm font-medium shadow-sm transition-opacity"
                >
                  맞았다
                </button>
                <button
                  onClick={() => mark(false)}
                  className="px-4 py-2 bg-book-red hover:opacity-90 text-white rounded-lg text-sm font-medium shadow-sm transition-opacity"
                >
                  틀렸다
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// --- Flashcard Runner ---
function FlashcardRunner({ cards, onBack }: { cards: FlashcardData[]; onBack: () => void }) {
  const [shuffled, setShuffled] = useState(() => shuffle(cards).slice(0, 20));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  const restart = useCallback(() => {
    setShuffled(shuffle(cards).slice(0, 20));
    setIdx(0);
    setFlipped(false);
    setKnown(0);
  }, [cards]);

  if (idx >= shuffled.length) {
    return (
      <motion.div {...fadeSlide} className="rounded-lg bg-white/60 border border-ink/5 p-8 text-center paper-texture">
        <h2 className="text-xl font-bold text-ink mb-3">플래시카드 완료!</h2>
        <p className="text-ink-light mb-2">{shuffled.length}개 카드 중 {known}개를 알고 있었습니다.</p>
        <div className="w-full bg-paper-dark rounded-full h-3 mb-6 border border-ink/10">
          <div
            className="h-3 rounded-full bg-book-green transition-all"
            style={{ width: `${(known / shuffled.length) * 100}%` }}
          />
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={restart} className="px-4 py-2 bg-ink hover:bg-book-charcoal text-paper rounded-lg text-sm font-medium shadow-sm transition-colors">
            새 카드로 다시 보기
          </button>
          <button onClick={onBack} className="px-4 py-2 bg-paper-dark hover:bg-wood/50 text-ink rounded-lg text-sm font-medium border border-ink/10 transition-colors">
            주제 선택으로
          </button>
        </div>
      </motion.div>
    );
  }

  const card = shuffled[idx];

  const next = (didKnow: boolean) => {
    if (didKnow) setKnown((k) => k + 1);
    setFlipped(false);
    setTimeout(() => setIdx((i) => i + 1), 100);
  };

  return (
    <div className="rounded-lg bg-white/60 border border-ink/5 p-6 paper-texture">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-ink-light font-mono uppercase tracking-widest">
          {idx + 1} / {shuffled.length}
        </p>
        <button onClick={onBack} className="text-xs text-ink-light hover:text-ink font-mono transition-colors">
          ← 돌아가기
        </button>
      </div>

      <div className="w-full bg-paper-dark rounded-full h-1.5 mb-6">
        <div className="h-1.5 rounded-full bg-book-blue transition-all duration-300" style={{ width: `${(idx / shuffled.length) * 100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="relative w-full max-w-lg mx-auto cursor-pointer"
            style={{ perspective: "1000px" }}
            onClick={() => setFlipped(!flipped)}
          >
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.4 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-full min-h-[180px]"
            >
              {/* Front */}
              <div
                className="absolute inset-0 rounded-lg bg-paper-dark border border-ink/10 p-6 flex items-center justify-center text-center shadow-sm"
                style={{ backfaceVisibility: "hidden" }}
              >
                <p className="text-lg text-ink font-medium">{card.question}</p>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 rounded-lg bg-book-navy/10 border border-book-navy/20 p-6 flex items-center justify-center text-center"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <p className="text-lg text-book-navy">{card.answer}</p>
              </div>
            </motion.div>
          </div>

          <p className="text-xs text-ink-light/50 text-center mt-2 font-mono">클릭하여 뒤집기</p>

          <AnimatePresence>
            {flipped && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-center gap-3 mt-4"
              >
                <button
                  onClick={() => next(true)}
                  className="px-4 py-2 bg-book-green hover:opacity-90 text-white rounded-lg text-sm font-medium shadow-sm transition-opacity"
                >
                  알고 있었다
                </button>
                <button
                  onClick={() => next(false)}
                  className="px-4 py-2 bg-book-red hover:opacity-90 text-white rounded-lg text-sm font-medium shadow-sm transition-opacity"
                >
                  몰랐다
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// --- Main Page ---
export default function QuizPageClient({
  topics,
  quizDataByTopic,
}: {
  topics: TopicWithDocs[];
  quizDataByTopic: QuizDataByTopic;
}) {
  const [tab, setTab] = useState<"quiz" | "flashcard">("quiz");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  const currentData = selectedTopic ? quizDataByTopic[selectedTopic] : null;

  const topicLabel = (dir: string) => topics.find((t) => t.dirName === dir)?.label || dir;

  if (running && currentData && selectedTopic) {
    if (tab === "quiz") {
      return (
        <motion.div className="max-w-4xl mx-auto" {...fadeSlide}>
          <h1 className="text-3xl font-bold text-ink mb-2 tracking-tight">퀴즈</h1>
          <p className="text-sm text-ink-light font-mono mb-6">{topicLabel(selectedTopic)}</p>
          <QuizRunner questions={currentData.quizzes} onBack={() => setRunning(false)} />
        </motion.div>
      );
    } else {
      return (
        <motion.div className="max-w-4xl mx-auto" {...fadeSlide}>
          <h1 className="text-3xl font-bold text-ink mb-2 tracking-tight">플래시카드</h1>
          <p className="text-sm text-ink-light font-mono mb-6">{topicLabel(selectedTopic)}</p>
          <FlashcardRunner cards={currentData.flashcards} onBack={() => setRunning(false)} />
        </motion.div>
      );
    }
  }

  return (
    <motion.div className="max-w-4xl mx-auto" {...fadeSlide}>
      <h1 className="text-3xl font-bold text-ink mb-6 tracking-tight">퀴즈</h1>

      <div className="flex gap-2 mb-8">
        {(["quiz", "flashcard"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t
                ? "bg-ink text-paper shadow-sm"
                : "bg-paper-dark text-ink-light hover:text-ink border border-ink/10"
            }`}
          >
            {t === "quiz" ? "연습 문제" : "플래시카드"}
          </button>
        ))}
      </div>

      <motion.div
        className="grid gap-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.03 } },
        }}
      >
        {topics.map((topic) => {
          const data = quizDataByTopic[topic.dirName];
          const count = tab === "quiz" ? data?.quizzes.length || 0 : data?.flashcards.length || 0;

          return (
            <motion.button
              key={topic.dirName}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
              }}
              onClick={() => {
                setSelectedTopic(topic.dirName);
                setRunning(true);
              }}
              disabled={count === 0}
              className="flex items-center gap-4 p-4 rounded-lg bg-white/60 border border-ink/5 hover:border-ink/20 hover:bg-white/80 transition-all text-left paper-texture disabled:opacity-40 group"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-ink group-hover:text-book-blue transition-colors">
                  {topic.label}
                </h3>
                <p className="text-xs text-ink-light mt-0.5">{topic.desc}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-mono text-ink-light">{count}문제</span>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      <p className="text-xs text-ink-light/60 text-center mt-6 font-mono">
        매번 랜덤으로 {tab === "quiz" ? "15" : "20"}문제가 출제됩니다
      </p>
    </motion.div>
  );
}
