import React from "react";
import { P } from "../lib/palette";

interface StatCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    delay?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
    label,
    value,
    icon,
    delay = "0s",
}) => (
    <div
        style={{
            background: P.surface,
            border: `1px solid ${P.border}`,
            borderRadius: "14px",
            padding: "16px 18px",
            animation: `scaleIn 0.4s ease-out both`,
            animationDelay: delay,
            position: "relative",
            overflow: "hidden",
        }}
    >
        <div
            style={{
                position: "absolute",
                top: "12px",
                right: "14px",
                opacity: 0.08,
            }}
        >
            {icon}
        </div>
        <p
            style={{
                fontSize: "11px",
                color: P.muted,
                textTransform: "uppercase",
                letterSpacing: "1.2px",
                fontWeight: 600,
                margin: 0,
            }}
        >
            {label}
        </p>
        <p
            style={{
                fontSize: "26px",
                fontWeight: 800,
                color: P.text,
                margin: "4px 0 0",
                letterSpacing: "-1px",
            }}
        >
            {value}
        </p>
    </div>
);