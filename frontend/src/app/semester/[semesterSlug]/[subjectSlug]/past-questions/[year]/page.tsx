import { notFound } from "next/navigation";
import { getPastPaper } from "@/lib/api/past-questions";

interface Props {
  params: Promise<{
    semesterSlug: string;
    subjectSlug: string;
    year: string;
  }>;
}

export default async function PastPaperPage({ params }: Props) {
  const { subjectSlug, year } = await params;

  const paper = await getPastPaper(subjectSlug, year);

  if (!paper) {
    notFound();
  }

  const groupA = paper.questions.filter((q) => q.section === "A");
  const groupB = paper.questions.filter((q) => q.section === "B");
  const groupC = paper.questions.filter((q) => q.section === "C");
  const groupD = paper.questions.filter((q) => q.section === "D");

  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-gray-100 bg-white p-6 sm:p-12 shadow-sm">
      {/* Exam Header */}
      <div className="border-b border-gray-200 pb-8 text-center sm:text-left">
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
          Board Question Bank
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Past Question — {paper.year}
        </h1>

        {/* Exam Metadata Grid */}
        <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl bg-gray-50 p-4 text-center sm:text-left sm:flex sm:gap-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Full Marks</p>
            <p className="mt-1 text-lg font-bold text-gray-900">{paper.full_marks}</p>
          </div>
          <div className="border-x border-gray-200 px-4 sm:border-y-0 sm:px-0">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Pass Marks</p>
            <p className="mt-1 text-lg font-bold text-gray-900">{paper.pass_marks}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Duration</p>
            <p className="mt-1 text-lg font-bold text-gray-900">{paper.duration}</p>
          </div>
        </div>

        {/* Instructions block if it exists in your data */}
        {paper.instructions && (
          <div className="mt-4 text-xs leading-relaxed text-gray-500 italic">
            <strong>Instructions:</strong> {paper.instructions}
          </div>
        )}
      </div>

      {/* Questions Stack */}
      <div className="mt-10 divide-y divide-gray-100 space-y-12">
        <QuestionSection title="Group A" questions={groupA} />
        <div className="pt-8"><QuestionSection title="Group B" questions={groupB} /></div>
        <div className="pt-8"><QuestionSection title="Group C" questions={groupC} /></div>
        <div className="pt-8"><QuestionSection title="Group D" questions={groupD} /></div>
      </div>
    </div>
  );
}

function QuestionSection({
  title,
  questions,
}: {
  title: string;
  questions: any[];
}) {
  if (questions.length === 0) {
    return null;
  }

  return (
    <section>
      {/* Group Title Badge */}
      <div className="mb-6 flex items-center gap-4">
        <h2 className="text-lg font-bold uppercase tracking-wide text-gray-800">
          {title}
        </h2>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="space-y-6">
        {questions.map((question) => (
          <div
            key={question.id}
            className="group relative flex flex-col sm:flex-row items-start gap-2 sm:gap-4 rounded-xl p-4 transition-colors hover:bg-gray-50/50"
          >
            {/* Question Number Anchor */}
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold text-gray-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              {question.question_number}
            </div>

            {/* Content Body */}
            <div className="flex-1 pt-0.5">
              <p className="text-base leading-relaxed text-gray-800 whitespace-pre-line">
                {question.question_text}
              </p>
            </div>

            {/* Marks Tag */}
            {question.marks && (
              <div className="mt-2 sm:mt-0 shrink-0 self-end sm:self-start">
                <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  [{question.marks}★]
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
