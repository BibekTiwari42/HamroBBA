"use client";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <div className="sticky top-4 z-50 mx-auto w-full max-w-[1400px] px-4 sm:px-6">
      <header 
        className={`flex h-16 w-full items-center justify-between rounded-2xl border transition-all duration-300 px-5 sm:px-6 ${
          isScrolled 
          ? "border-white/60 bg-white/60 backdrop-blur-lg shadow-lg shadow-blue-900/5 dark:border-slate-700/50 dark:bg-slate-900/60 dark:shadow-black/20" 
          : "border-transparent bg-transparent shadow-none dark:border-transparent dark:bg-transparent dark:shadow-none"
        }`}
      >
        
        {/* LEFT: Logo  */}
        <div className="flex items-center gap-5 lg:gap-6">
          <Link href="/" className="text-xl font-extrabold tracking-tight text-blue-600 transition hover:opacity-90 shrink-0">
            Hamro<span 
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-900 dark:text-slate-100'
                : 'text-gray-900 dark:text-slate-100'
                }`}>BBA</span>
          </Link>

          {/* Vertical Divider */}
          <div className="hidden h-4 w-px bg-slate-300/70 dark:bg-slate-700 md:block"></div>

          {/* Nav Links */}
          <nav className="hidden items-center gap-1 md:flex">

            {/* Hover Dropdown */}
            <div className="group relative py-2">
              <button className="flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-blue-50/50 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800/80 dark:hover:text-blue-400">
                <span>Semesters</span>
                <svg className="h-4 w-4 text-gray-400 transition-transform group-hover:rotate-180 group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="invisible pointer-events-none absolute left-0 mt-2 w-52 origin-top-left rounded-2xl border border-white/50 bg-white/90 p-2 opacity-0 backdrop-blur-xl shadow-xl shadow-blue-100/40 transition-all duration-200 group-hover:visible group-hover:pointer-events-auto group-hover:opacity-100 dark:border-slate-700/50 dark:bg-slate-900/90 dark:shadow-none z-50">
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

            <Link href="/notices" className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-blue-50/50 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800/80 dark:hover:text-blue-400">
              Notices
            </Link>
            <Link href="/contribute" className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-blue-50/50 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800/80 dark:hover:text-blue-400">              Contribute
            </Link>
          </nav>
        </div>

        {/* RIGHT: Auth & Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="flex items-center gap-1 px-2 text-sm font-semibold text-gray-600 transition-all duration-200 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400">
              Login <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-blue-600/95 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-200/50 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300/40 dark:shadow-none backdrop-blur-sm"
            >
              Sign Up
            </Link>
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <MobileMenu semesters={semesters} />
          </div>
        </div>

      </header>
    </div>
  );
}