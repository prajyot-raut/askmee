"use client";

import React, { useEffect, useRef } from "react";
import Timer from "@/lib/timer";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  onTimeUp?: () => void;
  maxTime?: number;
  questionIndex: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  time,
  setTime,
  onTimeUp,
  maxTime = 20,
  questionIndex,
}) => {
  const timerRef = useRef<Timer | null>(null);

  useEffect(() => {
    if (!timerRef.current) {
      timerRef.current = new Timer();
    }

    const timer = timerRef.current;

    timer.stopTimer();
    timer.clearListeners();

    setTime(maxTime);

    timer.startTimer(maxTime);

    timer.onUpdate((remainingTime) => {
      setTime(remainingTime);
    });

    if (onTimeUp) {
      timer.onEnd(onTimeUp);
    }

    return () => {
      timer.stopTimer();
      timer.clearListeners();
    };
  }, [maxTime, setTime, onTimeUp, questionIndex]);

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
