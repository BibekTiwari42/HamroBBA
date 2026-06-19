"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  semesterSlug: string;
  subjectSlug: string;
}

export default function SubjectTabs({
  semesterSlug,
  subjectSlug,
}: Props) {
  const pathname = usePathname();

  const base = `/semester/${semesterSlug}/${subjectSlug}`;

  const tabs = [
    { name: "Chapters", href: base },
    { name: "Syllabus", href: `${base}/syllabus` },
    { name: "Past Questions", href: `${base}/past-questions` },
  ];

  return (
    <div className="flex gap-6 border-b mt-6">
      {tabs.map((tab) => {
        const active = pathname === tab.href;

        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`pb-3 text-sm font-medium transition ${
              active
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}