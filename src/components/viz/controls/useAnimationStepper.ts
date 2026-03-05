"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export function useAnimationStepper(totalSteps: number) {
  const [step, setStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
    clearTimer();
  }, [clearTimer]);

  const stepForward = useCallback(() => {
    setStep((s) => {
      if (s >= totalSteps - 1) {
        setIsPlaying(false);
        clearTimer();
        return s;
      }
      return s + 1;
    });
  }, [totalSteps, clearTimer]);

  const reset = useCallback(() => {
    setIsPlaying(false);
    clearTimer();
    setStep(-1);
  }, [clearTimer]);

  useEffect(() => {
    if (isPlaying) {
      clearTimer();
      intervalRef.current = setInterval(() => {
        stepForward();
      }, 800 / speed);
    }
    return clearTimer;
  }, [isPlaying, speed, stepForward, clearTimer]);

  return {
    step,
    isPlaying,
    speed,
    setSpeed,
    play,
    pause,
    stepForward,
    reset,
    isComplete: step >= totalSteps - 1,
  };
}
