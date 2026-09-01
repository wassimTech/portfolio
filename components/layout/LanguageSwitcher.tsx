"use client";

import React from "react";
import { useI18n } from "@/context/I18nContext";
import { Locale } from "@/types/cv";
import { Globe } from "lucide-react";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "en", label: "EN", flag: "🇬🇧" },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className="inline-flex items-center rounded-lg p-1 bg-muted border border-border"
      role="region"
      aria-label="Language selector"
    >
      <Globe
        className="w-4 h-4 text-muted-foreground ms-1 me-1"
        aria-hidden="true"
      />
      <div className="flex gap-1">
        {languages.map((lang) => {
          const isActive = locale === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLocale(lang.code)}
              aria-pressed={isActive}
              aria-label={`Switch language to ${lang.label}`}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              }`}
            >
              <span className="me-1">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
