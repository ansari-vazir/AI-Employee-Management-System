import React from "react";

export default function TextField({ label, ...props }) {
  return (
    <label className="block">
      {label && <span className="block text-sm font-medium mb-1.5">{label}</span>}
      <input
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--muted)]"
        {...props}
      />
    </label>
  );
}
