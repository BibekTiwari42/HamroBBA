import Link from "next/link";
import { SyllabusUnit } from "@/types/academic";

interface Props {
  semesterSlug: string;
  subjectSlug: string;

  unit: SyllabusUnit;

  note?: {
    id: number;
    title: string;
    unit_number?: number;
  };
}

export default function ChapterCard({
  semesterSlug,
  subjectSlug,
  unit,
  note,
}: Props) {
  return (
    <Link
      href={`/semester/${semesterSlug}/${subjectSlug}/notes/${unit.unit_number}`}
      className="
        group block rounded-xl border border-slate-200 bg-white p-5
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg
        dark:border-slate-800 dark:bg-slate-900
      "
    >
      <div className="flex h-full flex-col justify-between">

        {/* Top */}
        <div>

          <div className="flex items-center justify-between">

            <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              Unit {unit.unit_number}
            </span>

            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {unit.lecture_hours} LHs
            </span>

          </div>

          <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {unit.title}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {unit.description}
          </p>

        </div>

        {/* Bottom */}
        <div className="mt-6 border-t border-dashed border-slate-200 pt-4 dark:border-slate-700">

          <div className="flex items-center justify-between">

            {note ? (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                ✓ Notes Available
              </span>
            ) : (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                PDF Coming Soon
              </span>
            )}

            <span className="text-sm font-semibold text-blue-600 transition-transform duration-200 group-hover:translate-x-1 dark:text-blue-400">
              Open →
            </span>

          </div>

        </div>

      </div>
    </Link>
  );
}