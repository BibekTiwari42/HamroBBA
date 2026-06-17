import api from "@/lib/api";
import { SubjectDetail } from "@/types/subject";
import axios from "axios";

export async function getSubjectBySlug(
  slug: string
): Promise<SubjectDetail> {
  try {
    const response = await api.get(
      `/academics/subjects/${slug}/`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Subject not found");
      }

      if (error.response?.status === 429) {
        throw new Error(
          "Too many requests. Please try again later."
        );
      }
    }

    throw new Error(
      "Failed to fetch subject information."
    );
  }
}