"use client";

import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";

interface AnimationControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  disabled?: boolean;
}

export default function AnimationControls({
  isPlaying,
  onPlay,
  onPause,
  onStep,
  onReset,
  speed,
  onSpeedChange,
  disabled,
}: AnimationControlsProps) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-paper-dark border border-ink/10">
      <button
        onClick={isPlaying ? onPause : onPlay}
        disabled={disabled}
        className="p-1.5 rounded-md hover:bg-white/60 text-ink disabled:opacity-50 transition-colors"
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>
      <button
        onClick={onStep}
        disabled={disabled || isPlaying}
        className="p-1.5 rounded-md hover:bg-white/60 text-ink disabled:opacity-50 transition-colors"
      >
        <SkipForward size={16} />
      </button>
      <button
        onClick={onReset}
        className="p-1.5 rounded-md hover:bg-white/60 text-ink transition-colors"
      >
        <RotateCcw size={16} />
      </button>
      <div className="flex items-center gap-1 ml-2">
        <span className="text-xs text-ink-light font-mono">속도</span>
        <input
          type="range"
          min={0.25}
          max={3}
          step={0.25}
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className="w-16 accent-book-blue"
        />
        <span className="text-xs text-ink-light font-mono w-8">{speed}x</span>
      </div>
    </div>
  );
}
