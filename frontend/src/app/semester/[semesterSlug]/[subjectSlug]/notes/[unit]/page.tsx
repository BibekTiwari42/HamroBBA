import { notFound } from "next/navigation";

import { getNotesBySubjectSlug } from "@/lib/api/notes";

import ChapterSidebar from "@/components/notes/ChapterSidebar";
import ChapterNavigation from "@/components/notes/ChapterNavigation";
import CustomPdfViewer from "@/components/resource/CustomPdfViewer";

interface Props {
  params: Promise<{
    semesterSlug: string;
    subjectSlug: string;
    unit: string;
  }>;
}

export default async function NoteViewerPage({ params }: Props) {
  const { semesterSlug, subjectSlug, unit } = await params;

  const notes = await getNotesBySubjectSlug(subjectSlug);
  const currentUnit = Number(unit);

  const currentNote = notes.find((n: any) => n.unit_number === currentUnit);

  if (!currentNote) {
    notFound();
  }

  const index = notes.findIndex((n: any) => n.unit_number === currentUnit);

  const previous = index > 0 ? notes[index - 1].unit_number : null;
  const next = index < notes.length - 1 ? notes[index + 1].unit_number : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr] transition-colors duration-200">
      
      {/*  Chapter Sidebar  */}
      <div className="lg:sticky lg:top-24 h-fit">
        <ChapterSidebar
          notes={notes}
          activeUnit={currentUnit}
          semesterSlug={semesterSlug}
          subjectSlug={subjectSlug}
        />
      </div>

      {/* Content */}
      <div>
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
          
         
          <div className="border-b border-dashed text-center border-slate-200 pb-4 dark:border-slate-800">
            <h1 className="mt-3 text-xl font-bold tracking-tight text-slate-900 dark:text-white mx-auto">
              {currentNote.title}
            </h1>
          </div>


          <div className="mt-6">
            {currentNote.viewer_url ? (
              <CustomPdfViewer
                url={currentNote.viewer_url}
                title={`${currentNote.title}`}
              />
            ) : (

              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-8 text-center dark:border-slate-800/80 dark:bg-slate-950">
                <div className="mx-auto max-w-md">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
                    PDF Not Available
                  </h3>
                  <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                    The chapter PDF has not been uploaded yet.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-dashed border-slate-100 pt-4 dark:border-slate-800/60">
            <ChapterNavigation
              previous={previous ?? undefined}
              next={next ?? undefined}
              semesterSlug={semesterSlug}
              subjectSlug={subjectSlug}
            />
          </div>

        </div>
      </div>
    </div>
  );
}