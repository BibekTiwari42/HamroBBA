"use client";

import { Syllabus } from "@/types/academic";
import Link from "next/link";
import { useParams } from "next/navigation";

interface SyllabusTabProps {
  syllabus: Syllabus | null | undefined;
}

export default function SyllabusTab({ syllabus }: SyllabusTabProps) {
  const params = useParams();
  const semesterSlug = params.semesterSlug as string | undefined;
  const subjectSlug = params.subjectSlug as string | undefined;

  if (!syllabus || !syllabus.units || syllabus.units.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
        <p className="text-gray-500">No syllabus available for this subject.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {syllabus.units.map((unit, index) => (
        <div
          key={index}
          className="rounded-lg border border-gray-200 bg-white p-6"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
              {unit.unit}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {unit.title}
              </h3>

              {unit.topics && unit.topics.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-sm font-medium text-gray-700">Topics:</p>

                  <ul className="list-inside space-y-1">
                    {unit.topics.map((topic, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-600 flex items-start"
                      >
                        <span className="mr-2">•</span>
                        {semesterSlug && subjectSlug ? (
                          <Link
                            href={`/semester/${semesterSlug}/${subjectSlug}/syllabus/${unit.unit}`}
                            className="hover:text-blue-800 text-gray-600"
                          >
                            {topic}
                          </Link>
                        ) : (
                          <span>{topic}</span>
                        )}
                      </li>
                    ))}
                  </ul>

                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

