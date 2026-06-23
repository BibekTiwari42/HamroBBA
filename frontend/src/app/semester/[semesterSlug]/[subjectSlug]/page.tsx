import { getNotesBySubjectSlug } from "@/lib/api/notes";

export default async function Page({ params }: any) {
  const { subjectSlug } = await params;

  const notes = await getNotesBySubjectSlug(subjectSlug);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {notes.map((note: any) => (
        <a
          key={note.id}
          href={`./notes/${note.unit_number}`}
          className="
            rounded-xl border bg-white p-5
            hover:shadow-md transition
          "
        >
          <div className="text-sm text-gray-500">
            Unit {note.unit_number}
          </div>

          <h2 className="mt-2 font-semibold text-lg">
            {note.title}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Click to open chapter notes
          </p>
        </a>
      ))}
    </div>
  );
}