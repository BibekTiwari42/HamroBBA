import { getSyllabusBySubjectSlug } from "@/lib/api/resources";
import { Subject } from "@/types/academic";
import CustomPdfViewer from "@/components/resource/CustomPdfViewer";
import NotFoundState from "@/components/common/NotFoundState";

interface Props {
  params: Promise<{
    semesterSlug: string;
    subjectSlug: string;
  }>;
}

export default async function SyllabusPage({ params }: Props) {
  const { semesterSlug, subjectSlug } = await params;
  const syllabus = await getSyllabusBySubjectSlug(subjectSlug);

  return (
    <div className="py-2 transition-colors duration-200">
      

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-dashed border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {syllabus?.subject?.name || "Subject Syllabus"}
          </h2>
          <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            View the latest approved syllabus.
          </p>
        </div>

        {syllabus?.viewer_url && (
          <a
            href={syllabus.viewer_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-700 focus:outline-none dark:bg-blue-500 dark:text-slate-950 dark:hover:bg-blue-400"
          >
            Open Full Window →
          </a>
        )}
      </div>

      {/* Main  Document  Area */}
      <div className="w-full">
        {syllabus?.viewer_url ? (
      
          <div className="mx-auto max-w-5xl w-full">
            <CustomPdfViewer 
              url={syllabus.viewer_url} 
              title={`${syllabus?.subject?.name || 'Subject'} Syllabus`} 
            />
          </div>
        ) : (
          <NotFoundState
            compact
            title="Syllabus Not Available"
            description="The syllabus PDF for this subject hasn't been uploaded yet. Check back soon."
          />
        )}
      </div>
    </div>
  );
}