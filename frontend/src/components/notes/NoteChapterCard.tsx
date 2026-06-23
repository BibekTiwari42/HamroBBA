import Link from "next/link";

interface Props {
note: any;
semesterSlug: string;
subjectSlug: string;
}

export default function NoteChapterCard({
  note,
  semesterSlug,
    subjectSlug,
}: Props) {
    return (
        <Link
            href={`/semester/${semesterSlug}/${subjectSlug}/notes/${note.unit_number}`}
            className="group
                rounded-xl
                border
                bg-white
                p5
                transition-all
                hover:shadow-sm
            "
             
        >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                {note.unit_number}
            </div>

            <h3 className=" font-semibold text-gray-900 group-hover:text-blue-700">
                Unit {note.unit_number}
            </h3>
            <p className= "mt-2 text-sm text-gray-500">
                {note.unit_title}
            </p>

            <div className="mt-4 text-sm font-medium text-blue-600">
                Open Note →

                </div>
        </Link>
    );
}