"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LinkedListVisualizerProps {
  values?: number[];
  type?: "singly" | "doubly" | "circular";
}

export default function LinkedListVisualizer({
  values = [10, 20, 30, 40, 50],
  type = "singly",
}: LinkedListVisualizerProps) {
  const [items, setItems] = useState(values);
  const [inputValue, setInputValue] = useState("");
  const [highlightIdx, setHighlightIdx] = useState(-1);

  const insertHead = () => {
    const num = parseInt(inputValue);
    if (isNaN(num)) return;
    setItems((prev) => [num, ...prev]);
    setInputValue("");
    setHighlightIdx(0);
    setTimeout(() => setHighlightIdx(-1), 1000);
  };

  const insertTail = () => {
    const num = parseInt(inputValue);
    if (isNaN(num)) return;
    setItems((prev) => [...prev, num]);
    setInputValue("");
    setHighlightIdx(items.length);
    setTimeout(() => setHighlightIdx(-1), 1000);
  };

  const removeAt = (idx: number) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="my-6 rounded-lg bg-white/60 border border-ink/10 overflow-hidden paper-texture">
      <div className="p-3 border-b border-ink/10 flex flex-wrap items-center gap-2">
        <span className="text-sm font-serif font-semibold text-ink">
          {type === "doubly" ? "이중 연결 리스트" : type === "circular" ? "원형 연결 리스트" : "단일 연결 리스트"}
        </span>
        <div className="flex items-center gap-1 ml-auto">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && insertTail()}
            placeholder="값"
            className="w-16 px-2 py-1 text-sm rounded bg-white/80 border border-ink/15 text-ink font-mono"
          />
          <button onClick={insertHead} className="px-2 py-1 text-xs bg-ink hover:bg-book-charcoal text-paper rounded shadow-sm">
            Head 삽입
          </button>
          <button onClick={insertTail} className="px-2 py-1 text-xs bg-ink hover:bg-book-charcoal text-paper rounded shadow-sm">
            Tail 삽입
          </button>
        </div>
      </div>

      <div className="p-6 overflow-x-auto">
        <div className="flex items-center gap-0 min-w-max">
          <div className="text-xs text-book-blue mr-2 flex flex-col items-center font-mono">
            <span>HEAD</span>
            <span>↓</span>
          </div>

          <AnimatePresence>
            {items.map((item, idx) => (
              <motion.div
                key={`${item}-${idx}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex items-center"
              >
                <div
                  onClick={() => removeAt(idx)}
                  className={`relative flex items-center border-2 rounded-lg cursor-pointer transition-colors ${
                    highlightIdx === idx
                      ? "border-book-blue bg-book-blue/10"
                      : "border-ink/20 bg-white/80 hover:border-book-red/50"
                  }`}
                >
                  <div className="px-3 py-2 text-sm font-mono text-ink font-semibold">
                    {item}
                  </div>
                  <div className="px-2 py-2 border-l border-ink/15 text-xs text-ink-light">
                    {idx < items.length - 1 || type === "circular" ? "●" : "∅"}
                  </div>
                </div>

                {idx < items.length - 1 && (
                  <div className="flex items-center text-ink-light/50 mx-1">
                    {type === "doubly" ? "⇄" : "→"}
                  </div>
                )}

                {type === "circular" && idx === items.length - 1 && (
                  <div className="text-ink-light/50 mx-1">↩</div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {items.length === 0 && (
            <div className="text-ink-light text-sm font-serif italic">빈 리스트 — 값을 삽입하세요</div>
          )}
        </div>

        {type === "doubly" && items.length > 0 && (
          <div className="mt-2 text-xs text-ink-light/50 ml-10 font-mono">
            ← prev | next →
          </div>
        )}
      </div>
    </div>
  );
}
