"use client";

import Link from "next/link";
import { useSubject } from "@/context/SubjectContext";
import { SubjectDetail } from "@/types/subject";

type Props = {
    subject: SubjectDetail;
};

export default function SubjectSidebar({ subject }: Props) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <h2 className="font-semibold">
        {subject.name}
      </h2>

      <nav className="mt-4 space-y-2">
        <Link
          href="syllabus"
          className="block rounded px-3 py-2 hover:bg-gray-100"
        >
          Syllabus
        </Link>

        <Link
          href="question-bank"
          className="block rounded px-3 py-2 hover:bg-gray-100"
        >
          Question Bank
        </Link>

        <Link
          href="notes"
          className="block rounded px-3 py-2 hover:bg-gray-100"
        >
          Notes
        </Link>
      </nav>
    </div>
  );
}