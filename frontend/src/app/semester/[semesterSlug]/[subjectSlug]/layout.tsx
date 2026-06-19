import { notFound } from "next/navigation";
import { getSubjectBySlug } from "@/lib/api/academics";
import SubjectShell from "@/components/academics/SubjectShell";

export default async function Layout({
  children,
  params,
}: any) {
  const { semesterSlug, subjectSlug } = await params;

  const subject = await getSubjectBySlug(subjectSlug);

  if (!subject) notFound();

  return (
    <SubjectShell
      subject={subject}
      semesterSlug={semesterSlug}
      subjectSlug={subjectSlug}
    >
      {children}
    </SubjectShell>
  );
}