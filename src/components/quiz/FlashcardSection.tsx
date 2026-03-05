"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { FlashcardData } from "@/lib/content";

export default function FlashcardSection({
  cards,
  topicDir,
}: {
  cards: FlashcardData[];
  topicDir: string;
}) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (cards.length === 0) return null;

  if (idx >= cards.length) {
    return (
      <div className="rounded-lg bg-white/60 border border-ink/5 p-8 text-center paper-texture">
        <h2 className="text-xl font-serif font-bold text-ink mb-3">플래시카드 완료!</h2>
        <p className="text-ink-light mb-4">{cards.length}개 카드를 모두 확인했습니다.</p>
        <button
          onClick={() => { setIdx(0); setFlipped(false); }}
          className="px-4 py-2 bg-ink hover:bg-book-charcoal text-paper rounded-lg text-sm font-medium shadow-sm"
        >
          다시 보기
        </button>
      </div>
    );
  }

  const card = cards[idx];

  const next = () => {
    setFlipped(false);
    setIdx((i) => i + 1);
  };

  return (
    <div className="rounded-lg bg-white/60 border border-ink/5 p-6 paper-texture">
      <h2 className="text-xl font-serif font-bold text-ink mb-4">플래시카드</h2>
      <p className="text-xs text-ink-light font-mono mb-4 uppercase tracking-widest">
        {idx + 1} / {cards.length}
      </p>

      <div
        className="relative w-full max-w-lg mx-auto cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-full min-h-[160px]"
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-lg bg-paper-dark border border-ink/10 p-6 flex items-center justify-center text-center shadow-sm"
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="text-lg text-ink font-serif font-medium">{card.question}</p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-lg bg-book-navy/10 border border-book-navy/20 p-6 flex items-center justify-center text-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <p className="text-lg text-book-navy font-serif">{card.answer}</p>
          </div>
        </motion.div>
      </div>

      <p className="text-xs text-ink-light/50 text-center mt-2 font-mono">클릭하여 뒤집기</p>

      <div className="flex justify-center mt-4">
        <button
          onClick={next}
          className="px-4 py-2 bg-paper-dark hover:bg-wood/50 text-ink rounded-lg text-sm font-medium border border-ink/10 transition-colors"
        >
          다음 카드
        </button>
      </div>
    </div>
  );
}
