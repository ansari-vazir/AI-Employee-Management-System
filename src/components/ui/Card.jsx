import React from "react";

export default function Card({ children, className = "", accent = false }) {
  return (
    <div
      className={`bg-[var(--surface)] border border-[var(--border)] rounded-2xl ${accent ? "border-t-2 border-t-[var(--accent)]" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
