"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  useCallback,
} from "react";

export type Theme = "dark" | "light";

export type ColorTheme =
  "orange" | "emerald" | "cyan" | "violet" | "rose" | "amber";

export interface ColorThemeOption {
  id: ColorTheme;
  nameKey: "orange" | "emerald" | "cyan" | "violet" | "rose" | "amber";
  colorHex: string;
  lightPrimary: string;
  darkPrimary: string;
}

export const COLOR_THEMES: ColorThemeOption[] = [
  {
    id: "orange",
    nameKey: "orange",
    colorHex: "#f97316",
    lightPrimary: "#f97316",
    darkPrimary: "#f97316",
  },
  {
    id: "emerald",
    nameKey: "emerald",
    colorHex: "#10b981",
    lightPrimary: "#10b981",
    darkPrimary: "#10b981",
  },
  {
    id: "cyan",
    nameKey: "cyan",
    colorHex: "#06b6d4",
    lightPrimary: "#06b6d4",
    darkPrimary: "#06b6d4",
  },
  {
    id: "violet",
    nameKey: "violet",
    colorHex: "#8b5cf6",
    lightPrimary: "#8b5cf6",
    darkPrimary: "#8b5cf6",
  },
  {
    id: "rose",
    nameKey: "rose",
    colorHex: "#f43f5e",
    lightPrimary: "#f43f5e",
    darkPrimary: "#f43f5e",
  },
  {
    id: "amber",
    nameKey: "amber",
    colorHex: "#f59e0b",
    lightPrimary: "#f59e0b",
    darkPrimary: "#f59e0b",
  },
];

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colorTheme: ColorTheme;
  setColorTheme: (color: ColorTheme) => void;
  availableColorThemes: ColorThemeOption[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeListeners = new Set<() => void>();

function notifyThemeListeners() {
  themeListeners.forEach((listener) => listener());
}

function subscribeTheme(callback: () => void) {
  themeListeners.add(callback);
  const handleStorage = (e: StorageEvent) => {
    if (e.key === "portfolio_theme" || e.key === "portfolio_color_theme") {
      callback();
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    themeListeners.delete(callback);
    window.removeEventListener("storage", handleStorage);
  };
}

function getThemeSnapshot(): Theme {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("portfolio_theme") as Theme;
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
  }
  return "dark";
}

function getThemeServerSnapshot(): Theme {
  return "dark";
}

function getColorThemeSnapshot(): ColorTheme {
  if (typeof window !== "undefined") {
    const savedColor = localStorage.getItem(
      "portfolio_color_theme"
    ) as ColorTheme;
    if (
      savedColor === "orange" ||
      savedColor === "emerald" ||
      savedColor === "cyan" ||
      savedColor === "violet" ||
      savedColor === "rose" ||
      savedColor === "amber"
    ) {
      return savedColor;
    }
  }
  return "orange";
}

function getColorThemeServerSnapshot(): ColorTheme {
  return "orange";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const colorTheme = useSyncExternalStore(
    subscribeTheme,
    getColorThemeSnapshot,
    getColorThemeServerSnapshot
  );

  const toggleTheme = useCallback(() => {
    const current = getThemeSnapshot();
    const nextTheme: Theme = current === "dark" ? "light" : "dark";
    localStorage.setItem("portfolio_theme", nextTheme);
    notifyThemeListeners();
  }, []);

  const setColorTheme = useCallback((nextColor: ColorTheme) => {
    localStorage.setItem("portfolio_color_theme", nextColor);
    notifyThemeListeners();
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    document.documentElement.setAttribute("data-color-theme", colorTheme);
  }, [theme, colorTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        colorTheme,
        setColorTheme,
        availableColorThemes: COLOR_THEMES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
