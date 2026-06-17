import { notFound } from "next/navigation";
import { SubjectProvider } from "@/context/SubjectContext";
import SubjectSidebar from "./components/SubjectSidebar";
import { getSubjectBySlug } from "@/services/subject.service";

export default async function SubjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    semesterSlug: string;
    subjectSlug: string;
  }>;
}) {
  const { subjectSlug } = await params;

  try {
    const subject =
      await getSubjectBySlug(subjectSlug);

    return (
      <SubjectProvider subject={subject}>
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-3">
            <SubjectSidebar />
          </aside>

          <main className="col-span-9">
            {children}
          </main>
        </div>
      </SubjectProvider>
    );
  } catch {
    notFound();
  }
}