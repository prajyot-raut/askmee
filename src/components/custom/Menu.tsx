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
      <div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
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
      <button
        onClick={fetchQuestions}
        className="mt-4 px-10 py-3 bg-gradient-to-r from-[#FF8200] to-[#FFC100] text-white font-bold rounded-xl shadow-lg hover:from-[#FFC100] hover:to-[#16db65] hover:text-[#020202] transition border-2 border-[#FFC100]"
      >
        Fetch Questions
      </button>
    </>
  );
};

export default Menu;
