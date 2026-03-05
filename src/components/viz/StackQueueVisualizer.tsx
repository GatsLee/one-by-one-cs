"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StackQueueVisualizerProps {
  initialValues?: number[];
  type?: "stack" | "queue";
}

export default function StackQueueVisualizer({
  initialValues = [10, 20, 30],
  type = "stack",
}: StackQueueVisualizerProps) {
  const [items, setItems] = useState(initialValues);
  const [inputValue, setInputValue] = useState("");

  const push = () => {
    const num = parseInt(inputValue);
    if (isNaN(num)) return;
    setItems((prev) => (type === "stack" ? [...prev, num] : [...prev, num]));
    setInputValue("");
  };

  const pop = () => {
    if (items.length === 0) return;
    setItems((prev) =>
      type === "stack" ? prev.slice(0, -1) : prev.slice(1)
    );
  };

  const isStack = type === "stack";

  return (
    <div className="my-6 rounded-lg bg-white/60 border border-ink/10 overflow-hidden paper-texture">
      <div className="p-3 border-b border-ink/10 flex items-center gap-2">
        <span className="text-sm font-serif font-semibold text-ink">
          {isStack ? "스택 (LIFO)" : "큐 (FIFO)"}
        </span>
        <div className="flex items-center gap-1 ml-auto">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && push()}
            placeholder="값"
            className="w-16 px-2 py-1 text-sm rounded bg-white/80 border border-ink/15 text-ink font-mono"
          />
          <button onClick={push} className="px-2 py-1 text-xs bg-ink hover:bg-book-charcoal text-paper rounded shadow-sm">
            {isStack ? "Push" : "Enqueue"}
          </button>
          <button
            onClick={pop}
            disabled={items.length === 0}
            className="px-2 py-1 text-xs bg-book-red hover:opacity-90 text-white rounded disabled:opacity-50 shadow-sm"
          >
            {isStack ? "Pop" : "Dequeue"}
          </button>
        </div>
      </div>

      <div className="p-6">
        {isStack ? (
          <div className="flex flex-col-reverse items-center gap-1 min-h-[200px]">
            <div className="text-xs text-ink-light/50 mt-2 font-mono">— Bottom —</div>
            <AnimatePresence>
              {items.map((item, idx) => (
                <motion.div
                  key={`${item}-${idx}`}
                  initial={{ opacity: 0, y: -30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.8 }}
                  className={`w-32 py-2 text-center rounded border-2 text-sm font-mono font-semibold ${
                    idx === items.length - 1
                      ? "border-book-blue bg-book-blue/10 text-book-blue"
                      : "border-ink/20 bg-white/80 text-ink"
                  }`}
                >
                  {item}
                  {idx === items.length - 1 && (
                    <span className="text-xs text-book-blue ml-2">← TOP</span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex items-center gap-2 overflow-x-auto min-h-[60px]">
            <div className="text-xs text-book-green shrink-0 font-mono">FRONT →</div>
            <AnimatePresence>
              {items.map((item, idx) => (
                <motion.div
                  key={`${item}-${idx}`}
                  initial={{ opacity: 0, x: 30, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.8 }}
                  className={`px-4 py-2 rounded border-2 text-sm font-mono font-semibold shrink-0 ${
                    idx === 0
                      ? "border-book-green bg-book-green/10 text-book-green"
                      : idx === items.length - 1
                      ? "border-book-blue bg-book-blue/10 text-book-blue"
                      : "border-ink/20 bg-white/80 text-ink"
                  }`}
                >
                  {item}
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="text-xs text-ink-light/50 shrink-0 font-mono">← REAR</div>
          </div>
        )}

        {items.length === 0 && (
          <div className="text-center text-ink-light text-sm py-8 font-serif italic">
            비어있음 — 값을 추가하세요
          </div>
        )}
      </div>
    </div>
  );
}
