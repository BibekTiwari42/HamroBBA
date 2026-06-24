"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  semesterSlug: string;
  subjectSlug: string;
  currentUnit: number;
  notes: any[];
}

export default function NotesSidebar({
  semesterSlug,
  subjectSlug,
  currentUnit,
  notes,
}: Props) {
  const base = `/semester/${semesterSlug}/${subjectSlug}`;
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 lg:w-72">
      <div className="overflow-hidden rounded-xl border bg-white">
        <div className="border-b px-4 py-3">
          <h3 className="font-semibold">Quick Navigation</h3>
        </div>

        <div className="p-2">
          <Link
            href={base}
            className="block rounded-lg px-3 py-2 hover:bg-gray-100"
          >
            Chapters
          </Link>

          <Link
            href={`${base}/syllabus`}
            className="block rounded-lg px-3 py-2 hover:bg-gray-100"
          >
            Syllabus
          </Link>

          <Link
            href={`${base}/past-questions`}
            className="block rounded-lg px-3 py-2 hover:bg-gray-100"
          >
            Past Questions
          </Link>
        </div>

        <div className="border-t px-4 py-3">
          <h4 className="text-sm font-medium text-gray-700">Chapters</h4>
        </div>

        <div className="p-2">
          {notes.map((note) => {
            const active = note.unit_number === currentUnit;

            return (
              <Link
                key={note.id}
                href={`${base}/notes/${note.unit_number}`}
                className={`block rounded-lg px-3 py-2 text-sm ${
                  active
                    ? "bg-blue-100 font-semibold text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                Unit {note.unit_number}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
