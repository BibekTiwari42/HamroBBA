import Link from "next/link";

interface Props {
  semesterSlug: string;
  subjectSlug: string;
  previousYear?: number;
  nextYear?: number;
}

export default function PaperYearNavigation({
  semesterSlug,
  subjectSlug,
  previousYear,
  nextYear,
}: Props) {
  return (
    <div className="mt-12 flex items-center justify-between border-t border-gray-100 dark:border-slate-800 pt-6 text-sm font-medium print:hidden">
      <div>
        {previousYear && (
          <Link
            href={`/semester/${semesterSlug}/${subjectSlug}/past-questions/${previousYear}`}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-gray-600 dark:text-slate-300 shadow-sm transition-all hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white"
          >
            <span>&larr;</span> {previousYear} Exam
          </Link>
        )}
      </div>

      <div>
        {nextYear && (
          <Link
            href={`/semester/${semesterSlug}/${subjectSlug}/past-questions/${nextYear}`}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-gray-600 dark:text-slate-300 shadow-sm transition-all hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white"
          >
            {nextYear} Exam <span>&rarr;</span>
          </Link>
        )}
      </div>
    </div>
  );
}
