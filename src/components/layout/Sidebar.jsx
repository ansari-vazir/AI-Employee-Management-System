import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Sparkles, X, MessageSquare, Users, BarChart3, Settings } from "lucide-react";

export const NAV_ITEMS = [
  { to: "/app/chat", label: "Assistant", icon: MessageSquare },
  { to: "/app/directory", label: "Directory", icon: Users },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/profile", label: "Profile", icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>
      <motion.aside
        className={`fixed md:sticky top-0 z-50 md:z-0 h-screen w-64 bg-[var(--primary)] text-[var(--primary-ink)] flex flex-col shrink-0 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center gap-2 px-5 h-16 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <Sparkles size={16} className="text-[var(--accent)]" />
          </div>
          <span style={{ fontFamily: "Fraunces, serif" }} className="font-medium">
            Social Wavez
          </span>
          <button type="button" onClick={onClose} className="ml-auto md:hidden p-1" aria-label="Close navigation">
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-colors ${
                  isActive ? "bg-white/12 text-white font-medium" : "text-white/65 hover:bg-white/8 hover:text-white"
                }`
              }
            >
              <item.icon size={17} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-5 py-5 border-t border-white/10 text-xs text-white/50">
          <NavLink to="/" className="hover:text-white/80 transition-colors">
            ← Back to landing page
          </NavLink>
        </div>
      </motion.aside>
    </>
  );
}
