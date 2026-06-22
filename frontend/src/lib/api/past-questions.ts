import api from "@/services/api";

export interface PastQuestionResource {
	id: number;
	title: string;
	slug: string;
	question_year: number;
	viewer_url: string;
}

export async function getPastQuestionsBySubject(
	subjectSlug: string
): Promise<PastQuestionResource[]> {
	try {
		const res = await api.get(
			`/resources/past-questions/?subject_slug=${subjectSlug}`
		);
		return res.data;
	} catch (error) {
		console.error("Failed to fetch past questions", error);
		return [];
	}
}

export async function getPastQuestionByYear(
	subjectSlug: string,
	year: string
): Promise<PastQuestionResource | null> {
	const resources = await getPastQuestionsBySubject(subjectSlug);
	return (
        resources.find(
        (item) => 
            String(item.question_year) === year) || null
    );
}