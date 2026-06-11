import api from "./api";
import { Semester } from "@/types/semester";
import { endpoints } from "@/lib/endpoints";

export const getSemesters = async (): Promise<Semester[]> => {
  const response = await api.get(endpoints.academics.semesters);
  return response.data.results || response.data.data;
};

export const getSubjectsBySemester =
  async (id: string) => {
    if (!id) {
      console.error("Missing semester id");
      return [];
    }

    const response =
      await api.get(
        `/academics/subjects/?semester=${id}`
      );

    console.log(
      "API Response:",
      response.data
    );

    return response.data.results ?? [];
  };