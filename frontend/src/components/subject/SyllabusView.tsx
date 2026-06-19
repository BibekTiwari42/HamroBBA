import { Syllabus } from "@/types/subject";

interface Props {
  syllabus: Syllabus;
}

export default function SyllabusView({
  syllabus,
}: Props) {
  if (!syllabus) {
    return (
      <div className="rounded-lg border bg-white p-8">
        <p className="text-gray-500">
          Syllabus not available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="rounded-xl border bg-white p-6">
        <h1 className="text-3xl font-bold">
          {syllabus.course_title}
        </h1>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Course Code:</strong>{" "}
            {syllabus.course_code}
          </div>

          <div>
            <strong>Program:</strong>{" "}
            {syllabus.program}
          </div>

          <div>
            <strong>Semester:</strong>{" "}
            {syllabus.semester}
          </div>

          <div>
            <strong>Credits:</strong>{" "}
            {syllabus.evaluation?.credits}
          </div>
        </div>
      </div>

      {/* Objectives */}
      <section className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Course Objectives
        </h2>

        <ul className="list-disc space-y-2 pl-6">
          {syllabus.course_objectives?.map(
            (objective, index) => (
              <li key={index}>
                {objective}
              </li>
            )
          )}
        </ul>
      </section>

      {/* Description */}
      <section className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Course Description
        </h2>

        <p className="leading-7 text-gray-700">
          {syllabus.course_description}
        </p>
      </section>

      {/* Units */}
      <section className="rounded-xl border bg-white p-6">
        <h2 className="mb-6 text-xl font-semibold">
          Course Contents
        </h2>

        <div className="space-y-6">
          {syllabus.course_details?.map(
            (unit) => (
              <div
                key={unit.unit}
                className="rounded-lg border p-5"
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold">
                    Unit {unit.unit}: {unit.title}
                  </h3>

                  <span className="text-sm text-gray-500">
                    {unit.lecture_hours} hrs
                  </span>
                </div>

                <ul className="mt-4 list-disc space-y-2 pl-6">
                  {unit.topics?.map(
                    (topic, topicIndex) => (
                      <li key={topicIndex}>
                        {topic}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )
          )}
        </div>
      </section>

      {/* Books */}
      <section className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Suggested Readings
        </h2>

        <div className="space-y-3">
          {syllabus.suggested_readings?.map(
            (book, index) => (
              <div
                key={index}
                className="rounded border p-3"
              >
                <div className="font-medium">
                  {book.title}
                </div>

                <div className="text-sm text-gray-600">
                  {book.authors}
                </div>

                <div className="text-sm text-gray-500">
                  {book.publisher}
                </div>
              </div>
            )
          )}
        </div>
      </section>

    </div>
  );
}