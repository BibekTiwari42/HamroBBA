import api from "@/services/api";

export async function getSyllabusBySubjectSlug(
  subjectSlug: string
) {
  try {
    const res = await api.get(
      `/resources/syllabus/?subject_slug=${subjectSlug}`
    );

    return res.data;
  } catch (error) {
    console.error(
      "Failed to fetch syllabus",
      error
    );

    return null;
  }
}