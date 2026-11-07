"use client";

import { useState } from "react";
import { CheckCircle, XCircle, RotateCcw, Award } from "lucide-react";
import { quizQuestions } from "@/data/quizQuestions";

export default function Module6Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(quizQuestions.length).fill(null));
  const [isComplete, setIsComplete] = useState(false);

  const question = quizQuestions[currentQ];

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    const newAnswers = [...answers];
    newAnswers[currentQ] = optionIndex;
    setAnswers(newAnswers);
    if (optionIndex === question.correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setAnswers(new Array(quizQuestions.length).fill(null));
    setIsComplete(false);
  };

  const percentage = Math.round((score / quizQuestions.length) * 100);

  if (isComplete) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center w-full">
        <div className="w-14 h-14 rounded-2xl bg-[#EF3837]/10 text-[#EF3837] border border-[#EF3837]/30 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Award size={28} />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Assessment Complete
        </h1>

        <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-6">
          Final Score: <span className="font-bold text-gray-900 dark:text-white">{score} / {quizQuestions.length}</span> ({percentage}%)
        </p>

        {/* Score Bar */}
        <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-8 max-w-sm mx-auto border border-gray-200 dark:border-gray-700">
          <div
            className={`h-full rounded-full transition-all duration-700 ${percentage >= 70 ? "bg-emerald-600" : percentage >= 50 ? "bg-amber-500" : "bg-red-500"}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Itemized Review */}
        <div className="text-left space-y-2 mb-8">
          {quizQuestions.map((q, i) => {
            const userAnswer = answers[i];
            const isCorrect = userAnswer === q.correct;
            return (
              <div
                key={q.id}
                className={`p-3.5 rounded-xl border text-xs ${
                  isCorrect
                    ? "bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60"
                    : "bg-red-50/60 dark:bg-red-950/30 border-red-200 dark:border-red-800/60"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {isCorrect ? (
                    <CheckCircle size={15} className="text-emerald-700 dark:text-emerald-400 mt-0.5 shrink-0" />
                  ) : (
                    <XCircle size={15} className="text-red-700 dark:text-red-400 mt-0.5 shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className={`font-semibold ${isCorrect ? "text-gray-900 dark:text-emerald-100" : "text-gray-900 dark:text-red-100"}`}>
                      {q.question}
                    </p>
                    {!isCorrect && (
                      <p className="mt-1 text-[11px] font-mono text-gray-600 dark:text-gray-400">
                        Selected: <span className="text-red-700 dark:text-red-400">{q.options[userAnswer!]}</span> | 
                        Verified: <span className="text-emerald-800 dark:text-emerald-400 font-bold">{q.options[q.correct]}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl text-xs font-semibold font-mono text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1E2228] transition-colors cursor-pointer"
        >
          <RotateCcw size={13} /> Retake Assessment
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-400 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#EF3837]/10 text-[#EF3837] border border-[#EF3837]/20 font-bold">
            MODULE 06
          </span>
          <span>ESTIMATED: 4 MINUTES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
          Knowledge Verification
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          Test your understanding of chunking mechanics, embedding space, and retrieval pipelines.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2 text-xs font-mono text-gray-500 dark:text-gray-400">
          <span>QUESTION {currentQ + 1} OF {quizQuestions.length}</span>
          <span>SCORE: <strong className="text-gray-900 dark:text-white">{score}</strong></span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
          <div
            className="h-full bg-[#EF3837] rounded-full transition-all duration-300"
            style={{ width: `${((currentQ + (isAnswered ? 1 : 0)) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#15181C] overflow-hidden shadow-sm mb-6">
        <div className="px-5 py-2.5 bg-gray-50 dark:bg-[#181B20] border-b border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] font-mono text-gray-500 dark:text-gray-400 font-bold">
          <span>TOPIC: {question.module.toUpperCase()}</span>
          <span>ITEM #{question.id}</span>
        </div>

        <div className="p-5">
          <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-4 leading-relaxed">
            {question.question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {question.options.map((option, i) => {
              let style = "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-[#181B20] dark:hover:border-gray-600 dark:hover:bg-[#1E232B]";
              if (isAnswered) {
                if (i === question.correct) {
                  style = "border-emerald-300 bg-emerald-50 text-emerald-950 font-medium dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-200 ring-1 ring-emerald-500";
                } else if (i === selectedAnswer && i !== question.correct) {
                  style = "border-red-300 bg-red-50 text-red-950 dark:border-red-600 dark:bg-red-950/40 dark:text-red-200";
                } else {
                  style = "border-gray-200 opacity-40 dark:border-gray-800 dark:bg-[#131518]";
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={isAnswered}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-start gap-2.5 cursor-pointer ${style}`}
                >
                  <span className={`w-5 h-5 rounded-md border flex items-center justify-center text-[10px] font-mono shrink-0 ${
                    isAnswered && i === question.correct
                      ? "bg-emerald-600 border-emerald-600 text-white font-bold"
                      : isAnswered && i === selectedAnswer
                      ? "bg-red-600 border-red-600 text-white font-bold"
                      : "border-gray-300 text-gray-500 bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:bg-[#1F232A]"
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-gray-800 dark:text-gray-200 leading-relaxed font-sans">{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div className="px-5 py-3.5 bg-gray-50 dark:bg-[#181B20] border-t border-gray-100 dark:border-gray-800">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[#EF3837] mb-1 font-bold">Why This Is Correct</p>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{question.explanation}</p>
          </div>
        )}

        {isAnswered && (
          <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#15181C]">
            <button
              onClick={handleNext}
              className="w-full py-2.5 bg-[#EF3837] hover:bg-[#D92D20] text-white rounded-xl text-xs font-semibold font-mono transition-colors shadow-2xs cursor-pointer"
            >
              {currentQ < quizQuestions.length - 1 ? "Next Question" : "Complete Assessment"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
