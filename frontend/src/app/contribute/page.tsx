import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContributeHero from "@/components/contribute/ContributeHero";
import ContributionTypes from "@/components/contribute/ContributionTypes";
import ContributionFAQ from "@/components/contribute/ContributionFAQ";
import ContributionCTA from "@/components/home/ContributionCTA";

export const metadata: Metadata = {
  title: "Contribute Resources | HamroBBA",
  description: "Share notes, syllabus and past questions with the HamroBBA community.",
};

export default function ContributePage() {
  return (
    <>
        <Navbar />
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
      <ContributeHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        <ContributionTypes />

        <ContributionFAQ />
      </div>
      <ContributionCTA />
    </main>
        <Footer />
    </>
  );
}