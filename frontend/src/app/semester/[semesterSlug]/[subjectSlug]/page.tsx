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
  const { semesterSlug, subjectSlug } = await params;

  const notes = await getNotesBySubjectSlug(subjectSlug);

  return (
    <div className="py-2 transition-colors duration-200">
      
      {/* Header */}
      <div className="mb-6 border-b border-dashed border-slate-200 pb-4 dark:border-slate-800">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Chapter Wise Notes
        </h2>

        <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          Select a chapter to start studying.
        </p>
      </div>

      {/* Empty State */}
      {notes.length === 0 ? (
        <div className="rounded-xl border border-slate-200/80 bg-white p-8 text-center shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
          <div className="mx-auto max-w-md">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
              Notes Not Available
            </h3>

            <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
              Chapter notes have not been uploaded for this subject yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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