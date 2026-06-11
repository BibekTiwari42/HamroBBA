import Link from "next/link";

type SemesterCardProps = {
  id: number;
  title: string;
};

export default function SemesterCard({
  id,
  title,
}: SemesterCardProps) {
  return (
    <Link href={`/semesters/${id}`}>
      <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-md cursor-pointer">
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          View subjects and resources
        </p>
      </div>
    </Link>
  );
}