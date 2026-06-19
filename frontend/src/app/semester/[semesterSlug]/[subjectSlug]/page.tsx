import { getSubjectBySlug } from "@/lib/api/academics";
import { notFound } from "next/navigation";

export default async function Page({ params }: any) {
  const { subjectSlug } = await params;

  const subject = await getSubjectBySlug(subjectSlug);

  if (!subject) notFound();

  const units = subject.syllabus?.units || [];

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {units.map((u: any) => (
        <div
          key={u.unit}
          className="border rounded-xl p-5 hover:shadow-md transition bg-white"
        >
          <h2 className="font-bold text-lg">
            Unit {u.unit}: {u.title}
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            {u.topics?.length || 0} topics
          </p>
        </div>
      ))}
    </div>
  );
}