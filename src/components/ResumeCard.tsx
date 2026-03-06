import React, { useState } from "react";
import { api } from "../api/client";
import { P } from "../lib/palette";
import {
    formatBytes,
    formatRelativeDate,
    formatFullDate,
    getFileExtension,
} from "../lib/utils";
import { Spinner } from "./Spinner";
import type { ResumeRow } from "../types/resume";

interface ResumeCardProps {
    resume: ResumeRow;
    index: number;
    onDelete: () => void;
}

export const ResumeCard: React.FC<ResumeCardProps> = ({
    resume: r,
    index,
    onDelete,
}) => {
    const [deleting, setDeleting] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm("Delete this resume?")) return;
        setDeleting(true);
        try {
            await api.deleteResume(r.id);
            onDelete();
        } catch {
            alert("Delete failed");
        } finally {
            setDeleting(false);
        }
    };

    const ext = getFileExtension(r.filename);

    return (
        <div
            onClick={() => setExpanded(!expanded)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="hoverable"
            style={{
                background: hovered ? P.hover : P.elevated,
                border: `1px solid ${hovered ? P.borderHover : P.border}`,
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: hovered
                    ? "0 12px 40px rgba(0,0,0,0.4)"
                    : "0 2px 8px rgba(0,0,0,0.15)",
                animation: `slideRight 0.35s ease-out both`,
                animationDelay: `${index * 0.06}s`,
            }}
        >
            {/* Collapsed row */}
            <div
                style={{
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                }}
            >
                {/* File type badge */}
                <div
                    style={{
                        width: "48px",
                        height: "58px",
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.04)",
                        border: `1px solid ${P.border}`,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.3s",
                        transform: hovered ? "scale(1.04)" : "scale(1)",
                    }}
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={P.sub}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span
                        style={{
                            fontSize: "8px",
                            fontWeight: 800,
                            color: P.muted,
                            marginTop: "3px",
                            letterSpacing: "0.5px",
                        }}
                    >
                        {ext}
                    </span>
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                        style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: P.text,
                            margin: 0,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {r.title}
                    </h3>
                    <p
                        style={{
                            fontSize: "11px",
                            color: P.muted,
                            margin: "3px 0 0",
                            fontFamily: "monospace",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {r.filename}
                    </p>
                </div>

                {/* Meta pills */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: "6px",
                        flexShrink: 0,
                    }}
                >
                    <span
                        style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            padding: "3px 10px",
                            borderRadius: "7px",
                            background: "rgba(255,255,255,0.05)",
                            border: `1px solid ${P.border}`,
                            color: P.sub,
                        }}
                    >
                        {formatBytes(r.size)}
                    </span>
                    <span style={{ fontSize: "10px", color: P.muted }}>
                        {formatRelativeDate(r.updated_at)}
                    </span>
                </div>

                {/* Expand arrow */}
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={P.dim}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        flexShrink: 0,
                        transition: "transform 0.3s ease",
                        transform: expanded ? "rotate(180deg)" : "rotate(0)",
                    }}
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </div>

            {/* Expanded detail panel */}
            {expanded && (
                <div
                    style={{
                        borderTop: `1px solid ${P.border}`,
                        padding: "16px 20px",
                        animation: "fadeIn 0.25s ease-out",
                        background: "rgba(255,255,255,0.01)",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            gap: "12px",
                            marginBottom: "16px",
                        }}
                    >
                        {[
                            { label: "File Size", value: formatBytes(r.size) },
                            { label: "Updated", value: formatFullDate(r.updated_at) },
                            {
                                label: "Checksum",
                                value: r.checksum
                                    ? r.checksum.slice(0, 12) + "…"
                                    : "—",
                            },
                        ].map(({ label, value }) => (
                            <div key={label}>
                                <p
                                    style={{
                                        fontSize: "10px",
                                        color: P.muted,
                                        textTransform: "uppercase",
                                        letterSpacing: "1px",
                                        fontWeight: 600,
                                        margin: 0,
                                    }}
                                >
                                    {label}
                                </p>
                                <p
                                    style={{
                                        fontSize: "12px",
                                        color: P.sub,
                                        margin: "3px 0 0",
                                        fontFamily: "monospace",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {value}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex", gap: "8px" }}>
                        <a
                            href={api.getDownloadUrl(r.storage_path)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "7px",
                                padding: "9px",
                                borderRadius: "10px",
                                fontSize: "12px",
                                fontWeight: 600,
                                color: P.bg,
                                background: P.accent,
                                textDecoration: "none",
                                transition: "opacity 0.2s",
                            }}
                        >
                            <svg
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download
                        </a>
                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "7px",
                                padding: "9px",
                                borderRadius: "10px",
                                fontSize: "12px",
                                fontWeight: 600,
                                color: P.errText,
                                background: P.errBg,
                                border: `1px solid ${P.errBorder}`,
                                cursor: deleting ? "not-allowed" : "pointer",
                                transition: "all 0.2s",
                                opacity: deleting ? 0.5 : 1,
                            }}
                        >
                            {deleting ? (
                                <Spinner size={13} color={P.errText} />
                            ) : (
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                            )}
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};