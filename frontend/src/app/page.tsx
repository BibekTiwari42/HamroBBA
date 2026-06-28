import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SemesterCard from "@/components/common/SemesterCard";
import { getSemesters } from "@/lib/api/academics";

export default async function HomePage() {
  let semesters: any[] = [];

  try {
    semesters = await getSemesters();
  } catch (error) {
    console.error("Failed to load semesters", error);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-gray-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
        
        <section className="bg-blue-50/50 py-20 border-b border-blue-100/30 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 dark:border-slate-800/60">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
              HamroBBA Study Platform
            </h1>

            <p className="mt-5 text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
              Access structured notes, syllabus, and academic resources for TU BBA students.
            </p>
          </div>
        </section>

        {/* Semester Grid */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
            Browse Semesters
          </h2>

          {semesters.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 p-12 text-center text-gray-500 bg-gray-50/50 dark:border-slate-800 dark:bg-slate-900/30 dark:text-slate-400">
              <svg 
                className="mx-auto h-10 w-10 text-gray-400 dark:text-slate-600 mb-3" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-sm font-medium">No semesters found.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {semesters.map((semester: any) => (
                <SemesterCard
                  key={semester.id}
                  slug={semester.slug}
                  title={semester.name}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}