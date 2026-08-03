import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-2 pb-12 lg:pt-8 lg:pb-24">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 relative z-10">
          
          {/* Left Column */}
          <div className="flex flex-col items-start text-left max-w-xl">
            <span className="mb-4 text-[13px] font-extrabold tracking-[0.2em] text-blue-700 uppercase dark:text-blue-500">
              TU BBA Study Platform
            </span>
            
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-[3.5rem] sm:leading-[1.15] dark:text-white">
              Academic resources for <span className="font-logo text-blue-700 dark:text-blue-500">TU BBA</span>, made easy.
            </h1>
            
            <p className="mb-10 text-lg text-gray-600 dark:text-slate-400 leading-relaxed">
              Gain subject excellence and access structured notes, syllabus, past questions, and academic materials directly with HamroBBA.
            </p>
            
            <div className="flex flex-wrap items-center gap-6">
              <Link href="#semesters" className="flex items-center gap-1 text-[16px] font-bold text-gray-900 hover:text-blue-700 transition-colors dark:text-white dark:hover:text-blue-400">
                Semester <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link href="/about" className="rounded-full bg-[#dcf2f2] px-7 py-3 text-[16px] font-bold text-[#2b7a85] transition-colors hover:bg-[#c6e8e8] dark:bg-[#1a3a3f] dark:text-[#5ce1e6]">
                Learn more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            {/* Hero Stats */}
            <div className="mt-8 flex items-center gap-8 border-l-[3px] border-[#2b7a85] pl-6 lg:mt-10">
              <div>
                <div className="flex items-center gap-1">
                  <svg className="h-6 w-6 text-[#2b7a85]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" />
                  </svg>
                  <span className="text-3xl font-black text-gray-900 dark:text-white">8</span>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-slate-400">Total Semesters</span>
              </div>
              
              <div className="h-10 w-px bg-gray-200 dark:bg-slate-700"></div>
              
              <div>
                <div className="flex items-center gap-1">
                  <svg className="h-6 w-6 text-[#2b7a85]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" />
                  </svg>
                  <span className="text-3xl font-black text-gray-900 dark:text-white">40+</span>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-slate-400">Core Subjects</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative mt-12 lg:mt-0 h-[280px] sm:h-[400px] lg:h-[500px] w-full select-none">
            <Image
              src="/light-hero.png"
              alt="Student learning light asset"
              fill
              className="object-contain transition-opacity duration-500 ease-in-out dark:opacity-0"
              priority
            />
            <Image
              src="/dark2.png"
              alt="Student learning dark asset"
              fill
              className="object-contain opacity-0 transition-opacity duration-500 ease-in-out dark:opacity-100"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}