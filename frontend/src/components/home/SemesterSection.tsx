import SemesterCard from "@/components/common/SemesterCard";
import NotFoundState from "@/components/common/NotFoundState";


interface SemesterSectionProps {
  semesters: any[]; //  replace 'any' with your actual Semester type later
}

export default function SemesterSection({ semesters }: SemesterSectionProps) {
  return (
    <section id="semesters" className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 pt-12 pb-20 lg:pt-0 lg:pb-32">
      <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-slate-100">
        Browse Semesters
      </h2>

      {semesters.length === 0 ? (
        <NotFoundState
          compact
          eyebrow="Semesters"
          title="No Semesters Yet"
          description="No semesters found at the moment. Check back soon."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {semesters.map((semester) => (
            <SemesterCard
              key={semester.id}
              semester={semester}
            />
          ))}
        </div>
      )}
    </section>
  );
}
