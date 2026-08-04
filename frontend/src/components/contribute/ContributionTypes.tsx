import { BookOpen, FileQuestion, ScrollText, FileSpreadsheet } from "lucide-react";

const types = [
  {
    title: "Chapter Notes",
    description: "High-quality chapter-wise notes.",
    icon: BookOpen,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    title: "Past Questions",
    description: "Previous university examination papers.",
    icon: FileQuestion,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    title: "Syllabus",
    description: "Official TU syllabus.",
    icon: ScrollText,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    title: "Model Questions",
    description: "Important practice questions.",
    icon: FileSpreadsheet,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
];

export default function ContributionTypes() {
  return (
    <section>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">What can you contribute?</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {types.map((type, index) => {
          const Icon = type.icon;
          return (
            <div 
              key={index} 
              className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${type.bg} ${type.color} transition-colors`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">{type.title}</h3>
              <hr className="my-3 border-slate-100 dark:border-slate-800 transition-colors group-hover:border-slate-200 dark:group-hover:border-slate-700" />
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {type.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}