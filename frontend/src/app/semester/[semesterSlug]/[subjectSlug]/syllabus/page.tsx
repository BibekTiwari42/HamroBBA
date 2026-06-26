import SyllabusSidebar from "@/components/syllabus/SyllabusSidebar";
import { getSyllabusBySubjectSlug } from "@/lib/api/resources";
import { Subject } from "@/types/academic";

interface Props {
  params: Promise<{
    semesterSlug: string;
    subjectSlug: string;
  }>;
}

export default async function SyllabusPage({
  params,
}: Props) {
  const {
    semesterSlug,
    subjectSlug,
  } = await params;

  const syllabus =
    await getSyllabusBySubjectSlug(subjectSlug);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Content */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {syllabus?.subject?.name || "Subject Syllabus"}
            </h1>

            <p className="mt-2 text-slate-600">
              View the latest approved syllabus.
            </p>
          </div>

          {syllabus?.viewer_url && (
            <a
              href={syllabus.viewer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-blue-600 px-4 py-2  font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Open in New Tab
            </a>
          )}
        </div>

        <div className="mt-6">
          {syllabus?.viewer_url ? (
            <iframe
              src={syllabus.viewer_url}
              className="h-[calc(100vh-220px)] w-full rounded-xl border"
            />
          ) : (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-8 text-center">
              <h3 className="font-semibold text-amber-800">
                Syllabus Not Available
              </h3>

              <p className="mt-2 text-sm text-amber-700">
                The syllabus PDF has not been uploaded yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}