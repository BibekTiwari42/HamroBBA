import Link from "next/link";

interface Props {
  years: number[];
  activeYear: number;
  semesterSlug: string;
  subjectSlug: string;
}

export default function YearSidebar({
  years,
  activeYear,
  semesterSlug,
  subjectSlug,
}: Props) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sticky top-24 self-start hidden lg:block">
        <div className="rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500">
            Exam Archive
          </h3>

          <div className="grid grid-cols-1 gap-1.5">
            {years.map((year) => (
              <Link
                key={year}
                href={`/semester/${semesterSlug}/${subjectSlug}/past-questions/${year}`}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  activeYear === year
                    ? "bg-gray-900 dark:bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <span>{year} Paper</span>
                {activeYear === year && (
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400 dark:bg-blue-300" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile Horizontal Scroll */}
      <div className="lg:hidden mb-6 -mx-4 px-4 overflow-x-auto scrollbar-thin">
        <div className="flex gap-2 min-w-max pb-2">
          {years.map((year) => (
            <Link
              key={year}
              href={`/semester/${semesterSlug}/${subjectSlug}/past-questions/${year}`}
              className={`flex-shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeYear === year
                  ? "bg-blue-600 dark:bg-blue-600 text-white shadow-sm"
                  : "bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
              }`}
            >
              {year}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
