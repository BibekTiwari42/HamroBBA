import SubjectHero from "./SubjectHero";
import SubjectTabs from "./SubjectTabs";
import { Subject } from "@/types/academics";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          
          {/* HERO */}
          <SubjectHero subject={subject} />

          {/* TABS */}
          <SubjectTabs
            semesterSlug={semesterSlug}
            subjectSlug={subjectSlug}
          />

          {/* CONTENT */}
          <div className="mt-6">{children}</div>
        </div>
      </div>

      <Footer />
    </>
  );
}