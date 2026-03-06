import { useState, useEffect, useCallback } from "react";
import { api } from "../api/client";
import type { ResumeRow } from "../types/resume";

export function useResumes() {
    const [resumes, setResumes] = useState<ResumeRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchResumes = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.getResumes();
            const rows: ResumeRow[] = Object.entries(data.files).map(
                ([filename, file]) => ({ ...file, filename })
            );
            setResumes(rows);
        } catch (err: any) {
            setError(
                err?.response?.data?.detail ||
                err?.message ||
                "Failed to load resumes"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchResumes();
    }, [fetchResumes]);

    return { resumes, loading, error, refetch: fetchResumes };
}