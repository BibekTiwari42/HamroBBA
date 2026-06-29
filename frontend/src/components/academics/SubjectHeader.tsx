import { Subject } from "@/types/academic";

export default function SubjectHero({ subject }: { subject: Subject }) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="inline-flex w-fit items-center rounded border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
            {subject.code || "BBA-SUBJECT"}
          </span>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
            {subject.name}
          </h1>

          {subject.description && (
            <p className="mt-2.5 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              {subject.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}