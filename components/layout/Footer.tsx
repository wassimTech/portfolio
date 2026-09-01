"use client";

import React from "react";
import { useI18n } from "@/context/I18nContext";
import { personalInfo } from "@/data/cv";

export function Footer() {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-8 bg-background border-t border-border"
      aria-label="Footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">
              {personalInfo.name}
            </span>
            <span>
              &copy; {currentYear} {t("footer.rights")}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-center">
            <span>{t("footer.builtWith")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
