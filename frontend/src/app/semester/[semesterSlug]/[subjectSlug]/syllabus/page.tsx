import { getSubjectBySlug } from "@/lib/api/academics";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ semesterSlug: string; subjectSlug: string }>;
}) {
  const { subjectSlug } = await params;

  const subject = await getSubjectBySlug(subjectSlug);

  if (!subject) {
    notFound();
  }

  const units = subject.syllabus?.units ?? [];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Syllabus</h2>

      {units.length === 0 ? (
        <p className="text-gray-600">No syllabus units found.</p>
      ) : (
        <div className="grid gap-3">
          {units.map((u: any, idx: number) => (
            <div key={u.unit ?? idx} className="p-3 border rounded">
              <div className="font-medium">
                Unit {u.unit ?? idx + 1}: {u.title ?? "(Untitled)"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

