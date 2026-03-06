import React from "react";
import { P } from "../lib/palette";

export const GlobalStyles: React.FC = () => (
    <style>{`
    * { box-sizing: border-box; }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideRight { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    @keyframes shimmer { 0% { background-position: -300% 0; } 100% { background-position: 300% 0; } }
    @keyframes pulse { 0%, 100% { opacity: .4; } 50% { opacity: 1; } }
    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    @keyframes grain {
      0%, 100% { transform: translate(0, 0); }
      25% { transform: translate(-2%, -1%); }
      50% { transform: translate(1%, 2%); }
      75% { transform: translate(-1%, -2%); }
    }
    .hoverable { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
    .hoverable:hover { transform: translateY(-2px); }
    input::placeholder { color: ${P.muted}; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${P.border}; border-radius: 4px; }
  `}</style>
);

export const Atmosphere: React.FC = () => (
    <div
        style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            overflow: "hidden",
        }}
    >
        {/* Noise grain */}
        <div
            style={{
                position: "absolute",
                inset: 0,
                opacity: 0.025,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                animation: "grain 6s steps(8) infinite",
            }}
        />

        {/* Glow orbs */}
        <div
            style={{
                position: "absolute",
                top: "-30%",
                left: "10%",
                width: "700px",
                height: "700px",
                borderRadius: "50%",
                background:
                    "radial-gradient(circle, rgba(255,255,255,0.018) 0%, transparent 65%)",
            }}
        />
        <div
            style={{
                position: "absolute",
                bottom: "-20%",
                right: "5%",
                width: "500px",
                height: "500px",
                borderRadius: "50%",
                background:
                    "radial-gradient(circle, rgba(255,255,255,0.012) 0%, transparent 60%)",
            }}
        />

        {/* Grid lines */}
        <div
            style={{
                position: "absolute",
                inset: 0,
                opacity: 0.02,
                backgroundImage: `linear-gradient(${P.borderLight} 1px, transparent 1px), linear-gradient(90deg, ${P.borderLight} 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
            }}
        />
    </div>
);