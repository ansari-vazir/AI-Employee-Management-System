import React from "react";

export default function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-lg bg-[var(--surface-2)] ${className}`} />;
}
