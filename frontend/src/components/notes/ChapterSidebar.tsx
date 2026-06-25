"use client";

import Link from "next/link";

interface Props {
  notes: any[];
  activeUnit: number;
  semesterSlug: string;
  subjectSlug: string;
}

export default function ChapterSidebar({
  notes,
  activeUnit,
  semesterSlug,
  subjectSlug,
}: Props) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-4 font-semibold text-slate-900">
        Chapters
      </h3>

      <div className="space-y-2">
        {notes.map((note) => {
          const active =
            note.unit_number === activeUnit;

          return (
            <Link
              key={note.id}
              href={`/semester/${semesterSlug}/${subjectSlug}/notes/${note.unit_number}`}
              className={`
                block rounded-xl px-4 py-3
                transition-all
                ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                }
              `}
            >
              <div className="font-medium">
                Unit {note.unit_number}
              </div>

              <div className="mt-1 text-xs opacity-80 line-clamp-2">
                {note.title}
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}