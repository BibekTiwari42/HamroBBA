"use client";

import { useState } from "react";
import Link from "next/link";

interface Semester {
  name: string;
  slug: string;
}

export default function MobileMenu({ semesters }: { semesters: Semester[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSemestersOpen, setIsSemestersOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-xl p-2 text-gray-600 transition-colors hover:bg-gray-100 focus:outline-none dark:text-slate-300 dark:hover:bg-slate-800"
        aria-label="Toggle Menu"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Floating Mobile Dropdown Drawer Panel */}
      <div
        className={`absolute inset-x-0 top-16 left-0 w-full z-40 border-b border-gray-100 bg-white/95 px-6 py-4 shadow-xl backdrop-blur-lg transition-all duration-300 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-slate-900/20 ${
          isOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-4"
        }`}
      >
        <nav className="flex flex-col gap-2">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-blue-50/50 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
          >
            Home
          </Link>

          {/* Collapsible Mobile Accordion Segment */}
          <div className="flex flex-col">
            <button
              onClick={() => setIsSemestersOpen(!isSemestersOpen)}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-gray-700 transition hover:bg-blue-50/50 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
            >
              <span>Semesters</span>
              <svg
                className={`h-4 w-4 text-gray-400 transition-transform dark:text-slate-500 ${isSemestersOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`grid grid-cols-2 gap-1 pl-4 pr-2 transition-all duration-200 ${
              isSemestersOpen ? "mt-1 max-h-60 py-1 opacity-100" : "max-h-0 overflow-hidden opacity-0"
            }`}>
              {semesters.map((sem) => (
                <Link
                  key={sem.slug}
                  href={`/semester/${sem.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-3 py-2 text-xs font-bold text-gray-500 transition hover:bg-gray-50 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-blue-400"
                >
                  {sem.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/notices"
            onClick={() => setIsOpen(false)}
            className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-blue-50/50 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
          >
            Notices
          </Link>

          <Link
            href="/contribute"
            onClick={() => setIsOpen(false)}
            className="mt-1 border-t border-gray-100 pt-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-blue-50/50 hover:text-blue-600 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
          >
            Contribute
          </Link>

          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="mt-2 rounded-xl bg-blue-600 py-3 text-center text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700 dark:shadow-none"
          >
            Login
          </Link>
        </nav>
      </div>
    </div>
  );
}