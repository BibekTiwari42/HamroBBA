import SubjectHero from "./SubjectHero";
import SubjectTabs from "./SubjectTabs";
import { Subject } from "@/types/academics";

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
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* HERO */}
      <SubjectHero subject={subject} />

      {/* NAV TABS */}
      <SubjectTabs
        semesterSlug={semesterSlug}
        subjectSlug={subjectSlug}
      />

      {/* CONTENT AREA */}
      <div className="mt-6">{children}</div>
    </div>
  );
}