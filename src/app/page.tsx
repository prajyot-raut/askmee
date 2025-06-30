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
        <div data-oid="-kdmkfp">
          <Menu
            questions={questions}
            setQuestions={setQuestions}
            data-oid="g75dgc7"
          />
        </div>
      )}

      {questions.length > 0 && (
        <div data-oid="86rg49p">
          <Quiz questions={questions} data-oid="u_v3ci8" />
        </div>
      )}
    </>
  );
}
