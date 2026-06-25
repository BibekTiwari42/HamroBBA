import { getNotesBySubjectSlug } from "@/lib/api/notes";
import ChapterCard from "@/components/notes/ChapterCard";

interface Props {
  params: Promise<{
    semesterSlug: string;
    subjectSlug: string;
  }>;
}

export default async function Page({
  params,
}: Props) {
  const { semesterSlug, subjectSlug } =
    await params;

  const notes =
    await getNotesBySubjectSlug(subjectSlug);

  return (
          
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Chapter Wise Notes
        </h1>

        <p className="mt-3 text-slate-600">
          Select a chapter to start studying.
        </p>
      </div>

      {/* Empty State */}
      {notes.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto max-w-md">
            <h3 className="text-lg font-semibold text-slate-900">
              Notes Not Available
            </h3>

            <p className="mt-2 text-slate-500">
              Chapter notes have not been uploaded for
              this subject yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {notes.map((note: any) => (
            <ChapterCard
              key={note.id}
              note={note}
              semesterSlug={semesterSlug}
              subjectSlug={subjectSlug}
            />
          ))}
        </div>
      )}
    </div>
  );
}