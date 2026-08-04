import { ExternalLink, Check, Award } from "lucide-react";

const guidelines = [
  "PDF format only (< 20MB)",
  "Clear, readable scan",
  "Correct semester & subject",
  "No copyrighted books",
  "No password-protected PDFs",
  "Upload owned materials only",
];

export default function ContributeHero() {
  return (
    <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-slate-50 dark:from-blue-900/20 dark:via-slate-950 dark:to-slate-950"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Help Thousands of <br className="hidden lg:block" />
              <span className="text-blue-600 dark:text-blue-500">BBA Students</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0">
              Share your notes, syllabus, and past questions with the HamroBBA community.
            </p>

            <div className="flex flex-col items-center lg:items-start gap-4 pt-2">
              <a
                href="https://forms.gle/xxxxxxxxxxxxxxxx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-full shadow-lg hover:shadow-blue-500/25 transition-all hover:-translate-y-1"
              >
                Open Contribution Form
                <ExternalLink className="w-5 h-5" />
              </a>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                All submissions are manually reviewed before being published.
              </p>
            </div>
          </div>

          {/* Right Column: Compact Guidelines Card  */}
          <div className="lg:col-span-5 xl:col-span-4 w-full max-w-md mx-auto lg:ml-auto bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-5">Contribution Guidelines</h2>

            <ul className="grid grid-cols-1 gap-x-4 gap-y-3 mb-6">
              {guidelines.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 leading-tight">{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/60">
              <div className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider">Recognition</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Acknowledged on platform unless requested otherwise.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}