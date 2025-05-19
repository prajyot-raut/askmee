"use client";

import React, { useEffect, useRef } from "react";
import Timer from "@/lib/timer";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  onTimeUp?: () => void;
  maxTime?: number;
  questionIndex: number; // Add this to trigger timer reset on question change
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  time,
  setTime,
  onTimeUp,
  maxTime = 20,
  questionIndex,
}) => {
  // Use useRef to maintain a single timer instance
  const timerRef = useRef<Timer | null>(null);

  useEffect(() => {
    // Create timer instance only once
    if (!timerRef.current) {
      timerRef.current = new Timer();
    }

    // Get the timer instance
    const timer = timerRef.current;

    // Reset and start the timer
    timer.stopTimer();
    timer.clearListeners();

    // Set initial time value before starting timer
    setTime(maxTime);

    // Start timer immediately
    timer.startTimer(maxTime);

    // Set up update callback
    timer.onUpdate((remainingTime) => {
      setTime(remainingTime);
    });

    // Set up end callback
    if (onTimeUp) {
      timer.onEnd(onTimeUp);
    }

    return () => {
      // Clean up when component unmounts or effect is cleaned up
      timer.stopTimer();
      timer.clearListeners();
    };
  }, [maxTime, setTime, onTimeUp, questionIndex]); // Add questionIndex to dependencies

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1 text-sm">
        <span>Time remaining</span>
        <span>{time} seconds</span>
      </div>
      <Progress
        value={time * (100 / maxTime)}
        className={`h-2 bg-gray-200 ${time < 5 ? "animate-pulse" : ""}`}
      />
    </div>
  );
};

export default ProgressBar;
