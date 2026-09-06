import React, { useState, useEffect } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Users, ShieldCheck, LayoutGrid } from "lucide-react";
import Card from "../components/ui/Card.jsx";
import Skeleton from "../components/ui/Skeleton.jsx";
import StatCard from "../components/analytics/StatCard.jsx";
import { EMPLOYEES, DEPARTMENTS } from "../data/employees.js";

const PIE_COLORS = ["#2F7566", "#C9782B", "#B84C3D"];

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const byDept = DEPARTMENTS.map((d) => ({ dept: d, count: EMPLOYEES.filter((e) => e.dept === d).length }));
  const active = EMPLOYEES.filter((e) => e.status === "active").length;
  const leave = EMPLOYEES.filter((e) => e.status === "leave").length;
  const inactive = EMPLOYEES.filter((e) => e.status === "inactive").length;
  const statusData = [
    { name: "Active", value: active },
    { name: "On leave", value: leave },
    { name: "Inactive", value: inactive },
  ];

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard label="Total employees" value={EMPLOYEES.length} icon={Users} tone="#24344D" />
        <StatCard label="Active employees" value={active} icon={ShieldCheck} tone="#2F7566" />
        <StatCard label="Departments" value={DEPARTMENTS.length} icon={LayoutGrid} tone="#C9782B" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="font-semibold mb-1">Headcount by department</h3>
          <p className="text-xs text-[var(--muted)] mb-4">Where the team currently sits</p>
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={byDept} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="dept" tick={{ fontSize: 11, fill: "var(--muted)" }} angle={-25} textAnchor="end" interval={0} height={60} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted)" }} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="count" fill="#2F7566" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold mb-1">Status distribution</h3>
          <p className="text-xs text-[var(--muted)] mb-4">Active, on leave, and inactive</p>
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
