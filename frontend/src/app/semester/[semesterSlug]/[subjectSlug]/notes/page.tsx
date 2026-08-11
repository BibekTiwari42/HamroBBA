import { getNotesBySubjectSlug } from "@/lib/api/notes";
import NoteChapterCard from "@/components/notes/ChapterCard";
import NotFoundState from "@/components/common/NotFoundState";

interface Props {
  params: Promise<{
    semesterSlug: string;
    subjectSlug: string;
  }>;
}

export default async function NotesPage({ params }: Props) {
  const { semesterSlug, subjectSlug } = await params;

  const notes = await getNotesBySubjectSlug(subjectSlug);

  return (
    <div>
      <div>
        <h1>Chapter Wise Notes</h1>
        <p className="text-gray-600">Select a chapter to start studying.</p>
      </div>

      {notes.length === 0 ? (
        <NotFoundState
          compact
          title="No Notes Yet"
          description="Notes for this subject haven't been uploaded yet. Check back soon."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note: any) => (
            <NoteChapterCard
              key={note.id}
              note={note}
              unit={note.unit}
              semesterSlug={semesterSlug}
              subjectSlug={subjectSlug}
            />
          ))}
        </div>
      )}
    </div>
  );
}