"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`w-8 h-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center justify-center transition-all shadow-2xs cursor-pointer ${className}`}
      title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      aria-label="Toggle visual theme"
    >
      {theme === "dark" ? (
        <Sun size={15} className="text-amber-400 hover:rotate-45 transition-transform" />
      ) : (
        <Moon size={15} className="text-gray-600 hover:-rotate-12 transition-transform" />
      )}
    </button>
  );
}
