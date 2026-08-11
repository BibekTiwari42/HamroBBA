import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// import SubjectCard from "@/components/resource/SubjectCard";
import SemesterSubjectCard from "@/components/academics/SemesterSubjectCard";
import NotFoundState from "@/components/common/NotFoundState";
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
        <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-6 py-20">
          <NotFoundState
            show404
            title="Semester Not Found"
            description={
              <>
                We couldn&apos;t find the semester{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-blue-700 dark:bg-slate-900 dark:text-blue-300">
                  /{semesterSlug}
                </code>
                . It may have been renamed or removed — try one of the options below.
              </>
            }
            primary={{ href: "/", label: "← Back to Home" }}
            secondary={{ href: "/semester/first_semester", label: "Go to 1st Semester" }}
          />
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
              <NotFoundState
                compact
                title="No Subjects Yet"
                description="No subjects found for this semester. Check back soon."
              />
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
