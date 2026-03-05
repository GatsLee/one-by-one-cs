"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import AnimationControls from "./controls/AnimationControls";
import { useAnimationStepper } from "./controls/useAnimationStepper";

interface SortingVisualizerProps {
  values?: number[];
  algorithm?: "bubble" | "selection" | "insertion" | "merge" | "quick";
}

interface SortStep {
  array: number[];
  comparing: [number, number] | null;
  swapping: [number, number] | null;
  sorted: Set<number>;
}

function generateBubbleSortSteps(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];
  const sorted = new Set<number>();

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push({ array: [...a], comparing: [j, j + 1], swapping: null, sorted: new Set(sorted) });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({ array: [...a], comparing: null, swapping: [j, j + 1], sorted: new Set(sorted) });
      }
    }
    sorted.add(a.length - i - 1);
  }
  steps.push({ array: [...a], comparing: null, swapping: null, sorted: new Set(a.map((_, i) => i)) });
  return steps;
}

function generateSelectionSortSteps(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];
  const sorted = new Set<number>();

  for (let i = 0; i < a.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < a.length; j++) {
      steps.push({ array: [...a], comparing: [minIdx, j], swapping: null, sorted: new Set(sorted) });
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      steps.push({ array: [...a], comparing: null, swapping: [i, minIdx], sorted: new Set(sorted) });
    }
    sorted.add(i);
  }
  steps.push({ array: [...a], comparing: null, swapping: null, sorted: new Set(a.map((_, i) => i)) });
  return steps;
}

function generateInsertionSortSteps(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];
  const sorted = new Set<number>([0]);

  for (let i = 1; i < a.length; i++) {
    let j = i;
    while (j > 0 && a[j - 1] > a[j]) {
      steps.push({ array: [...a], comparing: [j - 1, j], swapping: null, sorted: new Set(sorted) });
      [a[j - 1], a[j]] = [a[j], a[j - 1]];
      steps.push({ array: [...a], comparing: null, swapping: [j - 1, j], sorted: new Set(sorted) });
      j--;
    }
    sorted.add(i);
  }
  steps.push({ array: [...a], comparing: null, swapping: null, sorted: new Set(a.map((_, i) => i)) });
  return steps;
}

const ALGORITHMS: Record<string, { label: string; fn: (arr: number[]) => SortStep[] }> = {
  bubble: { label: "버블 정렬", fn: generateBubbleSortSteps },
  selection: { label: "선택 정렬", fn: generateSelectionSortSteps },
  insertion: { label: "삽입 정렬", fn: generateInsertionSortSteps },
};

export default function SortingVisualizer({
  values = [38, 27, 43, 3, 9, 82, 10, 55, 21, 45],
  algorithm = "bubble",
}: SortingVisualizerProps) {
  const [alg, setAlg] = useState<string>(algorithm);
  const [data, setData] = useState(values);

  const steps = useMemo(() => {
    return (ALGORITHMS[alg]?.fn || generateBubbleSortSteps)(data);
  }, [alg, data]);

  const stepper = useAnimationStepper(steps.length);

  const currentStep = stepper.step >= 0 && stepper.step < steps.length
    ? steps[stepper.step]
    : { array: data, comparing: null, swapping: null, sorted: new Set<number>() };

  const maxVal = Math.max(...data);

  const shuffle = () => {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    setData(shuffled);
    stepper.reset();
  };

  return (
    <div className="my-6 rounded-lg bg-white/60 border border-ink/10 overflow-hidden paper-texture">
      <div className="p-3 border-b border-ink/10 flex flex-wrap items-center gap-2">
        <span className="text-sm font-serif font-semibold text-ink">정렬 시각화</span>

        <div className="flex gap-1 ml-auto">
          {Object.entries(ALGORITHMS).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => { setAlg(key); stepper.reset(); }}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                alg === key
                  ? "bg-ink text-paper"
                  : "bg-paper-dark text-ink-light hover:text-ink border border-ink/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={shuffle}
          className="px-2 py-1 text-xs bg-paper-dark hover:bg-wood/50 text-ink rounded border border-ink/10"
        >
          셔플
        </button>
      </div>

      <div className="px-3 py-2 border-b border-ink/10">
        <AnimationControls
          isPlaying={stepper.isPlaying}
          onPlay={stepper.play}
          onPause={stepper.pause}
          onStep={stepper.stepForward}
          onReset={stepper.reset}
          speed={stepper.speed}
          onSpeedChange={stepper.setSpeed}
          disabled={stepper.isComplete}
        />
      </div>

      <div className="p-6 flex items-end justify-center gap-1 h-[250px]">
        {currentStep.array.map((val, idx) => {
          const isComparing = currentStep.comparing?.includes(idx);
          const isSwapping = currentStep.swapping?.includes(idx);
          const isSorted = currentStep.sorted.has(idx);

          let bgColor = "bg-wood";
          if (isSwapping) bgColor = "bg-book-red";
          else if (isComparing) bgColor = "bg-book-blue";
          else if (isSorted) bgColor = "bg-book-green";

          return (
            <motion.div
              key={idx}
              layout
              className={`${bgColor} rounded-t transition-colors flex flex-col items-center justify-end`}
              style={{
                width: `${Math.max(20, 600 / currentStep.array.length - 4)}px`,
                height: `${(val / maxVal) * 180 + 20}px`,
              }}
            >
              <span className="text-xs text-white font-mono mb-1">
                {val}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="px-3 pb-3 flex items-center gap-3 text-xs text-ink-light font-mono">
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-book-blue rounded" /> 비교</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-book-red rounded" /> 교환</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-book-green rounded" /> 정렬 완료</span>
      </div>
    </div>
  );
}
