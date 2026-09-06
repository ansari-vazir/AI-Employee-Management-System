import React from "react";
import { Search } from "lucide-react";

export default function EmptyState({ icon: Icon = Search, title, desc, action }) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-6">
      <div className="w-14 h-14 rounded-2xl bg-[var(--surface-2)] flex items-center justify-center mb-4">
        <Icon size={24} className="text-[var(--muted)]" />
      </div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-[var(--muted)] text-sm max-w-sm">{desc}</p>
      {action}
    </div>
  );
}
