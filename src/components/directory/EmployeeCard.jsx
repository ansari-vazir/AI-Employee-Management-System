import React from "react";
import { Building2, Mail } from "lucide-react";
import Card from "../ui/Card.jsx";
import Badge from "../ui/Badge.jsx";
import Avatar from "../ui/Avatar.jsx";

const TONE_MAP = { active: "active", leave: "leave", inactive: "inactive" };
const STATUS_LABEL = { active: "Active", leave: "On leave", inactive: "Inactive" };

export default function EmployeeCard({ emp, color }) {
  return (
    <Card className="p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start gap-3 mb-4">
        <Avatar name={emp.name} color={color} />
        <div className="min-w-0">
          <h3 className="font-semibold text-sm truncate">{emp.name}</h3>
          <p className="text-xs text-[var(--muted)] truncate">{emp.position}</p>
        </div>
        <Badge tone={TONE_MAP[emp.status]}>{STATUS_LABEL[emp.status]}</Badge>
      </div>
      <div className="space-y-1.5 text-xs text-[var(--muted)]">
        <div className="flex items-center gap-2">
          <Building2 size={13} /> {emp.dept}
        </div>
        <div className="flex items-center gap-2 truncate">
          <Mail size={13} className="shrink-0" /> <span className="truncate">{emp.email}</span>
        </div>
      </div>
    </Card>
  );
}
