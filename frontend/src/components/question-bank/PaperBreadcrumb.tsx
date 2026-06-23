import Link from "next/link";

interface Props {
  semesterSlug: string;
  subjectSlug: string;
  year: number;
}

export default function PaperBreadcrumb({ semesterSlug, subjectSlug, year }: Props) {
  return (
    <nav className="mb-6 text-xs font-medium uppercase tracking-wider text-gray-400">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href={`/semester/${semesterSlug}`} className="hover:text-gray-900 transition-colors">
            Semester
          </Link>
        </li>
        <li className="text-gray-300 select-none">/</li>
        <li>
          <Link href={`/semester/${semesterSlug}/${subjectSlug}`} className="hover:text-gray-900 transition-colors">
            Subject
          </Link>
        </li>
        <li className="text-gray-300 select-none">/</li>
    
        <li className="text-gray-300 select-none">/</li>
        <li className="font-bold text-gray-900 normal-case bg-gray-100 px-2 py-0.5 rounded">
          {year}
        </li>
      </ol>
    </nav>
  );
}
