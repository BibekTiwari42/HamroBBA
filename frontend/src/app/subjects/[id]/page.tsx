"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { getSubjectDetail } from "@/services/academics.service";

type Props = {
  params: {
    id: string;
  };
};

export default function SubjectPage({
  params,
}: Props) {
  const [subject, setSubject] =
    useState<any>(null);

  const [activeTab, setActiveTab] =
    useState("syllabus");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data =
        await getSubjectDetail(
          params.id
        );

      setSubject(data);
      setLoading(false);
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="p-10">
        Loading subject...
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="p-10 text-red-500">
        Failed to load subject
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <h1 className="text-3xl font-bold">
          {subject.name}
        </h1>

        {/* Tabs */}
        <div className="mt-6 flex gap-6 border-b">
          <button
            onClick={() =>
              setActiveTab("syllabus")
            }
            className={`pb-2 ${
              activeTab === "syllabus"
                ? "border-b-2 border-blue-600 font-semibold"
                : ""
            }`}
          >
            Syllabus
          </button>

          <button
            onClick={() =>
              setActiveTab("questions")
            }
            className={`pb-2 ${
              activeTab === "questions"
                ? "border-b-2 border-blue-600 font-semibold"
                : ""
            }`}
          >
            Past Questions
          </button>

          <button
            onClick={() =>
              setActiveTab("units")
            }
            className={`pb-2 ${
              activeTab === "units"
                ? "border-b-2 border-blue-600 font-semibold"
                : ""
            }`}
          >
            Units
          </button>
        </div>

        {/* TAB CONTENT */}
        <div className="mt-6">
          {/* SYLLABUS */}
          {activeTab === "syllabus" && (
            <div>
              {subject.syllabus?.units?.map(
                (unit: any) => (
                  <div
                    key={unit.unit}
                    className="mb-6 rounded-lg border p-4"
                  >
                    <h3 className="font-semibold">
                      Unit {unit.unit}:{" "}
                      {unit.title}
                    </h3>

                    <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                      {unit.topics?.map(
                        (
                          topic: string,
                          i: number
                        ) => (
                          <li key={i}>
                            {topic}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )
              )}
            </div>
          )}

          {/* QUESTIONS */}
          {activeTab === "questions" && (
            <div>
              {subject.past_questions
                ?.years?.map(
                (year: any) => (
                  <div
                    key={year.year}
                    className="mb-6 rounded-lg border p-4"
                  >
                    <h3 className="font-semibold">
                      {year.year}
                    </h3>

                    <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                      {year.questions?.map(
                        (
                          q: string,
                          i: number
                        ) => (
                          <li key={i}>
                            {q}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )
              )}
            </div>
          )}

          {/* UNITS */}
          {activeTab === "units" && (
            <div className="text-gray-500">
              Unit-wise PDFs will be added
              in next step
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}