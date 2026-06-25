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
  return (
    <div className="mt-6 flex justify-between">
      {previous ? (
        <Link
          href={`/semester/${semesterSlug}/${subjectSlug}/notes/${previous}`}
          className="rounded-xl border px-5 py-2 hover:bg-slate-50"
        >
          ← Previous Chapter
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/semester/${semesterSlug}/${subjectSlug}/notes/${next}`}
          className="rounded-xl border px-5 py-2 hover:bg-slate-50"
        >
          Next Chapter →
        </Link>
      ) : null}
    </div>
  );
}