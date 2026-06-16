import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SubjectCard from "@/components/resource/SubjectCard";
import Link from "next/link";
import {
  getSemesterBySlug,
  getSubjectsBySemesterSlug,
} from "@/services/academics.service";

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
        <main className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
            <h1 className="text-2xl font-bold text-red-900">
              Semester Not Found
            </h1>
            <p className="mt-2 text-red-700">
              The semester you're looking for doesn't exist.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
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

      <main className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="mx-auto max-w-7xl px-6">
            <Link
              href="/"
              className="mb-4 inline-flex items-center text-blue-100 hover:text-white"
            >
              ← Back to Semesters
            </Link>
            <h1 className="text-4xl font-bold">{semester.name}</h1>
            {semester.description && (
              <p className="mt-3 text-lg text-blue-100">
                {semester.description}
              </p>
            )}
          </div>
        </section>

        {/* Subjects Grid */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Subjects ({subjects.length})
            </h2>
            <p className="mt-2 text-gray-600">
              Select a subject to view syllabus, past questions, and learning
              materials.
            </p>
          </div>

          {subjects.length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
              <p className="text-gray-500">
                No subjects found for this semester.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {subjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  semesterSlug={semesterSlug}
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
