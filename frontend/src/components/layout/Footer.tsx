import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (

    <footer className="border-t border-slate-200/60 bg-slate-50 font-sans print:hidden dark:border-slate-900 dark:bg-slate-950 transition-colors duration-200">
      
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
     
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="text-xl font-extrabold tracking-tight text-blue-600 dark:text-blue-500">
              Hamro<span className="text-slate-900 dark:text-slate-100">BBA</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              A comprehensive open-resource hub tailored exclusively for Tribhuvan University BBA candidates. Streamlining preparation with notes, board papers, and announcements.
            </p>
          </div>

     
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Explore Platform
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <li>
                <Link href="/" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
              </li>
              <li>
                <Link href="/notices" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">Board Notices</Link>
              </li>
              <li>
                <Link href="/contribute" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">Contribute Notes</Link>
              </li>
            </ul>
          </div>

    
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Semester
            </h4>
            <ul className="grid grid-cols-1 gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <li>
                <Link href="/semester/first_semester" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">1st Semester</Link>
              </li>
              
              <li>
                <Link href="/semester/second-semester" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">2nd Semester</Link>
              </li>

              <li>
                <Link href="/semester/third-semester" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">3rd Semester</Link>
              </li>

              <li>
                <Link href="/semester/fourth-semester" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">4th Semester</Link>
              </li>

              <li>
                <Link href="/semester/fifth-semester" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">5th Semester</Link>
              </li>

              <li>
                <Link href="/semester/sixth-semester" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">6th Semester</Link>
              </li>

              <li>
                <Link href="/semester/seventh-semester" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">7th Semester</Link>
              </li>

              <li>
                <Link href="/semester/eighth-semester" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">8th Semester</Link>
              </li>

            </ul>
          </div>

          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Legal & Help
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <li>
                <Link href="/privacy-policy" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</Link>
              </li>
              <li>
                <a href="mailto:support@hamrobba.com" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="border-t border-slate-200/60 bg-slate-100/50 py-6 dark:border-slate-900 dark:bg-slate-950/40">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium tracking-wide text-center sm:text-left">
            © {currentYear} HamroBBA. All rights reserved. 
          </p>
        </div>
      </div>
    </footer>
  );
}