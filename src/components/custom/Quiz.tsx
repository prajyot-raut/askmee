"use client";

import React, { useState, useCallback } from "react";
import { Question } from "@/types/quiz";
import { decodeHtml } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "@/components/custom/ProgressBar";
import Button from "@/components/custom/Button";
import { Lobster } from "next/font/google";

interface QuizProps {
  questions: Question[];
}

const lobster = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: "400", // Lobster only supports '400'
});

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [time, setTime] = useState(20);
  const MAX_TIME = 20; // Maximum time per question

  const handleNext = useCallback(() => {
    if (selected === questions[current].correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setSelected(null);
    if (current < questions.length - 1) {
      setCurrent((prevCurrent) => prevCurrent + 1);
    } else {
      setShowScore(true);
    }
  }, [current, questions, selected]);

  const handleTimeUp = useCallback(() => {
    if (!selected && !showScore) {
      handleNext();
    }
  }, [selected, showScore, handleNext]);

  const handleOptionClick = (option: string) => {
    setSelected(option);
    setDirection(1);
    setTimeout(handleNext, 1000);
  };

  const handleRestart = useCallback(() => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowScore(false);
    setDirection(-1);
    setTime(MAX_TIME);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F7F7FF] via-[#FFC100]/40 to-[#FF8200]/30">
      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-0 w-full max-w-lg border-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF8200] via-[#FFC100] to-[#16db65] animate-pulse" />
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FFC100]/30 rounded-full blur-2xl z-0" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#16db65]/20 rounded-full blur-2xl z-0" />
        <div className="relative z-10 p-10">
          <h1 className="text-4xl font-black mb-8 text-[#020202] text-center tracking-tight drop-shadow-lg">
            <span
              className={
                "bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 bg-clip-text text-6xl text-transparent " +
                lobster.className
              }
            >
              Askmee
            </span>
          </h1>
          <AnimatePresence mode="wait" custom={direction}>
            {showScore ? (
              <motion.div
                className="text-center"
                key="score"
                initial={{ opacity: 0, x: 100 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 * direction }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-3xl font-extrabold mb-6 text-[#16db65] drop-shadow">
                  Your Score: <span className="text-[#FF8200]">{score}</span> /{" "}
                  {questions.length}
                </p>
                <Button onclick={handleRestart} text="Restart Quiz" />
              </motion.div>
            ) : (
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: 100 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 * direction }}
                transition={{ duration: 0.4 }}
              >
                <ProgressBar
                  time={time}
                  setTime={setTime}
                  onTimeUp={handleTimeUp}
                  maxTime={MAX_TIME}
                  questionIndex={current}
                />
                <div className="mb-8 text-2xl font-bold text-[#020202] text-center bg-[#F7F7FF]/80 rounded-lg py-6 px-4 shadow border-b-4 border-[#FFC100]">
                  <span className="text-[#FF8200] mr-2">Q{current + 1}.</span>{" "}
                  {decodeHtml(questions[current].question)}
                </div>
                <div className="space-y-5 mb-10">
                  {questions[current].options.map((option, index) => (
                    <motion.button
                      key={option}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.3 }}
                      onClick={() => handleOptionClick(option)}
                      className={`w-full px-6 py-4 rounded-2xl border-2 text-lg font-semibold transition text-left shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FFC100] focus:ring-offset-2
                          ${
                            selected === option
                              ? option === questions[current].correct_answer
                                ? "bg-gradient-to-r from-[#16db65] to-[#2bff01] border-[#16db65] text-[#020202] scale-105"
                                : "bg-gradient-to-r from-[#ff0000] to-[#ff0000] border-[#ff0000] text-white scale-105"
                              : "bg-[#F7F7FF]/80 border-[#FFC100] text-[#020202] hover:bg-[#FFC100]/30 hover:scale-105"
                          }
                        `}
                      disabled={!!selected}
                      style={{ cursor: selected ? "not-allowed" : "pointer" }}
                    >
                      {decodeHtml(option)}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
