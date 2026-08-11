import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NotFoundState from "@/components/common/NotFoundState";

export default function NotFound() {
  return (
    <>
      <main className="flex min-h-screen flex-col bg-slate-50 transition-colors duration-200 dark:bg-slate-950">
        <Navbar />

        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-24">
          <NotFoundState
            show404
            title="Page Not Found"
            description="Oops! The page you are looking for doesn't exist or may have been moved. Let's get you back to your studies."
            primary={{ href: "/", label: "← Back to Home" }}
            secondary={{ href: "/semester/first_semester", label: "Browse Notes" }}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
