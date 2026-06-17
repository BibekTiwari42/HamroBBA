"use client";

type Props = {
  pastQuestions: any;
};

export default function PastQuestionsTab({
  pastQuestions,
}: Props) {
  // ---------------- SAFE GUARD ----------------
  if (!pastQuestions) {
    return (
      <div className="text-gray-500">
        Past questions not available.
      </div>
    );
  }

  const years = pastQuestions.years || [];

  if (years.length === 0) {
    return (
      <div className="text-gray-500">
        No past questions found.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="border-b pb-3">
        <h2 className="text-2xl font-bold text-blue-700">
          Past Year Questions
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          TU Exam Questions Archive (Year-wise)
        </p>
      </div>

      {/* YEAR CARDS */}
      <div className="space-y-6">
        {years
          .sort(
            (a: any, b: any) => b.year - a.year
          )
          .map((yearData: any) => (
            <div
              key={yearData.year}
              className="border rounded-lg bg-white shadow-sm"
            >

              {/* YEAR HEADER */}
              <div className="bg-blue-50 px-4 py-3 border-b">
                <h3 className="text-lg font-semibold text-blue-800">
                  📘 {yearData.year} Exam Questions
                </h3>
              </div>

              {/* QUESTIONS */}
              <div className="p-4">
                {yearData.questions?.length > 0 ? (
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                    {yearData.questions.map(
                      (q: string, index: number) => (
                        <li key={index}>
                          {q}
                        </li>
                      )
                    )}
                  </ol>
                ) : (
                  <p className="text-gray-500">
                    No questions available for this year.
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}