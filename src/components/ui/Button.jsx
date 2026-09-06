import React from "react";

export default function Button({ children, variant = "primary", size = "md", className = "", icon: Icon, iconRight, ...props }) {
  const sizes = { sm: "text-sm px-3 py-1.5 gap-1.5", md: "text-sm px-4 py-2.5 gap-2", lg: "text-base px-6 py-3.5 gap-2" };
  const variants = {
    primary: "bg-[var(--accent)] text-[var(--accent-ink)] hover:brightness-105 active:brightness-95 shadow-[0_1px_0_rgba(0,0,0,0.05)]",
    dark: "bg-[var(--primary)] text-[var(--primary-ink)] hover:brightness-110",
    ghost: "bg-transparent text-[var(--ink)] hover:bg-[var(--surface-2)] border border-[var(--border)]",
    subtle: "bg-[var(--surface-2)] text-[var(--ink)] hover:bg-[var(--border)]",
    danger: "bg-[var(--danger-soft)] text-[var(--danger)] hover:brightness-95",
  };
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && !iconRight && <Icon size={size === "lg" ? 18 : 16} />}
      {children}
      {Icon && iconRight && <Icon size={size === "lg" ? 18 : 16} />}
    </button>
  );
}
