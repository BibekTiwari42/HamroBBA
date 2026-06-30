import { getSubjectUnits } from "@/lib/api/academics";
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

  const [units, notes] = await Promise.all([
    getSubjectUnits(subjectSlug),
    getNotesBySubjectSlug(subjectSlug),
  ]);

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

      {units.length === 0 ? (
        <div className="rounded-xl border border-slate-200/80 bg-white p-8 text-center shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
            No Chapters Available
          </h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            This subject doesn't have any syllabus units yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {units.map((unit) => {
            const note = notes.find(
              (n: any) => n.unit_number === unit.unit_number
            );

            return (
              <ChapterCard
                key={unit.id}
                semesterSlug={semesterSlug}
                subjectSlug={subjectSlug}
                unit={unit}
                note={note}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}