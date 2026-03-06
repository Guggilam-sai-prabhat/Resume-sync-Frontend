import React from "react";
import { useResumes } from "./hooks/useResumes";
import { P } from "./lib/palette";
import { formatBytes, formatRelativeDate } from "./lib/utils";
import { GlobalStyles, Atmosphere } from "./components/Atmosphere";
import { StatCard } from "./components/StatCard";
import { UploadForm } from "./components/UploadForm";
import { ResumeList } from "./components/ResumeList";

const App: React.FC = () => {
  const { resumes, loading, error, refetch } = useResumes();
  const totalSize = resumes.reduce((a, r) => a + r.size, 0);

  const latestDate = resumes.length
    ? formatRelativeDate(
      [...resumes].sort(
        (a, b) =>
          new Date(b.updated_at).getTime() -
          new Date(a.updated_at).getTime()
      )[0].updated_at
    )
    : "—";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: P.bg,
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: P.text,
      }}
    >
      <GlobalStyles />
      <Atmosphere />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ── Header ── */}
        <header
          style={{
            borderBottom: `1px solid ${P.border}`,
            animation: "fadeUp 0.35s ease-out",
          }}
        >
          <div
            style={{
              maxWidth: "780px",
              margin: "0 auto",
              padding: "28px 24px 20px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "6px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: P.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={P.bg}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="16 3 21 3 21 8" />
                    <line x1="4" y1="20" x2="21" y2="3" />
                  </svg>
                </div>
                <h1
                  style={{
                    fontSize: "20px",
                    fontWeight: 900,
                    margin: 0,
                    letterSpacing: "-0.6px",
                  }}
                >
                  <span style={{ color: P.sub }}>Resume</span>
                  <span style={{ color: P.accent }}>Sync</span>
                </h1>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: P.muted,
                  margin: 0,
                  paddingLeft: "42px",
                }}
              >
                Manage & synchronize your resumes
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 12px",
                  borderRadius: "8px",
                  border: `1px solid ${P.border}`,
                  fontSize: "11px",
                  color: P.muted,
                }}
              >
                <span
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: P.okText,
                    animation: "pulse 2s infinite",
                  }}
                />
                Connected
              </div>
              <button
                onClick={refetch}
                disabled={loading}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  border: `1px solid ${P.border}`,
                  background: "transparent",
                  color: P.muted,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                  opacity: loading ? 0.4 : 1,
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
                  className={loading ? "animate-spin" : ""}
                >
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* ── Main content ── */}
        <main
          style={{
            maxWidth: "780px",
            margin: "0 auto",
            padding: "24px 24px 60px",
          }}
        >
          {/* Stats row */}
          {!loading && !error && resumes.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
                marginBottom: "24px",
              }}
            >
              <StatCard
                label="Total"
                value={resumes.length}
                delay="0.05s"
                icon={
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={P.accent}
                    strokeWidth="1.2"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                }
              />
              <StatCard
                label="Storage"
                value={formatBytes(totalSize)}
                delay="0.1s"
                icon={
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={P.accent}
                    strokeWidth="1.2"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="8"
                      rx="2"
                      ry="2"
                    />
                    <rect
                      x="2"
                      y="14"
                      width="20"
                      height="8"
                      rx="2"
                      ry="2"
                    />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                  </svg>
                }
              />
              <StatCard
                label="Latest"
                value={latestDate}
                delay="0.15s"
                icon={
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={P.accent}
                    strokeWidth="1.2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                }
              />
            </div>
          )}

          {/* Upload section */}
          <div style={{ marginBottom: "28px" }}>
            <UploadForm onSuccess={refetch} />
          </div>

          {/* Resume list section */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "14px",
                padding: "0 2px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <h2
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: P.muted,
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    margin: 0,
                  }}
                >
                  Resumes
                </h2>
                {!loading && (
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "6px",
                      background: "rgba(255,255,255,0.06)",
                      border: `1px solid ${P.border}`,
                      color: P.sub,
                    }}
                  >
                    {resumes.length} files
                  </span>
                )}
              </div>
              <p
                style={{
                  fontSize: "10px",
                  color: P.dim,
                  margin: 0,
                }}
              >
                Click to expand
              </p>
            </div>
            <ResumeList
              resumes={resumes}
              loading={loading}
              error={error}
              onDelete={refetch}
              onRetry={refetch}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;