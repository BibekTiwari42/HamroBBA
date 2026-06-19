import { Subject } from "@/types/academics";

interface Props {
  subject: Subject;
}

export default function SubjectHero({ subject }: Props) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-6 shadow-md">
      <h1 className="text-3xl font-bold">
        {subject.name}
      </h1>

      <p className="text-blue-100 mt-1">
        {subject.code}
      </p>

      {subject.description && (
        <p className="mt-3 text-blue-100 text-sm leading-relaxed max-w-3xl">
          {subject.description}
        </p>
      )}
    </div>
  );
}