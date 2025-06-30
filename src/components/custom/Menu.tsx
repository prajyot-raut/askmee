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
import Button from "./Button";
import { Lobster } from "next/font/google";

const lobster = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: "400", // Lobster only supports '400'
});

interface MenuProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const Menu: React.FC<MenuProps> = ({ setQuestions }) => {
  const [category, setCategory] = useState("9");
  const [difficulty, setDifficulty] = useState("easy");

  const fetchQuestions = async () => {
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`,
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
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-0 max-w-lg border-0 overflow-hidden w-[416px] mr-[20px] mb-0 ml-[20px]">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF8200] via-[#FFC100] to-[#16db65] animate-pulse" />

          <div className="mt-3 p-4">
            <h1 className="text-3xl text-center font-bold text-[#FF8200]">
              Welcome to the
              <br />
              <span
                className={
                  "bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 bg-clip-text text-6xl text-transparent " +
                  lobster.className
                }
              >
                Askmee
              </span>
            </h1>
            <p className="text-lg mt-7 text-center text-[#ffaa00]">
              A fun quiz game to test your knowledge!
            </p>
            <div className="mt-5">
              <p>
                <span className="text-[#FF8200] font-bold">Category:</span>{" "}
              </p>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full cursor-pointer">
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
                  Difficulty Level: something
                </span>{" "}
              </p>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="w-[180px] cursor-pointer">
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
            <Button onclick={fetchQuestions} text="Start Quiz" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
