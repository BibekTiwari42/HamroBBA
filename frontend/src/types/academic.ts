export interface SyllabusUnit {
  unit: number;
  title: string;
  topics: string[];
}

export interface Syllabus {
  units: SyllabusUnit[];
}

export interface PastQuestion {
  year: number;
  questions: string[];
}

export interface PastQuestions {
  years: PastQuestion[];
}

export interface Subject {
  id: number;
  name: string;
  code: string;
  slug: string;
  description?: string;
  semester: number | Semester;
  syllabus?: Syllabus | null;
  past_questions?: PastQuestions | null;
}

export interface Semester {
  id: number;
  name: string;
  slug: string;
  order: number;
  description?: string;
  subjects?: Subject[];
}
