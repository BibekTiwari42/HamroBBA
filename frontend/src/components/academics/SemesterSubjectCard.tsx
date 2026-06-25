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

export default function SemesterSubjectCard({
  semesterSlug,
  subject,
}: Props) {
  return (
    <Link
      href={`/semester/${semesterSlug}/${subject.slug}`}
      className="
        group block rounded-2xl border border-slate-200
        bg-white p-6 shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-xl
      "
    >
      <div className="flex h-full flex-col">
        {/* Subject Code */}
        <span className="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {subject.code || "BBA Subject"}
        </span>

        {/* Subject Name */}
        <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-blue-600">
          {subject.name}
        </h3>

        {/* Description */}
        <p className="mt-3 line-clamp-3 text-sm text-slate-600">
          {subject.description ||
            "Study materials, chapter notes, syllabus and past questions."}
        </p>

        {/* Bottom Area */}
        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <p className="text-xs text-slate-500">
                Chapters
              </p>

              <p className="font-semibold text-slate-900">
                {subject.chapter_count ?? "--"}
              </p>
            </div>

            <div className="text-sm font-medium text-blue-600">
              Open →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}