"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/content";

export default function QuizSection({
  questions,
  topicDir,
  docId,
}: {
  questions: QuizQuestion[];
  topicDir: string;
  docId: string;
}) {
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shuffled, setShuffled] = useState<QuizQuestion[]>([]);

  const startQuiz = () => {
    const s = [...questions].sort(() => Math.random() - 0.5);
    setShuffled(s);
    setIdx(0);
    setScore(0);
    setShowAnswer(false);
    setStarted(true);
  };

  if (!started) {
    return (
      <div className="rounded-lg bg-white/60 border border-ink/5 p-6 paper-texture">
        <h2 className="text-xl font-serif font-bold text-ink mb-3">연습 문제</h2>
        <p className="text-ink-light mb-4">{questions.length}개의 문제가 있습니다.</p>
        <button
          onClick={startQuiz}
          className="px-4 py-2 bg-ink hover:bg-book-charcoal text-paper rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          퀴즈 시작
        </button>
      </div>
    );
  }

  if (idx >= shuffled.length) {
    const pct = shuffled.length > 0 ? score / shuffled.length : 0;
    return (
      <div className="rounded-lg bg-white/60 border border-ink/5 p-8 text-center paper-texture">
        <h2 className="text-2xl font-serif font-bold text-ink mb-3">퀴즈 완료!</h2>
        <p className="text-lg text-ink/80 mb-4 font-serif">
          점수: {score}/{shuffled.length} ({Math.round(pct * 100)}%)
        </p>
        <div className="w-full bg-paper-dark rounded-full h-3 mb-4 border border-ink/10">
          <div
            className={`h-3 rounded-full transition-all ${
              pct >= 0.7 ? "bg-book-green" : "bg-book-red"
            }`}
            style={{ width: `${pct * 100}%` }}
          />
        </div>
        <button
          onClick={startQuiz}
          className="px-4 py-2 bg-ink hover:bg-book-charcoal text-paper rounded-lg text-sm font-medium shadow-sm"
        >
          다시 풀기
        </button>
      </div>
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
      <div className="text-xs text-ink-light font-mono mb-2 uppercase tracking-widest">
        Q{idx + 1}/{shuffled.length}
      </div>
      <div className="text-lg text-ink font-serif font-medium mb-4 whitespace-pre-wrap">
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
        <div>
          <div className="border-t border-ink/10 pt-4 mb-4">
            <p className="text-book-green font-medium whitespace-pre-wrap">{q.answer}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => mark(true)}
              className="px-4 py-2 bg-book-green hover:opacity-90 text-white rounded-lg text-sm font-medium shadow-sm"
            >
              맞았다
            </button>
            <button
              onClick={() => mark(false)}
              className="px-4 py-2 bg-book-red hover:opacity-90 text-white rounded-lg text-sm font-medium shadow-sm"
            >
              틀렸다
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
