"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme, ColorTheme } from "@/context/ThemeContext";
import { useI18n } from "@/context/I18nContext";
import { Palette, Check } from "lucide-react";

interface ColorThemePickerProps {
  variant?: "dropdown" | "inline";
}

export function ColorThemePicker({
  variant = "dropdown",
}: ColorThemePickerProps) {
  const { colorTheme, setColorTheme, availableColorThemes } = useTheme();
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    if (variant === "inline") return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, variant]);

  const activeOption = availableColorThemes.find((c) => c.id === colorTheme);

  // Inline variant (for mobile drawer or sidebars)
  if (variant === "inline") {
    return (
      <div
        className="flex items-center gap-2 py-1"
        role="radiogroup"
        aria-label={t("theme.colorTheme")}
      >
        {availableColorThemes.map((option) => {
          const isActive = option.id === colorTheme;
          const label = t(`theme.${option.nameKey}`);

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={label}
              title={label}
              onClick={() => setColorTheme(option.id)}
              className="relative p-1 rounded-full transition-transform active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
            >
              <span
                className={`block w-6 h-6 rounded-full transition-all duration-200 border-2 ${
                  isActive
                    ? "scale-110 shadow-md ring-2 ring-foreground"
                    : "hover:scale-105 opacity-80 hover:opacity-100 border-border"
                }`}
                style={{ backgroundColor: option.colorHex }}
              >
                {isActive && (
                  <span className="flex items-center justify-center w-full h-full text-white">
                    <Check
                      className="w-3.5 h-3.5 stroke-[3]"
                      aria-hidden="true"
                    />
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // Dropdown variant (for header navbar)
  return (
    <div ref={containerRef} className="relative inline-block text-start">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t("theme.chooseColor")}
        title={t("theme.colorTheme")}
        className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-background border border-border transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
      >
        <Palette className="w-4 h-4 text-primary" aria-hidden="true" />
        {/* Active color circle pip */}
        <span
          className="w-2.5 h-2.5 rounded-full ring-1 ring-border shadow-xs"
          style={{
            backgroundColor: activeOption?.colorHex || "var(--primary)",
          }}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={t("theme.colorTheme")}
          className="absolute end-0 mt-2 w-52 p-2 rounded-2xl bg-card/95 backdrop-blur-xl border border-border shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1"
        >
          <div className="px-2.5 py-1.5 border-b border-border/70 mb-1">
            <p className="text-xs font-bold text-foreground">
              {t("theme.colorTheme")}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {t("theme.chooseColor")}
            </p>
          </div>

          {availableColorThemes.map((option) => {
            const isActive = option.id === colorTheme;
            const label = t(`theme.${option.nameKey}`);

            return (
              <button
                key={option.id}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  setColorTheme(option.id as ColorTheme);
                  setIsOpen(false);
                  triggerRef.current?.focus();
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-foreground hover:bg-muted"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-3.5 h-3.5 rounded-full border border-border/80 shrink-0 shadow-xs ${
                      isActive ? "scale-110" : ""
                    }`}
                    style={{ backgroundColor: option.colorHex }}
                    aria-hidden="true"
                  />
                  <span>{label}</span>
                </div>

                {isActive && (
                  <Check
                    className="w-4 h-4 text-primary shrink-0 stroke-[2.5]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
