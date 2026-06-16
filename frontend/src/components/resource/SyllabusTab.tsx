"use client";

type Props = {
  syllabus: any;
};

export default function SyllabusTab({ syllabus }: Props) {
  if (!syllabus) {
    return (
      <div className="text-gray-500">
        Syllabus not available.
      </div>
    );
  }

  return (
    <div className="space-y-10 text-gray-800">

      {/* ================= HEADER ================= */}
      <section className="border-b pb-4">
        <h1 className="text-2xl font-bold text-blue-700">
          {syllabus.course_title}
        </h1>

        <p className="text-sm text-gray-600">
          Course Code: {syllabus.course_code}
        </p>

        <p className="text-sm text-gray-600">
          Program: {syllabus.program} | {syllabus.semester}
        </p>
      </section>

      {/* ================= EVALUATION ================= */}
      {syllabus.evaluation && (
        <section>
          <h2 className="text-xl font-bold text-blue-700 border-b pb-2">
            Evaluation Structure
          </h2>

          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <p>Full Marks: {syllabus.evaluation.full_marks}</p>
            <p>Pass Marks: {syllabus.evaluation.pass_marks}</p>
            <p>Credits: {syllabus.evaluation.credits}</p>
            <p>Lecture Hours: {syllabus.evaluation.lecture_hours}</p>
          </div>
        </section>
      )}

      {/* ================= COURSE OBJECTIVES ================= */}
      {syllabus.course_objectives?.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-blue-700 border-b pb-2">
            Course Objectives
          </h2>

          <ul className="mt-3 list-disc pl-6 space-y-1">
            {syllabus.course_objectives.map(
              (obj: string, i: number) => (
                <li key={i}>{obj}</li>
              )
            )}
          </ul>
        </section>
      )}

      {/* ================= COURSE DESCRIPTION ================= */}
      {syllabus.course_description && (
        <section>
          <h2 className="text-xl font-bold text-blue-700 border-b pb-2">
            Course Description
          </h2>

          <p className="mt-3 leading-relaxed text-gray-700">
            {syllabus.course_description}
          </p>
        </section>
      )}

      {/* ================= UNITS (IMPORTANT FIX) ================= */}
      {syllabus.course_details?.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-blue-700 border-b pb-2">
            Unit-wise Syllabus
          </h2>

          <div className="mt-4 space-y-6">
            {syllabus.course_details.map((unit: any) => (
              <div
                key={unit.unit}
                className="border rounded-lg p-5 bg-white shadow-sm"
              >
                <h3 className="font-semibold text-gray-900">
                  Unit {unit.unit}: {unit.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Lecture Hours: {unit.lecture_hours}
                </p>

                {unit.topics?.length > 0 && (
                  <ul className="mt-3 list-disc pl-6 space-y-1 text-gray-700">
                    {unit.topics.map(
                      (topic: string, i: number) => (
                        <li key={i}>{topic}</li>
                      )
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= REFERENCE BOOKS ================= */}
      {syllabus.suggested_readings?.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-blue-700 border-b pb-2">
            Suggested Readings
          </h2>

          <div className="mt-3 space-y-2">
            {syllabus.suggested_readings.map(
              (book: any, i: number) => (
                <div
                  key={i}
                  className="text-sm text-gray-700"
                >
                  • {book.authors} — {book.title} (
                  {book.publisher})
                </div>
              )
            )}
          </div>
        </section>
      )}
    </div>
  );
}