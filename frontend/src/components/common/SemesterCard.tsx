type SemesterCardProps = {
  title: string;
};

export default function SemesterCard({
  title,
}: SemesterCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-md">
      <h3 className="text-lg font-semibold text-gray-800">
        {title}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        View notes, syllabus,
        questions and resources
      </p>
    </div>
  );
}