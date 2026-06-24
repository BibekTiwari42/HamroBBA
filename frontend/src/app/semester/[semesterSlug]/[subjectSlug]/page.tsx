import Link from "next/link";
import { notFound } from "next/navigation";

import { getSubjectBySlug } from "@/lib/api/academics";
import { getNotesBySubjectSlug } from "@/lib/api/notes";

export default async function Page({ params }: any) {
  const { semesterSlug, subjectSlug } = await params;

  const [subject, notes] = await Promise.all([
    getSubjectBySlug(subjectSlug),
    getNotesBySubjectSlug(subjectSlug),
  ]);

  if (!subject) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Chapter Wise Notes</h2>
        <p className="mt-2 text-gray-600">
          Select a chapter to start studying.
        </p>
      </div>

      {notes.length === 0 ? (
        <div className="rounded-2xl border bg-white p-12 text-center">
          <h3 className="text-lg font-semibold">No Notes Available</h3>
          <p className="mt-2 text-gray-500">
            Notes have not been uploaded for this subject yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {notes.map((note: any) => (
            <Link
              key={note.id}
              href={`/semester/${semesterSlug}/${subjectSlug}/notes/${note.unit_number}`}
              className="group rounded-2xl border bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                {note.unit_number}
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                Unit {note.unit_number}
              </h3>

              <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                {note.title}
              </p>

              <div className="mt-5 text-sm font-medium text-blue-600">
                Open Chapter →
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
