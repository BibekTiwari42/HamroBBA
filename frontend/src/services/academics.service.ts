import api from "./api";
import { Semester, Subject } from "@/types/academic";
import { endpoints } from "@/lib/endpoints";

export const getSemesters = async (): Promise<Semester[]> => {
  try {
    const response = await api.get(endpoints.academics.semesters);
    return response.data.results || response.data;
  } catch (error) {
    console.error("Failed to fetch semesters", error);
    return [];
  }
};

export const getSemesterBySlug = async (
  slug: string
): Promise<Semester | null> => {
  try {
    console.log("Fetching semester with slug:", slug);
    const response = await api.get(
      `/academics/semesters/by_slug/?slug=${slug}`
    );
    console.log("Semester response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch semester", error);
    console.error("Error details:", error instanceof Error ? error.message : String(error));
    return null;
  }
};

export const getSubjectsBySemester = async (
  id: string
): Promise<Subject[]> => {
  if (!id) {
    console.error("Missing semester id");
    return [];
  }

  try {
    const response = await api.get(
      `/academics/subjects/?semester=${id}`
    );
    return response.data.results || response.data;
  } catch (error) {
    console.error("Failed to fetch subjects", error);
    return [];
  }
};

export const getSubjectsBySemesterSlug = async (
  semesterSlug: string
): Promise<Subject[]> => {
  try {
    const response = await api.get(
      `/academics/subjects/by_semester_slug/?semester_slug=${semesterSlug}`
    );
    return response.data.results || response.data;
  } catch (error) {
    console.error(
      "Failed to fetch subjects by semester slug",
      error
    );
    return [];
  }
};

export const getSubjectBySlug = async (
  slug: string
): Promise<Subject | null> => {
  try {
    const response = await api.get(
      `/academics/subjects/by_slug/?slug=${slug}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch subject", error);
    return null;
  }
};

export const getSubjectDetail = async (
  id: string
): Promise<Subject | null> => {
  try {
    const response = await api.get(
      `/academics/subjects/${id}/`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch subject", error);
    return null;
  }
};