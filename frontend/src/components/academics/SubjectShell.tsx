import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import SubjectHero from "./SubjectHero";
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

      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <SubjectHero subject={subject} />

          <SubjectTabs
            semesterSlug={semesterSlug}
            subjectSlug={subjectSlug}
          />

          <div className="mt-8">{children}</div>
        </div>
      </main>

      <Footer />
    </>
  );
}
