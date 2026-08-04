import { Check, ShieldAlert, Award, Clock } from "lucide-react";

const guidelines = [
  "PDF format only (Max 20MB)",
  "Clear readable scan",
  "Correct semester",
  "Correct subject",
  "No copyrighted books",
  "No password-protected PDFs",
  "Only upload materials you own",
];

export default function ContributionGuidelines() {
  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <ShieldAlert className="w-8 h-8 text-blue-600 dark:text-blue-500" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Contribution Guidelines</h2>
      </div>

      <ul className="space-y-4 mb-8">
        {guidelines.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="mt-1 shrink-0 bg-blue-100 dark:bg-blue-900/50 p-1 rounded-full text-blue-600 dark:text-blue-400">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <span className="text-slate-700 dark:text-slate-300">{item}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-4 bg-slate-50 dark:bg-slate-950/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/60">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-slate-500 dark:text-slate-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Review Time</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">24–72 hours</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Contributor Recognition</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Outstanding contributors may be acknowledged on HamroBBA unless they request to remain anonymous.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}