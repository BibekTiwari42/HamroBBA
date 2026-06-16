"use client";

import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getSubjectBySlug } from "@/services/academics.service";
import { SyllabusUnit } from "@/types/academic";

export default function SyllabusUnitNotePage() {
  const params = useParams();
  const semesterSlug = params.semesterSlug as string | undefined;
  const subjectSlug = params.subjectSlug as string | undefined;
  const unitParam = params.unit as string | undefined;

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<SyllabusUnit | null>(null);
  const [subjectName, setSubjectName] = useState<string>("");

  const unitNumber = useMemo(() => {
    if (!unitParam) return null;
    const n = Number(unitParam);
    return Number.isFinite(n) ? n : null;
  }, [unitParam]);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!subjectSlug) {
          setError("Subject not found");
          return;
        }
        setLoading(true);
        const data = await getSubjectBySlug(subjectSlug);
        if (!data) {
          setError("Subject not found");
          return;
        }
        setSubjectName(data.name);

        const units = data.syllabus?.units ?? [];
        if (!unitNumber) {
          setError("Invalid unit");
          return;
        }

        const found = units.find((u) => u.unit === unitNumber) ?? null;
        if (!found) {
          setError("Unit note not found");
          return;
        }
        setUnit(found);
      } catch (e) {
        console.error(e);
        setError("Failed to load unit note");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [subjectSlug, unitNumber]);

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

  if (error || !unit) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
            <h1 className="text-2xl font-bold text-red-900">{error ?? "Error"}</h1>
            {semesterSlug ? (
              <Link
                href={`/semester/${semesterSlug}`}
                className="mt-4 inline-block rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Back to Semester
              </Link>
            ) : null}
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
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-10">
          <div className="mx-auto max-w-7xl px-6">
            {semesterSlug ? (
              <Link
                href={`/semester/${semesterSlug}`}
                className="mb-4 inline-flex items-center text-blue-100 hover:text-white"
              >
                ← Back to Semester
              </Link>
            ) : null}

            <h1 className="text-3xl font-bold">{subjectName}</h1>
            <p className="mt-2 text-blue-100">
              Unit {unit.unit}: {unit.title}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="rounded-lg bg-white shadow-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold text-gray-900">
                  Chapter Notes (Topic List)
                </h2>
                <button
                  onClick={() => router.back()}
                  className="text-sm text-blue-700 hover:text-blue-800 font-medium"
                >
                  Back
                </button>
              </div>

              {unit.topics?.length ? (
                <ul className="space-y-3">
                  {unit.topics.map((topic, idx) => (
                    <li
                      key={idx}
                      className="rounded-md border border-gray-200 p-4 text-sm text-gray-700 flex items-start"
                    >
                      <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-700 font-bold">
                        {idx + 1}
                      </span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No chapter contents available.</p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

