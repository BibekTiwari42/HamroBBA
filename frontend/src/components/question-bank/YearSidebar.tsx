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
    <aside className="sticky top-24 self-start hidden lg:block">
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
          Exam Archive
        </h3>

        <div className="grid grid-cols-1 gap-1.5">
          {years.map((year) => (
            <Link
              key={year}
              href={`/semester/${semesterSlug}/${subjectSlug}/past-questions/${year}`}
              className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                activeYear === year
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span>{year} Paper</span>
              {activeYear === year && (
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
