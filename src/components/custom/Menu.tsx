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
import Quiz from "@/components/custom/Quiz";

const Menu = ({}) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const [category, setCategory] = useState("9");
  const [difficulty, setDifficulty] = useState("easy");

  const fetchQuestions = async () => {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
    );
    const data = await res.json();
    const questions = data.results.map((question: Question) => {
      const options = [...question.incorrect_answers, question.correct_answer];
      return {
        ...question,
        options: options.sort(() => Math.random() - 0.5),
      };
    });
    setQuestions(questions);
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

      {questions.length > 0 && (
        <div>
          <h1 className="text-4xl font-black mb-8 text-[#020202] text-center tracking-tight drop-shadow-lg">
            Quiz App
          </h1>
          <Quiz questions={questions} />
        </div>
      )}
    </>
  );
};

export default Menu;
