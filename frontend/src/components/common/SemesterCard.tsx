import Link from "next/link";
import { Semester } from "@/types/academic";

type SemesterCardProps = {
  semester: Semester;
};

export default function SemesterCard({ semester }: SemesterCardProps) {
 
  if (!semester) {
    console.warn("SemesterCard received an undefined semester prop!");
    return null; 
  }

  return (
    <Link
      href={`/semester/${semester.slug}`}
      className="
        group block rounded-xl border border-slate-200/80 bg-white p-5
        shadow-sm transition-all duration-300 ease-out
        hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-md hover:shadow-slate-200/50
        dark:border-slate-800/80 dark:bg-slate-900 dark:hover:border-blue-500/40 dark:hover:shadow-none
      "
    >
      <div className="flex h-full flex-col">
        <span className="inline-flex w-fit items-center rounded border border-blue-100 bg-blue-50/50 px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:border-blue-950/50 dark:bg-blue-950/30 dark:text-blue-400">
          {semester.id}
        </span>

        <h3 className="mt-3 text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {semester.name}
        </h3>

        {/* <p className="mt-2 text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400">
          {semester.description || "View subjects and resources"}
        </p> */}

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-end border-t border-dashed border-slate-100 pt-3 dark:border-slate-800/60">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 transition-transform group-hover:translate-x-0.5 dark:text-blue-400">
              Explore →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}