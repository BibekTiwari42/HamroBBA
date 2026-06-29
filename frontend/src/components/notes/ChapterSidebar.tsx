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
    <aside className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
      

      <h3 className="mb-3 text-l font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
        Chapters
      </h3>

      <div className="space-y-1.5">
        {notes.map((note) => {
          const active = note.unit_number === activeUnit;

          return (
            <Link
              key={note.id}
              href={`/semester/${semesterSlug}/${subjectSlug}/notes/${note.unit_number}`}
              className={`
                block rounded-lg px-3.5 py-2.5 transition-all duration-200
                ${
                  active
                    ? "bg-white text-blue-600 shadow-sm border border-slate-200/60 dark:bg-blue-500 dark:text-slate-100 dark:border-slate-800/50 font-semibold"
                    : "text-slate-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-slate-200"
                }
              `}
            >
              <div className="text-sm font-medium line-clamp-2 leading-relaxed">
                {note.title}
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}