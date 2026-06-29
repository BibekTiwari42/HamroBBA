import Link from "next/link";

interface Props {
  semesterSlug: string;
  subjectSlug: string;
  note: {
    id: number;
    title: string;
    unit_number?: number;
    description?: string;
  };
}

export default function ChapterCard({
  semesterSlug,
  subjectSlug,
  note,
}: Props) {
  return (
    <Link
      href={`/semester/${semesterSlug}/${subjectSlug}/notes/${note.unit_number}`}
      className="
        group block rounded-xl border border-slate-200/80 bg-white p-5
        shadow-sm transition-all duration-300 ease-out
        hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-md hover:shadow-slate-200/50
        dark:border-slate-800/80 dark:bg-slate-900 dark:hover:border-blue-500/40 dark:hover:shadow-none
      "
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <span className="inline-flex w-fit items-center rounded border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
             {note.unit_number != null ? String(note.unit_number).padStart(2, '0') : "--"}
          </span>


          <h3 className="mt-3 text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {note.title}
          </h3>


          <p className="mt-2 line-clamp-3 text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400">
            {note.description ||
              "Chapter notes, examples, explanations and important concepts."}
          </p>
        </div>

        <div className="mt-5 pt-4">
          <div className="flex items-center justify-between border-t border-dashed border-slate-100 pt-3 dark:border-slate-800/60">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 transition-transform group-hover:translate-x-0.5 dark:text-blue-400">
              Open →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}