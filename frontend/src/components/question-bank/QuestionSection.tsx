"use client";

import { useState } from "react";
import { PastQuestion } from "@/lib/api/past-questions";
import QuestionBody from "@/components/question-bank/QuestionBody";

interface Props {
  title: string;
  questions: PastQuestion[];
  fullMarks?: number | String;
}

function getSectionInfo(
  title: string,
  fullMarks?: number | String
): { info: string; marks: string } {
  const safeTitle = title.trim();
  const is60Marks = Number(fullMarks) === 60;

  if (is60Marks) {
    switch (safeTitle) {
      case "Group A":
        return { info: "Brief Answer Questions", marks: "[10×1=10]" };
      case "Group B":
        return {
          info: "Short Answer Questions (Attempt any Five)",
          marks: "[5×3=15]",
        };
      case "Group C":
        return {
          info: "Long Answer Questions (Attempt any Three)",
          marks: "[3×5=15]",
        };
      case "Group D":
        return {
          info: "Comprehensive Answer / Case / Situation Analysis Questions",
          marks: "[20]",
        };
    }
  }

  switch (safeTitle) {
    case "Group A":
      return { info: "Brief Answer Questions", marks: "[10×2=20]" };
    case "Group B":
      return {
        info: "Short Answer Questions (Attempt any Six)",
        marks: "[6×5=30]",
      };
    case "Group C":
      return {
        info: "Long Answer Questions (Attempt any Three)",
        marks: "[3×10=30]",
      };
    case "Group D":
      return {
        info: "Comprehensive Answer / Case / Situation Analysis Questions",
        marks: "[4×5=20]",
      };
  }

  return { info: safeTitle, marks: "" };
} 

export default function QuestionSection({
  title,
  questions,
  fullMarks = 100,
}: Props) {
  // Managing local tracking loop states for modal operations
  const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);

  if (!questions.length) {
    return null;
  }

  const sectionLetter = title.split(" ")[1] || "A";

  const { info, marks } = getSectionInfo(title, fullMarks);

  return (
    <section className="mt-8 first:mt-2 transition-colors duration-200">
      <div className="text-center mb-3 print:block">
        <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          &ldquo;Group {sectionLetter}&rdquo;
        </h3>
      </div>

      <div className="flex justify-between items-baseline border-b border-slate-200 dark:border-slate-800 pb-2 mb-3">
        <h4 className="text-sm font-serif font-bold text-slate-800 dark:text-slate-200">
          {info} :
        </h4>
        <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 tabular-nums">
          {marks}
        </span>
      </div>

      <div className="space-y-1 print:space-y-4 print:divide-y print:divide-dashed print:divide-slate-200">
        {questions.map((question) => (
          <div
            key={question.id}
            onClick={() => setSelectedQuestion(question)}
            className="group flex items-start gap-3 cursor-pointer p-2.5 -mx-2.5 rounded-xl border border-transparent transition-all duration-200 hover:bg-blue-50/40 hover:border-blue-100/50 hover:shadow-sm dark:hover:bg-blue-950/20 dark:hover:border-blue-900/30 print:p-0 print:mx-0 print:border-none print:shadow-none print:bg-transparent"
          >
            <span className="min-w-[24px] font-mono text-sm font-bold text-right select-none text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {question.question_number}.
            </span>

            {/* QUESTION CONTENT AREA */}
            <div className="flex-1 min-w-0 antialiased">
              <QuestionBody content={question.question_text} />
            </div>

            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-sans font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/40 self-center hidden sm:inline print:hidden">
              Solution
            </span>
          </div>
        ))}
      </div>
      {/* Popup Panel / Modal */}
      {selectedQuestion && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in print:hidden"
          onClick={() => setSelectedQuestion(null)}
        >
          <div
            className="w-full max-w-4xl rounded-xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 transition-all duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
              <h5 className="text-base font-bold text-slate-900 dark:text-white">
                Question {selectedQuestion.question_number}
              </h5>
              <button
                onClick={() => setSelectedQuestion(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="mt-4 space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin">
              {/* Question */}
              <div>
                <QuestionBody content={selectedQuestion.question_text} />
              </div>

              {/* Answer Section */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                <h6 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                  Answer
                </h6>

                {selectedQuestion.answer_text ? (
                  <QuestionBody content={selectedQuestion.answer_text} />
                ) : (
                  <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-lg p-4 text-center">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Please <a href="/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">login</a> to view the answer
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-4 flex justify-end border-t border-slate-200 pt-3 dark:border-slate-800">
              <button
                onClick={() => setSelectedQuestion(null)}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}