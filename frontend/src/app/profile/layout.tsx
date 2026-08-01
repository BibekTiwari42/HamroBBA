import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-1 px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
