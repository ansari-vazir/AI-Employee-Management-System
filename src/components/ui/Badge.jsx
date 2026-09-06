import React from "react";

const TONES = {
  neutral: "bg-[var(--surface-2)] text-[var(--muted)]",
  active: "bg-[color-mix(in_srgb,var(--teal)_15%,transparent)] text-[var(--teal)]",
  leave: "bg-[var(--accent-soft)] text-[var(--accent)]",
  inactive: "bg-[var(--danger-soft)] text-[var(--danger)]",
};

export default function Badge({ children, tone = "neutral" }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${TONES[tone]}`}>
      {children}
    </span>
  );
}
