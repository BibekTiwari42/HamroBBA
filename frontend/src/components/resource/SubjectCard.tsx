import Link from "next/link";
import { Subject } from "@/types/academic";

interface SubjectCardProps {
  subject: Subject;
  semesterSlug: string;
}

export default function SubjectCard({
  subject,
  semesterSlug,
}: SubjectCardProps) {
  return (
    <Link href={`/semester/${semesterSlug}/${subject.slug}`}>
      <div className="rounded-lg border border-gray-200 bg-white p-6 transition hover:border-blue-400 hover:shadow-lg cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {subject.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{subject.code}</p>
          </div>
        </div>

        {subject.description && (
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">
            {subject.description}
          </p>
        )}

        <div className="mt-4 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
          View Details →
        </div>
      </div>
    </Link>
  );
}
