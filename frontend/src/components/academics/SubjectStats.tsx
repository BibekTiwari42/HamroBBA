interface Props {
  chapters: number;
  papers: number;
}

export default function SubjectStats({
  chapters,
  papers,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
        <p className="text-sm text-gray-500">
          Chapters
        </p>

        <p className="text-2xl font-bold text-blue-700">
          {chapters}
        </p>
      </div>

      <div className="rounded-xl bg-green-50 border border-green-100 p-4">
        <p className="text-sm text-gray-500">
          Syllabus
        </p>

        <p className="text-2xl font-bold text-green-700">
          1
        </p>
      </div>

      <div className="rounded-xl bg-purple-50 border border-purple-100 p-4">
        <p className="text-sm text-gray-500">
          Past Papers
        </p>

        <p className="text-2xl font-bold text-purple-700">
          {papers}
        </p>
      </div>
    </div>
  );
}