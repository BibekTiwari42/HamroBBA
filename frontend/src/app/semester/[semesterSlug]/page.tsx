import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// import SubjectCard from "@/components/resource/SubjectCard";
import SemesterSubjectCard from "@/components/academics/SemesterSubjectCard";
import Link from "next/link";
import { getSemesterBySlug, getSubjectsBySemesterSlug } from "@/lib/api/academics";

interface Props {
  params: Promise<{
    semesterSlug: string;
  }>;
}

export default async function SemesterPage({ params }: Props) {
  const { semesterSlug } = await params;
  console.log("SemesterPage - params.semesterSlug:", semesterSlug);

  const [semester, subjects] = await Promise.all([
    getSemesterBySlug(semesterSlug),
    getSubjectsBySemesterSlug(semesterSlug),
  ]);

  console.log("SemesterPage - fetched semester:", semester);
  console.log("SemesterPage - fetched subjects:", subjects);

  if (!semester) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-10 min-h-[70vh] flex items-center justify-center">
        
          <div className="w-full max-w-md rounded-xl border-2 border-red-900 bg-red-50 p-6 text-center shadow-[4px_4px_0px_0px_rgba(127,17,17,1)] dark:bg-red-950/20 dark:border-red-500 dark:shadow-[4px_4px_0px_0px_rgba(239,68,68,0.4)]">
            <h1 className="text-xl font-black uppercase tracking-wider text-red-900 dark:text-red-400">
              [ 404: Not Found ]
            </h1>
            <p className="mt-2 text-sm font-medium text-red-700 dark:text-red-300">
              The semester you're looking for doesn't exist.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-lg border border-red-900 bg-red-900 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-transform active:translate-y-0.5 hover:bg-red-800 dark:border-red-500 dark:bg-red-500 dark:text-black dark:hover:bg-red-400"
            >
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
        
        {/* Header Section */}
        <section className="border-b-2 border-slate-200 bg-amber-50/40 py-8 dark:border-slate-800 dark:bg-slate-900/30">
          <div className="mx-auto max-w-7xl px-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <span>←</span> Back to Semesters
            </Link>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl dark:text-white">
              {semester.name}
            </h1>

            <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">
              {semester.description ||
                "Explore subjects, syllabus, past questions, and learning materials for this semester."}
            </p>
          </div>
        </section>

        {/*Subjects Grid */}
        <section className="bg-white py-10 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-6">
            
         
            <div className="mb-6 border-b border-dashed border-slate-200 pb-4 dark:border-slate-800">
              <h2 className="text-xl font-extrabold uppercase tracking-wide text-slate-900 dark:text-slate-100">
                Subjects
              </h2>
              <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                Select a subject  to view its notes, past year questions and syllabus.
              </p>
            </div>

            {subjects.length === 0 ? (
              <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center dark:border-slate-800 dark:bg-slate-900/20">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  No subjects found for this semester.
                </p>
              </div>
            ) : (

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {subjects.map((subject) => (
                  <SemesterSubjectCard
                    key={subject.id}
                    subject={subject}
                    semesterSlug={semesterSlug}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}