export default function UnitsTab() {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
      <p className="text-gray-700 font-medium">Learning Units</p>
      <p className="mt-2 text-gray-500">
        Unit-wise structured learning materials will be available soon.
      </p>
      <div className="mt-6 space-y-3 text-left max-w-md mx-auto">
        <p className="text-sm text-gray-600">📚 Planned features:</p>
        <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
          <li>Chapter breakdowns</li>
          <li>PDF notes and resources</li>
          <li>Video lectures</li>
          <li>Interactive quizzes</li>
        </ul>
      </div>
    </div>
  );
}
