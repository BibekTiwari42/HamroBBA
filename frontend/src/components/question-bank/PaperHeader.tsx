interface Props {
  subjectName: string;
  subjectCode: string;
  year: number;
  fullMarks: number;
  passMarks: number;
  duration: string;
}

export default function PaperHeader({
  subjectName,
  subjectCode,
  year, 
  fullMarks,
  passMarks,
  duration,
}: Props) {
  return (
    <div className="border-b-2 border-gray-900 dark:border-slate-700 pb-6 font-serif">
      {/* Upper Layout Block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        
        {/* Left: Program Info */}
        <div className="text-left order-2 md:order-1 text-[14px] text-gray-800 dark:text-slate-200 space-y-0.5">
          <p className="font-medium">Bachelor in Business Administration</p>
          <p className="font-bold text-gray-900 dark:text-white capitalize">{subjectName}</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 tracking-wider">{subjectCode}</p>
        </div>

        {/* Center: University Title & Year */}
        <div className="text-center order-1 md:order-2 space-y-1 py-2 md:py-0">
          <h1 className="text-base font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
            Faculty of Management
          </h1>
          <p className="text-lg font-bold tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 inline-block px-3 py-0.5 rounded">
            {year}
          </p>
        </div>

        {/* Right: Scoring limits */}
        <div className="text-left md:text-right order-3 text-[14px] text-gray-800 dark:text-slate-200 space-y-0.5 tabular-nums">
          <p><span className="text-gray-500 dark:text-slate-400 font-normal">Full Marks:</span> <span className="font-bold">{fullMarks}</span></p>
          <p><span className="text-gray-500 dark:text-slate-400 font-normal">Pass Marks:</span> <span className="font-bold">{passMarks}</span></p>
          <p className="text-xs text-gray-500 dark:text-slate-400 font-normal italic">Time: {duration}</p>
        </div>
      </div>

      {/* Standalone Exam Instructions Block */}
      <div className="mt-6 rounded-lg bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800 p-3.5 text-xs text-blue-600 dark:text-blue-400 leading-relaxed italic">
         Candidates are requested to give their answers in their own words as far as practicable. Figures in brackets or margins indicate total section value.
      </div>
    </div>
  );
}
