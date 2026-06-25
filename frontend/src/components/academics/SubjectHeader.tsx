import { Subject } from "@/types/academic";


interface Props {
  subject: Subject;
}

export default function SubjectHeader({
  subject,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-4">
        <div>
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            {subject.code || "BBA Subject"}
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            {subject.name}
          </h1>

        </div>

        <p className="max-w-4xl text-slate-600">
          {subject.description ||
            "Access chapter-wise notes, official syllabus, and past questions for this subject."}
        </p>
      </div>
    </div>
  );
}