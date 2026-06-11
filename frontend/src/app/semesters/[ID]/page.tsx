import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSubjectsBySemester } from "@/services/academics.service";

type Props = {
  params: {
    id: string;
  };
};

export default async function SemesterPage({ params }: Props) {
  const subjects = await getSubjectsBySemester(params.id);

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900">
          Semester {params.id}
        </h1>

        <p className="mt-2 text-gray-600">
          Subjects available in this semester
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject: any) => (
            <div
              key={subject.id}
              className="rounded-lg border border-gray-200 p-4 hover:shadow-md"
            >
              <h3 className="font-semibold text-gray-800">
                {subject.name}
              </h3>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}