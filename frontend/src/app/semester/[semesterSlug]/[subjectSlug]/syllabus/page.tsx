import { notFound } from "next/navigation";
import { getSyllabusBySubjectSlug } from "@/lib/api/resources";

interface Props {
  params: Promise<{
    semesterSlug: string;
    subjectSlug: string;
  }>;
}

export default async function SyllabusPage({
  params,
}: Props) {
  const { subjectSlug } = await params;

  const syllabus =
    await getSyllabusBySubjectSlug(subjectSlug);

  if (!syllabus) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          Syllabus
        </h2>

        <p className="text-gray-500 mt-1">
          {syllabus.title}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <iframe
          src={syllabus.viewer_url}
          className="h-[900px] w-full"
          title={syllabus.title}
        />
      </div>
    </div>
  );
}