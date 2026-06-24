import { notFound } from "next/navigation";

import NotesSidebar from "@/components/notes/NotesSidebar";

import { getNotesBySubjectSlug } from "@/lib/api/notes";

interface Props {
  params: Promise<{
    semesterSlug: string;
    subjectSlug: string;
    unit: string;
  }>;
}

export default async function NoteViewerPage({ params }: Props) {
  const { semesterSlug, subjectSlug, unit } = await params;

  const notes = await getNotesBySubjectSlug(subjectSlug);

  const currentNote = notes.find(
    (n: any) => Number(n.unit_number) === Number(unit)
  );

  if (!currentNote) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <NotesSidebar
        semesterSlug={semesterSlug}
        subjectSlug={subjectSlug}
        currentUnit={Number(unit)}
        notes={notes}
      />

      <div className="flex-1">
        <div className="overflow-hidden rounded-xl border bg-white">
          <div className="border-b px-6 py-4">
            <h1 className="text-xl font-bold">
              Unit {currentNote.unit_number}
            </h1>

            <p className="mt-1 text-sm text-gray-500">{currentNote.title}</p>
          </div>

          <iframe
            src={currentNote.viewer_url}
            className="h-[900px] w-full"
          />
        </div>
      </div>
    </div>
  );
}
