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
    title: `${year} Past Questions | ${subjectSlug} | HamroBBA`,
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

  const previousYear =
    currentIndex < years.length - 1 ? years[currentIndex + 1] : undefined;

  const nextYear = currentIndex > 0 ? years[currentIndex - 1] : undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 print:p-0 print:max-w-none">
      {/* Hide breadcrumbs when printing */}
      <div className="print:hidden">
        <PaperBreadcrumb
          semesterSlug={semesterSlug}
          subjectSlug={subjectSlug}
          year={paper.year}
        />
      </div>

      {/* Grid shifts to single-column layout on print layout natively */}
      <div className="grid gap-8 lg:grid-cols-[200px_1fr] print:block">
        {/* Hide sidebar when printing */}
        <div className="print:hidden">
          <YearSidebar
            years={years}
            activeYear={paper.year}
            semesterSlug={semesterSlug}
            subjectSlug={subjectSlug}
          />
        </div>

        <article className="bg-white p-4 md:p-6 print:p-0">
          <PaperHeader
            subjectName={subjectSlug.replaceAll("-", " ")}
            year={paper.year}
            fullMarks={paper.full_marks}
            passMarks={paper.pass_marks}
            duration={paper.duration}
          />

          <div className="mt-8">
            <SearchablePaper questions={paper.questions} />
          </div>

          <PaperYearNavigation
            semesterSlug={semesterSlug}
            subjectSlug={subjectSlug}
            previousYear={previousYear}
            nextYear={nextYear}
          />
        </article>
      </div>
    </div>
  );
}
