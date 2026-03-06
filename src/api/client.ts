import axios from "axios";
import type { ResumesResponse } from "../types/resume";

const client = axios.create({
baseURL: import.meta.env.VITE_BACKEND_URL, 
});

console.log("API client initialized with base URL:", client.defaults.baseURL);
export const api = {
    async getResumes(): Promise<ResumesResponse> {
        const { data } = await client.get<ResumesResponse>("/resumes");
        return data;
    },

    async uploadResume(file: File, title: string): Promise<void> {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("title", title);
        await client.post("/resumes/upload", fd, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },

    async deleteResume(id: string): Promise<void> {
        await client.delete(`/resumes/${id}`);
    },

    getDownloadUrl(storagePath: string): string {
        return `${client.defaults.baseURL}/resumes/download/${storagePath}`;
    },
};