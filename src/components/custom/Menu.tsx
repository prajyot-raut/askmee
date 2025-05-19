"use client";

import { Question } from "@/types/quiz";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dummyQuestions } from "@/data/dummyQuestions";

interface MenuProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const Menu: React.FC<MenuProps> = ({ questions, setQuestions }) => {
  const [category, setCategory] = useState("9");
  const [difficulty, setDifficulty] = useState("easy");

  const fetchQuestions = async () => {
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=2&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      const data = await res.json();
      const questions = data.results.map((question: Question) => {
        const options = [
          ...question.incorrect_answers,
          question.correct_answer,
        ];
        return {
          ...question,
          options: options.sort(() => Math.random() - 0.5),
        };
      });
      setQuestions(questions);
    } catch (error) {
      console.log("Error fetching questions:", error);
      // Fallback to dummy questions in case of an error
      const fallbackQuestions = dummyQuestions.map((question) => {
        const options = [
          ...question.incorrect_answers,
          question.correct_answer,
        ];
        return {
          ...question,
          options: options.sort(() => Math.random() - 0.5),
        };
      });
      setQuestions(fallbackQuestions as Question[]);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F7F7FF] via-[#FFC100]/40 to-[#FF8200]/30">
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-0 w-full max-w-lg border-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF8200] via-[#FFC100] to-[#16db65] animate-pulse" />
          <div className="mt-10 p-4">
            <h1 className="text-3xl text-center font-bold text-[#FF8200]">
              Welcome to the Askmee
            </h1>
            <p className="text-lg text-[#020202]">
              Choose your quiz settings and start the game!
            </p>
            <div className="mt-7">
              <p>
                <span className="text-[#FF8200] font-bold">Category:</span>{" "}
              </p>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Category</SelectItem>
                  <SelectItem value="9">General Knowledge</SelectItem>
                  <SelectItem value="10">Entertainment: Books</SelectItem>
                  <SelectItem value="11">Entertainment: Film</SelectItem>
                  <SelectItem value="12">Entertainment: Music</SelectItem>
                  <SelectItem value="13">
                    Entertainment: Musicals & Theatres
                  </SelectItem>
                  <SelectItem value="14">Entertainment: Television</SelectItem>
                  <SelectItem value="15">Entertainment: Video Games</SelectItem>
                  <SelectItem value="16">Entertainment: Board Games</SelectItem>
                  <SelectItem value="17">Science & Nature</SelectItem>
                  <SelectItem value="18">Science: Computers</SelectItem>
                  <SelectItem value="19">Science: Mathematics</SelectItem>
                  <SelectItem value="20">Mythology</SelectItem>
                  <SelectItem value="21">Sports</SelectItem>
                  <SelectItem value="22">Geography</SelectItem>
                  <SelectItem value="23">History</SelectItem>
                  <SelectItem value="24">Politics</SelectItem>
                  <SelectItem value="25">Art</SelectItem>
                  <SelectItem value="26">Celebrities</SelectItem>
                  <SelectItem value="27">Animals</SelectItem>
                  <SelectItem value="28">Vehicles</SelectItem>
                  <SelectItem value="29">Entertainment: Comics</SelectItem>
                  <SelectItem value="30">Science: Gadgets</SelectItem>
                  <SelectItem value="31">
                    Entertainment: Japanese Anime & Manga
                  </SelectItem>
                  <SelectItem value="32">
                    Entertainment: Cartoon & Animations
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-7">
              <p>
                <span className="text-[#FF8200] font-bold">
                  Difficulty Level:
                </span>{" "}
              </p>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <button
              onClick={fetchQuestions}
              className="mt-4 px-10 py-3 text-white font-bold rounded-xl shadow-lg border-2 border-[#FFC100] relative overflow-hidden bg-gradient-to-r from-[#FF8200] via-[#FFC100] to-[#FF8200] bg-[length:200%_100%] bg-left hover:bg-right transition-[background-position,color] duration-500 ease-in-out"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
