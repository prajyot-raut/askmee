"use client";

import React, { useState } from "react";
import { Question } from "@/types/quiz";

interface QuizProps {
  questions: Question[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected === questions[current].correct_answer) {
      setScore(score + 1);
    }
    setSelected(null);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowScore(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F7F7FF] via-[#FFC100]/40 to-[#FF8200]/30">
      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-0 w-full max-w-lg border-0 overflow-hidden">
        {/* Decorative Gradient Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF8200] via-[#FFC100] to-[#16db65] animate-pulse" />
        {/* Decorative Circles */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FFC100]/30 rounded-full blur-2xl z-0" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#16db65]/20 rounded-full blur-2xl z-0" />
        <div className="relative z-10 p-10">
          <h1 className="text-4xl font-black mb-8 text-[#020202] text-center tracking-tight drop-shadow-lg">
            <span className="bg-gradient-to-r from-[#FF8200] via-[#FFC100] to-[#16db65] bg-clip-text text-transparent">
              Quiz App
            </span>
          </h1>
          {showScore ? (
            <div className="text-center">
              <p className="text-3xl font-extrabold mb-6 text-[#16db65] drop-shadow">
                Your Score: <span className="text-[#FF8200]">{score}</span> /{" "}
                {questions.length}
              </p>
              <button
                className="mt-4 px-10 py-3 bg-gradient-to-r from-[#FF8200] to-[#FFC100] text-white font-bold rounded-xl shadow-lg hover:from-[#FFC100] hover:to-[#16db65] hover:text-[#020202] transition border-2 border-[#FFC100]"
                onClick={handleRestart}
              >
                Restart Quiz
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-8 text-2xl font-bold text-[#020202] text-center bg-[#F7F7FF]/80 rounded-lg py-6 px-4 shadow border-b-4 border-[#FFC100]">
                <span className="text-[#FF8200] mr-2">Q{current + 1}.</span>{" "}
                {questions[current].question}
              </div>
              <div className="space-y-5 mb-10">
                {questions[current].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    className={`w-full px-6 py-4 rounded-2xl border-2 text-lg font-semibold transition text-left shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FFC100] focus:ring-offset-2
                        ${
                          selected === option
                            ? option === questions[current].answer
                              ? "bg-gradient-to-r from-[#16db65] to-[#F7F7FF] border-[#16db65] text-[#020202] scale-105"
                              : "bg-gradient-to-r from-[#FF8200] to-[#FFC100] border-[#FF8200] text-white scale-105"
                            : "bg-[#F7F7FF]/80 border-[#FFC100] text-[#020202] hover:bg-[#FFC100]/30 hover:scale-105"
                        }
                      `}
                    disabled={!!selected}
                    style={{ cursor: selected ? "not-allowed" : "pointer" }}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                className="w-full px-6 py-4 bg-gradient-to-r from-[#020202] to-[#FF8200] text-[#FFC100] font-extrabold rounded-2xl shadow-xl disabled:bg-gray-300 disabled:text-gray-500 transition uppercase tracking-wider hover:from-[#FF8200] hover:to-[#16db65] hover:text-white border-2 border-[#FF8200] text-lg"
                onClick={handleNext}
                disabled={!selected}
              >
                {current === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
