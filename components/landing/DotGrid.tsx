"use client";

import { JSX } from "react";

type DotGridProps = {
  className?: string;
  dark?: boolean;
  interactive?: boolean; // kept for backward compatibility
  fadeBottom?: boolean;
};

export default function DotGrid({
  className = "",
  dark = false,
  fadeBottom = false,
}: DotGridProps): JSX.Element {
  const baseColor = dark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.20)";

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle, ${baseColor} 1px, transparent 1px)`,
        backgroundSize: "24px 24px",

        ...(fadeBottom && {
          maskImage:
            "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
        }),
      }}
    />
  );
}
