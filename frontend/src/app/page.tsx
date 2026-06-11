import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SemesterCard from "@/components/common/SemesterCard";
import { getSemesters } from "@/services/academics.service";

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

      <main>
        {/* Hero Section */}
        <section className="bg-blue-50 py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
              HamroBBA Study Platform
            </h1>

            <p className="mt-5 text-lg text-gray-600">
              Access structured notes, syllabus, and academic resources for TU BBA students.
            </p>
          </div>
        </section>

        {/* Semester Grid */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">
            Browse Semesters
          </h2>

          {semesters.length === 0 ? (
            <div className="rounded-lg border border-gray-200 p-8 text-center text-gray-500">
              No semesters found.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {semesters.map((semester: any) => (
                <SemesterCard
                  key={semester.id}
                  id={semester.id}
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