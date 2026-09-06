import React from "react";
import Card from "../ui/Card.jsx";

export default function StatCard({ label, value, icon: Icon, tone }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-[var(--muted)]">{label}</p>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `color-mix(in srgb, ${tone} 15%, transparent)` }}
        >
          <Icon size={16} style={{ color: tone }} />
        </div>
      </div>
      <p className="text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif" }}>
        {value}
      </p>
    </Card>
  );
}
