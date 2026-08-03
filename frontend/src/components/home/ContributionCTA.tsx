import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ContributeCTA() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 pb-12 lg:pb-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 py-10 sm:px-12 sm:py-14 text-center shadow-lg shadow-blue-600/10 ">
        
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/40 blur-[90px]" />

        <div className="relative z-10 flex flex-col items-center">
  
          <div className="mx-auto max-w-3xl text-xl font-semibold leading-relaxed text-white sm:text-2xl md:text-[26px]">
            Have notes, past questions, or study materials?{" "}
            <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-lg font-medium text-blue-100 sm:mt-4 sm:text-xl">
              <span>Contribute to</span>
              
              <span className="relative z-10 inline-block whitespace-nowrap font-extrabold text-white px-1">
                HamroBBA
                <svg 
                  className="absolute -bottom-1.5 left-0 -z-10 h-3 w-full text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] sm:h-3.5" 
                  viewBox="0 0 100 20" 
                  preserveAspectRatio="none" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M2,15 Q50,0 98,15" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                  />
                </svg>
              </span>

              <span>and help thousands of BBA students succeed at Tribhuvan University.</span>
            </p>
          </div>
          
          {/* CTA Button */}
          <Link 
            href="/contribute" 
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-blue-700 shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50 hover:shadow-xl "
          >
            Contribute Now
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}