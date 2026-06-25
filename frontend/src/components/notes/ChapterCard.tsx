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
        group block rounded-2xl border border-slate-200
        bg-white p-6 shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-xl
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            Unit {note.unit_number}
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-blue-600">
            {note.title}
          </h3>

          <p className="mt-3 text-sm text-slate-600 line-clamp-3">
            {note.description ||
              "Chapter notes, examples, explanations and important concepts."}
          </p>
        </div>

        <div className="text-blue-600 opacity-0 transition group-hover:opacity-100">
          →
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <span className="text-sm font-medium text-blue-600">
          Open Chapter
        </span>
      </div>
    </Link>
  );
}