"use client";

import React from "react";
import { useI18n } from "@/context/I18nContext";
import { Locale } from "@/types/cv";
import { Globe } from "lucide-react";
import { FlagIcon } from "@/components/ui/FlagIcon";

const languages: {
  code: Locale;
  label: string;
  fullName: string;
}[] = [
  { code: "fr", label: "FR", fullName: "Français" },
  { code: "en", label: "EN", fullName: "English" },
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
        className="w-4 h-4 text-muted-foreground ms-1 me-1.5 shrink-0"
        aria-hidden="true"
      />
      <div className="flex gap-1" role="group" aria-label="Available languages">
        {languages.map((lang) => {
          const isActive = locale === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLocale(lang.code)}
              aria-pressed={isActive}
              aria-label={`Switch language to ${lang.fullName}`}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/60"
              }`}
            >
              <FlagIcon
                country={lang.code}
                className="w-4 h-3 rounded-[2px] shadow-2xs shrink-0"
              />
              <span>{lang.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
