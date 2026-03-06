import React from "react";
import { P } from "../lib/palette";

interface SpinnerProps {
    size?: number;
    color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
    size = 14,
    color = P.muted,
}) => (
    <svg
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
    >
        <circle
            style={{ opacity: 0.25 }}
            cx="12"
            cy="12"
            r="10"
            stroke={color}
            strokeWidth="4"
        />
        <path
            style={{ opacity: 0.75 }}
            fill={color}
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
    </svg>
);