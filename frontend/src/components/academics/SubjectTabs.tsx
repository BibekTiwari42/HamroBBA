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
    <div className="mt-6 flex justify-center">
      <div className="inline-flex rounded-xl border border-slate-200/80 bg-slate-50 p-1 dark:border-slate-800/80 dark:bg-slate-950">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            className={`
              rounded-lg px-4 py-1.5 text-xs font-bold uppercase tracking-wider
              transition-all duration-200
              ${
                tab.active
                  ? "bg-white text-blue-600 shadow-sm border border-slate-200/60 dark:bg-blue-500 dark:text-slate-100 dark:border-slate-800/50"
                  : "text-slate-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-slate-200"
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