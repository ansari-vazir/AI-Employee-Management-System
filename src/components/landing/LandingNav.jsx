import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";
import Button from "../ui/Button.jsx";

export default function LandingNav() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-[var(--bg)]/80 border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
            <Sparkles size={16} className="text-[var(--accent)]" />
          </div>
          <span style={{ fontFamily: "Fraunces, serif" }}>Social Wavez Assistant</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--muted)]">
          <a href="#capabilities" className="hover:text-[var(--ink)] transition-colors">
            Capabilities
          </a>
          <a href="#features" className="hover:text-[var(--ink)] transition-colors">
            Features
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center hover:bg-[var(--surface-2)] transition-colors"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <Button size="sm" onClick={() => navigate("/app/chat")}>
            Open assistant
          </Button>
        </div>
      </div>
    </header>
  );
}
