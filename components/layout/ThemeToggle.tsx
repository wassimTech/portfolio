"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"
      }
      className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-background border border-border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-primary" aria-hidden="true" />
      ) : (
        <Moon className="w-4 h-4 text-foreground" aria-hidden="true" />
      )}
    </button>
  );
}
