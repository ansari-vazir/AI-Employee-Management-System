import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, Users } from "lucide-react";
import Card from "../components/ui/Card.jsx";
import Skeleton from "../components/ui/Skeleton.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import Button from "../components/ui/Button.jsx";
import EmployeeCard from "../components/directory/EmployeeCard.jsx";
import { EMPLOYEES, DEPARTMENTS, AVATAR_PALETTE } from "../data/employees.js";

export default function DirectoryPage() {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return EMPLOYEES.filter((e) => {
      const matchesQuery =
        !query ||
        e.name.toLowerCase().includes(query.toLowerCase()) ||
        e.position.toLowerCase().includes(query.toLowerCase()) ||
        e.email.toLowerCase().includes(query.toLowerCase());
      const matchesDept = dept === "All" || e.dept === dept;
      return matchesQuery && matchesDept;
    });
  }, [query, dept]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, role, or email…"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] pl-10 pr-3.5 py-2.5 text-sm outline-none focus:border-[var(--accent)]"
          />
        </div>
        <div className="relative sm:w-56">
          <select
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--surface)] pl-3.5 pr-9 py-2.5 text-sm outline-none focus:border-[var(--accent)]"
          >
            <option>All</option>
            {DEPARTMENTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none" />
        </div>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-3 w-full mb-2" />
              <Skeleton className="h-3 w-3/4" />
            </Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <EmptyState
            icon={Users}
            title="No one matches that search"
            desc="Try a different name, role, or department filter."
            action={
              <Button
                size="sm"
                variant="ghost"
                className="mt-4"
                onClick={() => {
                  setQuery("");
                  setDept("All");
                }}
              >
                Clear filters
              </Button>
            }
          />
        </Card>
      ) : (
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((emp, i) => (
            <EmployeeCard key={emp.id} emp={emp} color={AVATAR_PALETTE[i % AVATAR_PALETTE.length]} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
