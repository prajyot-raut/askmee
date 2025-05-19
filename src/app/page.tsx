"use client";

import React, { useState } from "react";
import Menu from "@/components/custom/Menu";
import { Question } from "@/types/quiz";
import Quiz from "@/components/custom/Quiz";

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);

  return (
    <>
      {questions.length === 0 && (
        <div>
          <Menu questions={questions} setQuestions={setQuestions} />
        </div>
      )}

      {questions.length > 0 && (
        <div>
          <Quiz questions={questions} />
        </div>
      )}
    </>
  );
}
