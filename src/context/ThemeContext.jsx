import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { storageGet, storageSet } from "../lib/storage.js";

const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

export const THEME_TOKENS = {
  light: {
    "--bg": "#F5F6F8",
    "--surface": "#FFFFFF",
    "--surface-2": "#EFF1F4",
    "--ink": "#1A2130",
    "--muted": "#5B6472",
    "--border": "#E2E5EA",
    "--primary": "#24344D",
    "--primary-ink": "#FFFFFF",
    "--accent": "#C9782B",
    "--accent-soft": "#FBEBD8",
    "--accent-ink": "#241705",
    "--teal": "#2F7566",
    "--danger": "#B84C3D",
    "--danger-soft": "#FBE5E1",
  },
  dark: {
    "--bg": "#0B0E13",
    "--surface": "#141A21",
    "--surface-2": "#1B222B",
    "--ink": "#E7E9ED",
    "--muted": "#8A93A3",
    "--border": "#242C37",
    "--primary": "#18202C",
    "--primary-ink": "#F2F4F7",
    "--accent": "#E29A47",
    "--accent-soft": "#2C2110",
    "--accent-ink": "#FCEBD3",
    "--teal": "#4FA893",
    "--danger": "#E07361",
    "--danger-soft": "#2E1613",
  },
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => storageGet("prefs:theme", "light"));

  useEffect(() => {
    storageSet("prefs:theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  const tokens = THEME_TOKENS[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={tokens} className="min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
