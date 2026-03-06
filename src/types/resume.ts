export interface ResumeFile {
    id: string;
    title: string;
    checksum: string;
    size: number;
    updated_at: string;
    storage_path: string;
}

export interface ResumesResponse {
    sync_version: number;
    server_time: string;
    total_files: number;
    files: Record<string, ResumeFile>;
}

export interface ResumeRow extends ResumeFile {
    filename: string;
}