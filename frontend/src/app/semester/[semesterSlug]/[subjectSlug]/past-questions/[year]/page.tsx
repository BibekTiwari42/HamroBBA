import { notFound } from "next/navigation";
import { getPastPaper, getPastPapers } from "@/lib/api/past-questions";

import PaperHeader from "@/components/question-bank/PaperHeader";
import PaperBreadcrumb from "@/components/question-bank/PaperBreadcrumb";
import PaperYearNavigation from "@/components/question-bank/PaperYearNavigation";
import SearchablePaper from "@/components/question-bank/PaperQuestions";
import YearSidebar from "@/components/question-bank/YearSidebar";

interface Props {
  params: Promise<{
    semesterSlug: string;
    subjectSlug: string;
    year: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { year, subjectSlug } = await params;
  return {
    title: `${year} Past Questions | ${subjectSlug.replaceAll("-", " ").toUpperCase()} | HamroBBA`,
    description: `Past question paper of ${subjectSlug} for year ${year}`,
  };
}

export default async function PastPaperPage({ params }: Props) {
  const { semesterSlug, subjectSlug, year } = await params;

  const [paper, papers] = await Promise.all([
    getPastPaper(subjectSlug, year),
    getPastPapers(subjectSlug),
  ]);

  if (!paper) {
    notFound();
  }

  const years = papers
    .map((p) => p.year)
    .sort((a, b) => b - a);

  const currentIndex = years.indexOf(Number(year));
  const previousYear = currentIndex < years.length - 1 ? years[currentIndex + 1] : undefined;
  const nextYear = currentIndex > 0 ? years[currentIndex - 1] : undefined;

  return (
    <div className="mx-auto max-w-7xl py-2 print:p-0 print:max-w-none transition-colors duration-200">
      

      <div className="print:hidden mb-4">
        <PaperBreadcrumb
          semesterSlug={semesterSlug}
          subjectSlug={subjectSlug}
          year={paper.year}
        />
      </div>

      {/* Primary Layout  */}
      <div className="grid gap-6 lg:grid-cols-[240px_1fr] print:block">
        
        {/* Navigation Sidebar */}
        <div className="print:hidden lg:sticky lg:top-24 h-fit">
          <YearSidebar
            years={years}
            activeYear={paper.year}
            semesterSlug={semesterSlug}
            subjectSlug={subjectSlug}
          />
        </div>

        {/* Core Question Content  */}
        <main className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800/80 dark:bg-slate-900 print:border-none print:p-0 print:shadow-none">
          
          <PaperHeader
            subjectName={subjectSlug.replaceAll("-", " ")}
            year={paper.year}
            fullMarks={paper.full_marks}
            passMarks={paper.pass_marks}
            duration={paper.duration} subjectCode={""}          />

          <div className="mt-6 border-t border-dashed border-slate-200 pt-6 dark:border-slate-800">
            <SearchablePaper questions={paper.questions} />
          </div>

          <div className="mt-8 border-t border-dashed border-slate-100 pt-4 dark:border-slate-800/60 print:hidden">
            <PaperYearNavigation
              semesterSlug={semesterSlug}
              subjectSlug={subjectSlug}
              previousYear={previousYear}
              nextYear={nextYear}
            />
          </div>
          
        </main>
      </div>
    </div>
  );
}