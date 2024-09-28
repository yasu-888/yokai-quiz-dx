"use client";

import { useState, useEffect } from "react";

interface Quiz {
  id: number;
  name: string;
  answer: string;
  choices: string[];
}

export default function QuizApp() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true); // ローディング状態
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      // const res = await fetch("/api/data");
      const basePath =
        process.env.NODE_ENV === "production" ? "/yokai-quiz-dx" : "";
      const res = await fetch(`${basePath}/db.json`); // ちょっと時間かかるけどいける！

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await res.json();
      setQuizzes(jsonData);
      setLoading(false); // データ取得後にローディングを解除
    }

    fetchData().catch((error) => {
      console.error(error);
      setLoading(false); // エラー発生時にもローディングを解除
    });
  }, []);

  if (loading) {
    return (
      <div className="mt-32 text-center text-lg font-bold">Loading...</div>
    ); // ローディング中の表示
  }

  const currentQuiz = quizzes[currentQuizIndex];
  const shuffledChoices = currentQuiz.choices.sort(() => 0.5 - Math.random());

  const handleClick = (choice: string) => {
    alert(
      choice === currentQuiz.answer
        ? "正解！"
        : `残念！ 正解は${currentQuiz.answer}です。`
    );
    if (choice === currentQuiz.answer) {
      setCorrectCount(correctCount + 1);
    }

    if (currentQuizIndex >= 9) {
      alert(`全${currentQuizIndex + 1}問終了！正解数は${correctCount}問です。`);
      setCurrentQuizIndex(0);
      setCorrectCount(0);
    } else {
      setCurrentQuizIndex(currentQuizIndex + 1);
    }
  };

  return (
    <div className="text-center">
      <header className="m-8 text-4xl">
        <h1>妖怪 都道府県クイズ</h1>
      </header>
      <main>
        <div>
          <p className="text-gray-600">第{currentQuizIndex + 1}問</p>
          <p className="m-4 text-2xl font-bold text-indigo-950">
            {currentQuiz.name}
          </p>
        </div>
        <div className="grid grid-cols-1 max-w-screen-sm md:grid-cols-2 md:max-w-screen-md gap-4 m-auto px-32 text-indigo-900 font-bold">
          {shuffledChoices.map((choice: string, idx: number) => {
            return (
              <button
                className="m-2 p-2 w-full  border-2 border-indigo-900 rounded-lg bg-indigo-200 hover:bg-indigo-900 hover:text-white"
                key={idx}
                onClick={() => handleClick(choice)}
              >
                {choice}
              </button>
            );
          })}
        </div>
        <div>
          <p className="m-8 text-xl font-bold">
            {correctCount} / {currentQuizIndex} 問正解中
          </p>
        </div>
      </main>

      <footer className="m-8 text-gray-400 text-sm">
        <p>出典: 文春新書 水木しげるロード全妖怪図鑑 </p>
      </footer>
    </div>
  );
}
