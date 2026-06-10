import api from "./api";
import { Semester } from "@/types/semester";
import { endpoints } from "@/lib/endpoints";

export const getSemesters = async (): Promise<Semester[]> => {
  const response = await api.get(endpoints.academics.semesters);
  return response.data.results || response.data.data;
};