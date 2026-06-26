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

  const base =
    `/semester/${semesterSlug}/${subjectSlug}`;

  const tabs = [
    {
      name: "Chapters",
      href: base,
      active: 
        pathname === base ||
        pathname.startsWith(`${base}/notes`),
    },
    {
      name: "Past Questions",
      href: `${base}/past-questions`,
      active: 
        pathname.startsWith(`${base}/past-questions`),
    },
    {
      name: "Syllabus",
      href: `${base}/syllabus`,
      active: pathname.startsWith(
        `${base}/syllabus`),
    },
  ];

  return (
    <div className="mt-8 flex justify-center">
      <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            className={`
              rounded-xl px-5 py-2 text-sm font-medium
                transition-all duration-200
                ${
                  tab.active
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:-translate-y-0.5 hover:text-blue-600"
                }
              `}
            >
              {tab.name}
            </Link>
          
        ))}
      </div>
    </div>
  );
}