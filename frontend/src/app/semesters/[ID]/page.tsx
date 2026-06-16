import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { getSubjectsBySemester } from "@/services/academics.service";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SemesterPage({
  params,
}: Props) {
  const { id } = await params;

  const subjects =
    await getSubjectsBySemester(id);

  console.log("Semester ID:", id);

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-bold">
          Semester {id}
        </h1>

        <div className="mt-8 grid gap-4">
          {subjects.map((s: any) => (
            <Link
              key={s.id}
              href={`/subjects/${s.id}`}
            >
              <div className="rounded-lg border p-4">
                {s.name}
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}