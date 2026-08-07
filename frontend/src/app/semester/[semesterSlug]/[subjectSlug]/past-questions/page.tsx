import { redirect } from "next/navigation";
import { getPastPapers } from "@/lib/api/past-questions";

interface Props {
  params: Promise<{
    semesterSlug: string;
    subjectSlug: string;
  }>;
}

export default async function PastQuestionsPage({ params }: Props) {
  const { semesterSlug, subjectSlug } = await params;
  const papers = await getPastPapers(subjectSlug);

  if (papers && papers.length > 0) {
    const sortedPapers = [...papers].sort((a, b) => b.year - a.year);
    const latestYear = sortedPapers[0].year;
    
    redirect(`/semester/${semesterSlug}/${subjectSlug}/past-questions/${latestYear}`);
  }


  return (
    <div className="py-2 transition-colors duration-200">
      <div className="mb-6 border-b border-dashed border-slate-200 pb-4 dark:border-slate-800">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Past Questions
        </h1>
        <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          University examination paper archives.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200/80 bg-white p-8 text-center shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
        <div className="mx-auto max-w-md">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
            No Past Questions Available
          </h3>
          <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Examination papers for this subject have not been archived yet.
          </p>
        </div>
      </div>
    </div>
  );
}