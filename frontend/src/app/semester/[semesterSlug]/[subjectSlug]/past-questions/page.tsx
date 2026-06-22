import Link from "next/link";

import { getPastPapers } from "@/lib/api/past-questions";

interface Props {
  params: Promise<{
    semesterSlug: string;
    subjectSlug: string;
  }>;
}

export default async function PastQuestionsPage({
  params,
}: Props) {
  const { semesterSlug, subjectSlug } =
    await params;

  const papers = await getPastPapers(
    subjectSlug
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Past Questions
        </h1>

        <p className="mt-2 text-gray-600">
          Select an examination year.
        </p>
      </div>

      {papers.length === 0 ? (
        <div className="rounded-xl border bg-white p-8">
          No past questions available.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {papers.map((paper) => (
            <Link
              key={paper.id}
              href={`/semester/${semesterSlug}/${subjectSlug}/past-questions/${paper.year}`}
              className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-2xl font-bold">
                {paper.year}
              </div>

              <div className="mt-2 text-sm text-gray-500">
                Full Marks:
                {" "}
                {paper.full_marks}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}