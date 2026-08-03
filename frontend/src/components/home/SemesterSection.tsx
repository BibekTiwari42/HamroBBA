import SemesterCard from "@/components/common/SemesterCard";


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
        <div className="rounded-3xl border border-gray-100 p-16 text-center text-gray-500 bg-gray-50/50 dark:border-slate-800 dark:bg-slate-900/30 dark:text-slate-400">
          <svg 
            className="mx-auto h-12 w-12 text-gray-300 dark:text-slate-700 mb-4" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-base font-medium">No semesters found at the moment.</p>
        </div>
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