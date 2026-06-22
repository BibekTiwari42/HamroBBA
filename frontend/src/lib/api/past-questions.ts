import api from "@/services/api";

export interface PastQuestion {
  id: number;
  section: string;
  question_number: number;
  question_text: string;
  marks: number | null;
  display_order: number;
}

export interface PastPaper {
  id: number;
  year: number;
  full_marks: number;
  pass_marks: number;
  duration: string;
}

export interface PastPaperDetail extends PastPaper {
  instructions?: string;
  questions: PastQuestion[];
}

export async function getPastPapers(
  subjectSlug: string
): Promise<PastPaper[]> {
  try {
    const res = await api.get(
      `/question-bank/papers/?subject_slug=${subjectSlug}`
    );

    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPastPaper(
  subjectSlug: string,
  year: string
): Promise<PastPaperDetail | null> {
  try {
    const res = await api.get(
      `/question-bank/papers/${year}/?subject_slug=${subjectSlug}`
    );

    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}