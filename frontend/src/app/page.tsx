import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import SemesterSection from "@/components/home/SemesterSection";
import { getSemesters } from "@/lib/api/academics";
import ContributeCTA from "@/components/home/ContributionCTA";

export default async function HomePage() {
  let semesters: any[] = [];

  try {
    semesters = await getSemesters();
  } catch (error) {
    console.error("Failed to load semesters", error);
  }

  return (
    <>
      <main className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <Navbar />
        
        <HeroSection />
        
        <SemesterSection semesters={semesters} />

        <ContributeCTA />
        
      </main>

      <Footer />
    </>
  );
}