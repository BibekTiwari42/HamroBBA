export interface Evaluation {
  full_marks: number;
  pass_marks: number;
  credits: number;
  lecture_hours: number;
}

export interface CourseUnit {
  unit: number;
  title: string;
  lecture_hours: number;
  topics: string[];
}

export interface SuggestedReading {
  authors: string;
  title: string;
  publisher: string;
  location: string;
}

export interface Syllabus {
  course_code: string;
  course_title: string;
  program: string;
  semester: string;
  evaluation: Evaluation;
  course_objectives: string[];
  course_description: string;
  course_details: CourseUnit[];
  suggested_readings: SuggestedReading[];
}

export interface PastQuestionYear {
  year: number;
  questions: string[];
}

export interface PastQuestions {
  years: PastQuestionYear[];
}

export interface SubjectDetail {
  id: number;
  name: string;
  code: string;
  slug: string;
  description: string;
  syllabus: Syllabus;
  past_questions: PastQuestions;
}