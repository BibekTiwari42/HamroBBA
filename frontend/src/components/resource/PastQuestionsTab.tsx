import { PastQuestions } from "@/types/academic";

interface PastQuestionsTabProps {
  pastQuestions: PastQuestions | null | undefined;
}

export default function PastQuestionsTab({
  pastQuestions,
}: PastQuestionsTabProps) {
  if (
    !pastQuestions ||
    !pastQuestions.years ||
    pastQuestions.years.length === 0
  ) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
        <p className="text-gray-500">
          No past questions available for this subject.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {pastQuestions.years.map((yearData, index) => (
        <div
          key={index}
          className="rounded-lg border border-gray-200 bg-white p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Year {yearData.year}
          </h3>
          {yearData.questions && yearData.questions.length > 0 ? (
            <ol className="space-y-3 list-decimal list-inside">
              {yearData.questions.map((question, idx) => (
                <li key={idx} className="text-gray-700 text-sm">
                  <span className="ml-2">{question}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-500 text-sm">No questions for this year.</p>
          )}
        </div>
      ))}
    </div>
  );
}
