import React from "react";
import { useLocation } from "react-router-dom";
import { Menu, Bell, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

const PAGE_TITLES = {
  "/app/chat": ["Assistant", "Ask about anything work-related"],
  "/app/directory": ["Directory", "Find and reach your colleagues"],
  "/app/analytics": ["Analytics", "A snapshot of the org"],
  "/app/profile": ["Profile & settings", "Manage your account preferences"],
};

export default function Topbar({ onMenu }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [title, subtitle] = PAGE_TITLES[location.pathname] || ["", ""];

  return (
    <header className="h-16 border-b border-[var(--border)] flex items-center px-4 md:px-8 gap-4 sticky top-0 bg-[var(--bg)]/90 backdrop-blur z-20">
      <button onClick={onMenu} className="md:hidden p-2 -ml-2 rounded-lg hover:bg-[var(--surface-2)]">
        <Menu size={20} />
      </button>
      <div className="min-w-0">
        <h1 className="font-semibold leading-tight truncate">{title}</h1>
        <p className="text-xs text-[var(--muted)] truncate hidden sm:block">{subtitle}</p>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center hover:bg-[var(--surface-2)] transition-colors relative">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
        </button>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center hover:bg-[var(--surface-2)] transition-colors"
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>
    </header>
  );
}
