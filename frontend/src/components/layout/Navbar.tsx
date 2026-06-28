import Link from "next/link";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle"; 

export default function Navbar() {
  const semesters = [
    { name: "1st Semester", slug: "first_semester" },
    { name: "2nd Semester", slug: "second-semester" },
    { name: "3rd Semester", slug: "third-semester" },
    { name: "4th Semester", slug: "fourth-semester" },
    { name: "5th Semester", slug: "fifth-semester" },
    { name: "6th Semester", slug: "sixth-semester" },
    { name: "7th Semester", slug: "seventh-semester" },
    { name: "8th Semester", slug: "eighth-semester" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md border-slate-200 dark:bg-slate-900 dark:border-slate-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* LEFT: Logo Brand */}
        <div className="flex shrink-0">
          <Link href="/" className="text-xl font-extrabold tracking-tight text-blue-600 transition hover:opacity-90">
            Hamro<span className="text-gray-900 dark:text-slate-100">BBA</span>
          </Link>
        </div>

        {/*  Centered Navigation */}
        <nav className="hidden items-center gap-1 md:flex absolute left-1/2 -translate-x-1/2">
          <Link
            href="/"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-blue-50/50 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
          >
            Home
          </Link>

          {/* Hover Dropdown */}
          <div className="group relative py-2">
            <button className="flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-blue-50/50 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400">
              <span>Semesters</span>
              <svg 
                className="h-4 w-4 text-gray-400 transition-transform group-hover:rotate-180 group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-400" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Box */}
            <div className="invisible pointer-events-none absolute left-0 mt-1 w-52 origin-top-left rounded-2xl border border-gray-100 bg-white p-2 opacity-0 shadow-xl shadow-blue-100/40 transition-all duration-200 group-hover:visible group-hover:pointer-events-auto group-hover:opacity-100 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
              <div className="grid grid-cols-1 gap-0.5">
                {semesters.map((sem) => (
                  <Link
                    key={sem.slug}
                    href={`/semester/${sem.slug}`}
                    className="rounded-xl px-3 py-2.5 text-xs font-bold text-gray-600 transition-colors hover:bg-blue-50/70 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                  >
                    {sem.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/notices"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-blue-50/50 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
          >
            Notices
          </Link>
        </nav>

   
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/contribute"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-blue-50/50 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
          >
            Contribute
          </Link>
          
          <Link
            href="/login"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300/40 dark:shadow-none"
          >
            Login
          </Link>
          <ThemeToggle />
        </div>


        <MobileMenu semesters={semesters} />

      </div>
    </header>
  );
}