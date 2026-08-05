"use client";

import QuestionSection from "./QuestionSection";

interface Props {
  questions: any[];
  fullMarks?: number;
}

export default function PaperQuestions({ questions, fullMarks = 100 }: Props) {
  const groupA = questions.filter((q) => q.section === "A");
  const groupB = questions.filter((q) => q.section === "B");
  const groupC = questions.filter((q) => q.section === "C");
  const groupD = questions.filter((q) => q.section === "D");

  return (
    <div className="space-y-2">
      <QuestionSection title="Group A" questions={groupA} fullMarks={fullMarks} />
      <QuestionSection title="Group B" questions={groupB} fullMarks={fullMarks} />
      <QuestionSection title="Group C" questions={groupC} fullMarks={fullMarks} />
      <QuestionSection title="Group D" questions={groupD} fullMarks={fullMarks} />
    </div>
  );
}
