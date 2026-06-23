import api from "@/services/api";

export async function getNotesBySubjectSlug(
    subjectSlug: string
    

){
    try{
        const res = await api.get(
            `/resources/notes/?subject_slug=${subjectSlug}`
        );
        return res.data || [];
    } catch (error) {
        console.error("Error fetching notes:", error);
        throw error;
    }
}