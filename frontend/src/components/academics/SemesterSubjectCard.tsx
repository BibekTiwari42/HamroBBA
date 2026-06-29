import Link from "next/link";

interface Props {
  semesterSlug: string;
  subject: {
    id: number;
    name: string;
    slug: string;
    code?: string;
    description?: string;
    chapter_count?: number;
  };
}

export default function SemesterSubjectCard({ semesterSlug, subject }: Props) {
  return (
    <Link
      href={`/semester/${semesterSlug}/${subject.slug}`}
      className="
        group block rounded-xl border border-slate-200/80 bg-white p-5
        shadow-sm transition-all duration-300 ease-out
        hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-md hover:shadow-slate-200/50
        dark:border-slate-800/80 dark:bg-slate-900 dark:hover:border-blue-500/40 dark:hover:shadow-none
      "
    >
      <div className="flex h-full flex-col">
        <span className="inline-flex w-fit items-center rounded border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
          {subject.code || "BBA-CORE"}
        </span>

        <h3 className="mt-3 text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {subject.name}
        </h3>

        <p className="mt-2 line-clamp-3 text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400">
          {subject.description || "Study materials, chapter notes, syllabus and past questions."}
        </p>

       
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between border-t border-dashed border-slate-100 pt-3 dark:border-slate-800/60">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Chapters:
              </span>
              <span className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200">
                {String(subject.chapter_count ?? "--").padStart(2, '0')}
              </span>
            </div>

            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 transition-transform group-hover:translate-x-0.5 dark:text-blue-400">
              Open →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}