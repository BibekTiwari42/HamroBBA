import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import SubjectHeader from "./SubjectHeader";
import SubjectTabs from "./SubjectTabs";

import { Subject } from "@/types/academic";

interface Props {
  subject: Subject;
  semesterSlug: string;
  subjectSlug: string;
  children: React.ReactNode;
}

export default function SubjectShell({
  subject,
  semesterSlug,
  subjectSlug,
  children,
}: Props) {
  return (
    <>
      <Navbar />


      <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <SubjectHeader subject={subject} />

          <div className="mt-6">
            <SubjectTabs
              semesterSlug={semesterSlug}
              subjectSlug={subjectSlug}
            />
          </div>

          <div className="mt-8">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}