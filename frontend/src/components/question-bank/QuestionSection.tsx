"use client";

import { useState } from "react";
import { PastQuestion } from "@/lib/api/past-questions";

interface Props {
  title: string;
  questions: PastQuestion[];
}

const SECTION_INFO: Record<string, string> = {
  "Group A": "Brief Answer Questions",
  "Group B": "Short Answer Questions (Attempt any SIX)",
  "Group C": "Long Answer Questions (Attempt any THREE)",
  "Group D": "Comprehensive Answer / Case / Situation Analysis Questions",
};

const SECTION_MARKS: Record<string, string> = {
  "Group A": "[10×2=20]",
  "Group B": "[6×5=30]",
  "Group C": "[3×10=30]",
  "Group D": "[4×5=20]",
};

export default function QuestionSection({ title, questions }: Props) {
  // State to hold the currently selected question for the answer popup
  const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);

  if (!questions.length) {
    return null;
  }

  const sectionLetter = title.split(" ")[1] || "A";

  return (
    <section className="mt-10 first:mt-4">
      {/* Section Header */}
      <div className="text-center mb-4 print:block">
        <h3 className="text-base font-serif font-bold tracking-wide text-blue-500">
          &ldquo;Group {sectionLetter}&rdquo;
        </h3>
      </div>

      {/* Group Info Header */}
      <div className="flex justify-between items-baseline border-b border-gray-300 pb-2 mb-4">
        <h4 className="text-[15px] font-serif font-bold text-blue-500">
          {SECTION_INFO[title]} :
        </h4>
        <span className="text-[14px] font-serif font-bold text-blue-500 tabular-nums">
          {SECTION_MARKS[title]}
        </span>
      </div>

      {/* Questions Stack */}
      <div className="space-y-1 print:space-y-4 print:divide-y print:divide-dashed print:divide-gray-200">
        {questions.map((question) => (
          <div
            key={question.id}
            onClick={() => setSelectedQuestion(question)}
            className="group flex items-start gap-3 text-[15px] leading-relaxed font-serif text-gray-900 cursor-pointer p-3 -mx-3 rounded-xl border border-transparent transition-all duration-200 hover:bg-blue-50/30 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-100/60 print:p-0 print:mx-0 print:border-none print:shadow-none print:bg-transparent"
          >
            <span className="min-w-[24px] font-medium text-right select-none text-gray-500 group-hover:text-blue-600 transition-colors">
              {question.question_number}.
            </span>
            <div className="flex-1 whitespace-pre-line antialiased">
              {question.question_text}
            </div>
            
            {/* Elegant tiny hint visible only on desktop hover */}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-sans font-medium text-blue-600 bg-blue-100/70 px-2 py-0.5 rounded-md self-center hidden sm:inline print:hidden">
              View Answer
            </span>
          </div>
        ))}
      </div>

      {/* Popup Panel / Modal */}
      {selectedQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in print:hidden">
          <div 
            className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl border border-gray-100 animate-slide-up"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the panel
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b pb-3">
              <h5 className="font-sans font-bold text-gray-900">
                Question {selectedQuestion.question_number} Answer
              </h5>
              <button
                onClick={() => setSelectedQuestion(null)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 font-serif text-[15px] text-gray-700 italic">
                &ldquo;{selectedQuestion.question_text}&rdquo;
              </div>
              
              <div className="font-sans text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {/* Dynamically falls back if your Django API doesn't include an answer field yet */}
                {selectedQuestion.answer_text || (
                  <p className="text-gray-400 italic">
                    Solution documentation, key grading points, and step-by-step reference material will be synchronized here from the dashboard database configuration.
                  </p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end border-t pt-3">
              <button
                onClick={() => setSelectedQuestion(null)}
                className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
              >
                Close Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
