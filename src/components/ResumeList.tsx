import React from "react";
import { P } from "../lib/palette";
import { ResumeCard } from "./ResumeCard";
import type { ResumeRow } from "../types/resume";

interface ResumeListProps {
    resumes: ResumeRow[];
    loading: boolean;
    error: string | null;
    onDelete: () => void;
    onRetry: () => void;
}

export const ResumeList: React.FC<ResumeListProps> = ({
    resumes,
    loading,
    error,
    onDelete,
    onRetry,
}) => {
    // ── Loading shimmer ──
    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        style={{
                            height: "90px",
                            borderRadius: "16px",
                            border: `1px solid ${P.border}`,
                            background: `linear-gradient(90deg, ${P.surface} 25%, rgba(255,255,255,0.02) 50%, ${P.surface} 75%)`,
                            backgroundSize: "300% 100%",
                            animation: `shimmer 2s infinite linear`,
                            animationDelay: `${i * 0.2}s`,
                        }}
                    />
                ))}
            </div>
        );
    }

    // ── Error state ──
    if (error) {
        return (
            <div
                style={{
                    background: P.surface,
                    border: `1px solid ${P.errBorder}`,
                    borderRadius: "16px",
                    padding: "40px",
                    textAlign: "center",
                    animation: "fadeUp 0.4s ease-out",
                }}
            >
                <div
                    style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: P.errBg,
                        border: `1px solid ${P.errBorder}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 14px",
                    }}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={P.errText}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                </div>
                <p
                    style={{
                        fontSize: "13px",
                        color: P.errText,
                        marginBottom: "14px",
                    }}
                >
                    {error}
                </p>
                <button
                    onClick={onRetry}
                    style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: P.accentSoft,
                        background: "none",
                        border: `1px solid ${P.border}`,
                        borderRadius: "8px",
                        padding: "8px 18px",
                        cursor: "pointer",
                    }}
                >
                    Retry
                </button>
            </div>
        );
    }

    // ── Empty state ──
    if (!resumes.length) {
        return (
            <div
                style={{
                    background: P.surface,
                    border: `1px solid ${P.border}`,
                    borderRadius: "16px",
                    padding: "60px 24px",
                    textAlign: "center",
                    animation: "fadeUp 0.4s ease-out",
                }}
            >
                <div
                    style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "16px",
                        background: "rgba(255,255,255,0.02)",
                        border: `1px dashed ${P.dim}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 16px",
                    }}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={P.dim}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                    </svg>
                </div>
                <p style={{ fontSize: "14px", color: P.muted, margin: 0 }}>
                    No resumes yet
                </p>
                <p
                    style={{
                        fontSize: "12px",
                        color: P.dim,
                        margin: "4px 0 0",
                    }}
                >
                    Upload your first resume to get started
                </p>
            </div>
        );
    }

    // ── List ──
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
            }}
        >
            {resumes.map((r, i) => (
                <ResumeCard
                    key={r.id}
                    resume={r}
                    index={i}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};