"use client";

import QuestionSection from "./QuestionSection";

interface Props {
  questions: any[];
}

export default function PaperQuestions({ questions }: Props) {
  const groupA = questions.filter((q) => q.section === "A");
  const groupB = questions.filter((q) => q.section === "B");
  const groupC = questions.filter((q) => q.section === "C");
  const groupD = questions.filter((q) => q.section === "D");

  return (
    <div className="space-y-2">
      <QuestionSection title="Group A" questions={groupA} />
      <QuestionSection title="Group B" questions={groupB} />
      <QuestionSection title="Group C" questions={groupC} />
      <QuestionSection title="Group D" questions={groupD} />
    </div>
  );
}
