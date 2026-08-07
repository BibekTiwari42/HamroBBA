import Link from "next/link";

interface Props {
  previous?: number;
  next?: number;
  semesterSlug: string;
  subjectSlug: string;
}

export default function ChapterNavigation({
  previous,
  next,
  semesterSlug,
  subjectSlug,
}: Props) {
  
  const buttonStyles = `
    group inline-flex items-center gap-2 rounded-xl border border-slate-200/80 
    bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm 
    transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-blue-600 
    active:scale-[0.98] 
    dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 
    dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-blue-400
  `;

  return (
    <div className="flex items-center justify-between gap-4">
      {previous ? (
        <Link
          href={`/semester/${semesterSlug}/${subjectSlug}/notes/${previous}`}
          className={buttonStyles}
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">
            ←
          </span>
          <span>Previous Chapter</span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/semester/${semesterSlug}/${subjectSlug}/notes/${next}`}
          className={`${buttonStyles} ml-auto`}
        >
          <span>Next Chapter</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      ) : null}
    </div>
  );
}