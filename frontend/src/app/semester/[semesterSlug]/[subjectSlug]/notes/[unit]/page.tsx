import { notFound } from "next/navigation";

import { getNotesBySubjectSlug } from "@/lib/api/notes";

import ChapterSidebar from "@/components/notes/ChapterSidebar";
import ChapterNavigation from "@/components/notes/ChapterNavigation";

interface Props {
  params: Promise<{
    semesterSlug: string;
    subjectSlug: string;
    unit: string;
  }>;
}

export default async function NoteViewerPage({
  params,
}: Props) {
  const {
    semesterSlug,
    subjectSlug,
    unit,
  } = await params;

  const notes =
    await getNotesBySubjectSlug(subjectSlug);

  const currentUnit = Number(unit);

  const currentNote = notes.find(
    (n: any) =>
      n.unit_number === currentUnit
  );

  if (!currentNote) {
    notFound();
  }

  const index = notes.findIndex(
    (n: any) =>
      n.unit_number === currentUnit
  );

  const previous =
    index > 0
      ? notes[index - 1].unit_number
      : null;

  const next =
    index < notes.length - 1
      ? notes[index + 1].unit_number
      : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      {/* Sidebar */}

      <div className="lg:sticky lg:top-24 h-fit">
        <ChapterSidebar
          notes={notes}
          activeUnit={currentUnit}
          semesterSlug={semesterSlug}
          subjectSlug={subjectSlug}
        />
      </div>

      {/* Content */}

      <div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Unit {currentNote.unit_number}
          </h1>

          <p className="mt-2 text-slate-600">
            {currentNote.title}
          </p>

          <div className="mt-6">
            {currentNote.viewer_url ? (
              <iframe
                src={currentNote.viewer_url}
                className="h-[calc(120vh-220px)] w-full rounded-xl border"
              />
            ) : (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-8 text-center">
                <h3 className="font-semibold text-amber-800">
                  PDF Not Available
                </h3>

                <p className="mt-2 text-sm text-amber-700">
                  The chapter PDF has not been uploaded yet.
                </p>
              </div>
            )}
          </div>

          <ChapterNavigation
            previous={previous ?? undefined}
            next={next ?? undefined}
            semesterSlug={semesterSlug}
            subjectSlug={subjectSlug}
          />
        </div>
      </div>
    </div>
  );
}