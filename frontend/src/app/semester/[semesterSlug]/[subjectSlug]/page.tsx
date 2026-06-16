"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TabNav from "@/components/common/TabNav";
import SyllabusTab from "@/components/resource/SyllabusTab";
import PastQuestionsTab from "@/components/resource/PastQuestionsTab";
import UnitsTab from "@/components/resource/UnitsTab";
import { getSubjectBySlug } from "@/services/academics.service";
import { Subject } from "@/types/academic";

const TABS = [
  { id: "syllabus", label: "Syllabus", icon: "📚" },
  { id: "past-questions", label: "Past Questions", icon: "❓" },
  { id: "units", label: "Units", icon: "📖" },
];

export default function SubjectDetailPage() {
  const params = useParams();
  const semesterSlug = params.semesterSlug as string;
  const subjectSlug = params.subjectSlug as string;
  
  const [subject, setSubject] = useState<Subject | null>(null);
  const [activeTab, setActiveTab] = useState("syllabus");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        setLoading(true);
        const data = await getSubjectBySlug(subjectSlug);
        if (data) {
          setSubject(data);
        } else {
          setError("Subject not found");
        }
      } catch (err) {
        setError("Failed to load subject");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (subjectSlug) {
      fetchSubject();
    }
  }, [subjectSlug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex justify-center items-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !subject) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
            <h1 className="text-2xl font-bold text-red-900">
              {error || "Subject Not Found"}
            </h1>
            <p className="mt-2 text-red-700">
              The subject you're looking for doesn't exist or could not be loaded.
            </p>
            <Link
              href={`/semester/${semesterSlug}`}
              className="mt-4 inline-block rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Back to Semester
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="mx-auto max-w-7xl px-6">
            <Link
              href={`/semester/${semesterSlug}`}
              className="mb-4 inline-flex items-center text-blue-100 hover:text-white"
            >
              ← Back to Semester
            </Link>
            <h1 className="text-4xl font-bold">{subject.name}</h1>
            <p className="mt-2 text-blue-100">Code: {subject.code}</p>
            {subject.description && (
              <p className="mt-3 text-lg text-blue-100">{subject.description}</p>
            )}
          </div>
        </section>

        {/* Content Section */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-lg bg-white shadow-md">
            {/* Tabs */}
            <div className="px-6">
              <TabNav
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "syllabus" && (
                <SyllabusTab syllabus={subject.syllabus} />
              )}
              {activeTab === "past-questions" && (
                <PastQuestionsTab pastQuestions={subject.past_questions} />
              )}
              {activeTab === "units" && <UnitsTab />}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
