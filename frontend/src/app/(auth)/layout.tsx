import Link from "next/link";

import ThemeToggle from "@/components/layout/ThemeToggle";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex flex-1 items-center justify-center mt-6 px-4 pb-12">
        <div className="w-full max-w-md">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
