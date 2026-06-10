import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SemesterCard from "@/components/common/SemesterCard";

const semesters = [
  "First Semester",
  "Second Semester",
  "Third Semester",
  "Fourth Semester",
  "Fifth Semester",
  "Sixth Semester",
  "Seventh Semester",
  "Eighth Semester",
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="bg-blue-50 py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
              Learning Resources for
              TU BBA Students
            </h1>

            <p className="mt-5 text-lg text-gray-600">
              Access notes, syllabus,
              past questions and study
              materials organized by semester.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Browse by Semester
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {semesters.map((semester) => (
              <SemesterCard
                key={semester}
                title={semester}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}