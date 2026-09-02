"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  useCallback,
} from "react";
import { Locale } from "@/types/cv";
import frMessages from "@/messages/fr.json";
import enMessages from "@/messages/en.json";

const dictionaries: Record<Locale, typeof frMessages> = {
  fr: frMessages,
  en: enMessages,
};

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  const handleStorage = (e: StorageEvent) => {
    if (e.key === "portfolio_locale") {
      callback();
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", handleStorage);
  };
}

function getSnapshot(): Locale {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("portfolio_locale") as Locale;
    if (saved && (saved === "fr" || saved === "en")) {
      return saved;
    }
  }
  return "fr";
}

function getServerSnapshot(): Locale {
  return "fr";
}

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: "ltr" | "rtl";
  t: (keyPath: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setLocale = useCallback((newLocale: Locale) => {
    localStorage.setItem("portfolio_locale", newLocale);
    listeners.forEach((listener) => listener());
  }, []);

  // Derive text direction from locale — ready for Arabic (RTL) when locale is extended
  const dir: "ltr" | "rtl" = (locale as string) === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const t = useCallback(
    (keyPath: string): string => {
      const keys = keyPath.split(".");
      let current: unknown = dictionaries[locale] || dictionaries.fr;

      for (const key of keys) {
        if (
          current &&
          typeof current === "object" &&
          key in (current as Record<string, unknown>)
        ) {
          current = (current as Record<string, unknown>)[key];
        } else {
          // Fallback to FR
          let fallback: unknown = dictionaries.fr;
          for (const fk of keys) {
            if (
              fallback &&
              typeof fallback === "object" &&
              fk in (fallback as Record<string, unknown>)
            ) {
              fallback = (fallback as Record<string, unknown>)[fk];
            } else {
              return keyPath;
            }
          }
          return typeof fallback === "string" ? fallback : keyPath;
        }
      }
      return typeof current === "string" ? current : keyPath;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, dir, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
