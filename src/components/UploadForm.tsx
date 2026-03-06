import React, { useState, useRef } from "react";
import { api } from "../api/client";
import { P } from "../lib/palette";
import { formatBytes } from "../lib/utils";
import { Spinner } from "./Spinner";

interface UploadFormProps {
    onSuccess: () => void;
}

export const UploadForm: React.FC<UploadFormProps> = ({ onSuccess }) => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [msg, setMsg] = useState<{
        type: "ok" | "err";
        text: string;
    } | null>(null);
    const [dragOver, setDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {
        if (!file) return setMsg({ type: "err", text: "Select a file first" });
        if (!title.trim()) return setMsg({ type: "err", text: "Enter a title" });

        setUploading(true);
        setMsg(null);
        setProgress(0);

        const interval = setInterval(
            () => setProgress((p) => Math.min(p + Math.random() * 15, 90)),
            200
        );

        try {
            await api.uploadResume(file, title.trim());
            setProgress(100);
            setTimeout(() => {
                setTitle("");
                setFile(null);
                if (inputRef.current) inputRef.current.value = "";
                setMsg({ type: "ok", text: "Uploaded successfully" });
                setTimeout(() => setMsg(null), 3000);
                onSuccess();
                setProgress(0);
            }, 400);
        } catch (err: any) {
            setMsg({
                type: "err",
                text: err?.response?.data?.detail || err?.message || "Upload failed",
            });
            setProgress(0);
        } finally {
            clearInterval(interval);
            setUploading(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const f = e.dataTransfer.files?.[0];
        if (f) setFile(f);
    };

    const clearFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFile(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div
            style={{
                background: P.surface,
                border: `1px solid ${P.border}`,
                borderRadius: "20px",
                overflow: "hidden",
                animation: "fadeUp 0.5s ease-out both",
                animationDelay: "0.15s",
                position: "relative",
            }}
        >
            {/* Progress bar */}
            {uploading && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: P.border,
                        zIndex: 5,
                    }}
                >
                    <div
                        style={{
                            height: "100%",
                            background: P.accent,
                            width: `${progress}%`,
                            transition: "width 0.3s ease",
                            borderRadius: "0 2px 2px 0",
                        }}
                    />
                </div>
            )}

            {/* Header bar */}
            <div
                style={{
                    padding: "18px 24px",
                    borderBottom: `1px solid ${P.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                        style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: P.accent,
                            color: P.bg,
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                    </div>
                    <div>
                        <h2
                            style={{
                                fontSize: "14px",
                                fontWeight: 700,
                                color: P.text,
                                margin: 0,
                            }}
                        >
                            Upload Resume
                        </h2>
                        <p
                            style={{ fontSize: "11px", color: P.muted, margin: 0 }}
                        >
                            Drag & drop or browse
                        </p>
                    </div>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                    {["PDF", "DOC", "DOCX"].map((t) => (
                        <span
                            key={t}
                            style={{
                                fontSize: "9px",
                                fontWeight: 700,
                                padding: "3px 7px",
                                borderRadius: "5px",
                                background: "rgba(255,255,255,0.04)",
                                border: `1px solid ${P.border}`,
                                color: P.muted,
                                letterSpacing: "0.5px",
                            }}
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            <div style={{ padding: "20px 24px" }}>
                {/* Drop zone */}
                <div
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                    style={{
                        borderRadius: "14px",
                        border: `2px dashed ${dragOver ? P.borderHover : file ? P.dim : P.border}`,
                        background: dragOver
                            ? "rgba(255,255,255,0.02)"
                            : "transparent",
                        padding: file ? "16px" : "32px 16px",
                        textAlign: "center",
                        cursor: "pointer",
                        transition: "all 0.25s",
                        marginBottom: "16px",
                    }}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        style={{ display: "none" }}
                        onChange={(e) => {
                            setFile(e.target.files?.[0] || null);
                            setMsg(null);
                        }}
                    />

                    {file ? (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "14px",
                            }}
                        >
                            <div
                                style={{
                                    width: "48px",
                                    height: "56px",
                                    borderRadius: "8px",
                                    background: "rgba(255,255,255,0.04)",
                                    border: `1px solid ${P.border}`,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
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
                                        fontSize: "7px",
                                        fontWeight: 800,
                                        color: P.muted,
                                        marginTop: "2px",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {file.name.split(".").pop()}
                                </span>
                            </div>
                            <div
                                style={{
                                    flex: 1,
                                    minWidth: 0,
                                    textAlign: "left",
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "13px",
                                        fontWeight: 600,
                                        color: P.text,
                                        margin: 0,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {file.name}
                                </p>
                                <p
                                    style={{
                                        fontSize: "11px",
                                        color: P.muted,
                                        margin: "2px 0 0",
                                    }}
                                >
                                    {formatBytes(file.size)}
                                </p>
                            </div>
                            <button
                                onClick={clearFile}
                                style={{
                                    width: "28px",
                                    height: "28px",
                                    borderRadius: "8px",
                                    border: `1px solid ${P.border}`,
                                    background: "transparent",
                                    color: P.muted,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                }}
                            >
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <>
                            <div
                                style={{
                                    width: "52px",
                                    height: "52px",
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,0.03)",
                                    border: `1px dashed ${P.dim}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto 12px",
                                    animation: "float 3s ease-in-out infinite",
                                }}
                            >
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke={P.muted}
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" y1="3" x2="12" y2="15" />
                                </svg>
                            </div>
                            <p
                                style={{ fontSize: "13px", color: P.sub, margin: 0 }}
                            >
                                Drop your resume here
                            </p>
                            <p
                                style={{
                                    fontSize: "11px",
                                    color: P.muted,
                                    margin: "4px 0 0",
                                }}
                            >
                                or{" "}
                                <span
                                    style={{
                                        color: P.accentSoft,
                                        fontWeight: 600,
                                        textDecoration: "underline",
                                        textUnderlineOffset: "2px",
                                    }}
                                >
                                    click to browse
                                </span>
                            </p>
                        </>
                    )}
                </div>

                {/* Title input + submit */}
                <div style={{ display: "flex", gap: "10px" }}>
                    <div style={{ flex: 1, position: "relative" }}>
                        <span
                            style={{
                                position: "absolute",
                                left: "12px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: P.dim,
                            }}
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="4" y1="9" x2="20" y2="9" />
                                <line x1="4" y1="15" x2="14" y2="15" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Resume title..."
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setMsg(null);
                            }}
                            style={{
                                width: "100%",
                                padding: "11px 12px 11px 34px",
                                borderRadius: "10px",
                                fontSize: "13px",
                                border: `1px solid ${P.border}`,
                                background: "rgba(255,255,255,0.02)",
                                color: P.text,
                                outline: "none",
                                transition: "border-color 0.2s",
                            }}
                            onFocus={(e) =>
                                (e.target.style.borderColor = P.borderHover)
                            }
                            onBlur={(e) =>
                                (e.target.style.borderColor = P.border)
                            }
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={uploading}
                        style={{
                            padding: "11px 24px",
                            borderRadius: "10px",
                            fontSize: "13px",
                            fontWeight: 700,
                            background: uploading ? P.dim : P.accent,
                            color: P.bg,
                            border: "none",
                            cursor: uploading ? "not-allowed" : "pointer",
                            transition: "all 0.2s",
                            display: "flex",
                            alignItems: "center",
                            gap: "7px",
                            whiteSpace: "nowrap",
                            opacity: uploading ? 0.5 : 1,
                            letterSpacing: "-0.2px",
                        }}
                    >
                        {uploading ? (
                            <>
                                <Spinner size={13} color={P.bg} /> Uploading...
                            </>
                        ) : (
                            <>
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" y1="3" x2="12" y2="15" />
                                </svg>
                                Upload
                            </>
                        )}
                    </button>
                </div>

                {/* Feedback message */}
                {msg && (
                    <div
                        style={{
                            marginTop: "12px",
                            padding: "10px 14px",
                            borderRadius: "10px",
                            fontSize: "12px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            animation: "fadeUp 0.25s ease-out",
                            background:
                                msg.type === "ok" ? P.okBg : P.errBg,
                            border: `1px solid ${msg.type === "ok" ? P.okBorder : P.errBorder}`,
                            color:
                                msg.type === "ok" ? P.okText : P.errText,
                        }}
                    >
                        {msg.type === "ok" ? (
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
                                <path d="M20 6L9 17l-5-5" />
                            </svg>
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
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                        )}
                        {msg.text}
                    </div>
                )}
            </div>
        </div>
    );
};