"use client";

import React, { useState, useEffect, useRef } from "react";
import { useI18n } from "@/context/I18nContext";
import { personalInfo } from "@/data/cv";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Mail, Phone, MapPin, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

export function ContactSection() {
  const { locale, t } = useI18n();
  const [copiedType, setCopiedType] = useState<"email" | "phone" | null>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear pending copy-feedback timer on unmount to avoid setState on unmounted component
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const location = personalInfo.location[locale] || personalInfo.location.fr;
  const newTabNotice =
    (locale as string) === "fr"
      ? "nouvel onglet"
      : (locale as string) === "ar"
        ? "يفتح في نافذة جديدة"
        : "opens in new tab";

  const handleCopy = async (text: string, type: "email" | "phone") => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      }
      setCopiedType(type);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopiedType(null), 3000);
    } catch (err) {
      console.warn("Clipboard copy failed:", err);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 relative bg-background border-t border-border"
      aria-label={t("sections.contactTitle")}
    >
      {/* Screen reader live notification */}
      <div className="sr-only" role="status" aria-live="polite">
        {copiedType
          ? copiedType === "email"
            ? t("contact.emailCopied")
            : t("contact.phoneCopied")
          : ""}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header with Code Bracket Style */}
        <SectionHeading
          title={t("sections.contactTitle")}
          subtitle={t("sections.contactSubtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Email Card */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-border flex flex-col justify-between space-y-5 text-start hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3.5">
              <div className="p-3.5 rounded-2xl bg-primary/10 text-primary">
                <Mail className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground dark:text-foreground/70 uppercase tracking-wider">
                  {t("contact.emailLabel")}
                </p>
                <p className="text-sm font-bold text-foreground break-all">
                  {personalInfo.email}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(personalInfo.email, "email")}
              aria-label={t("contact.copyEmail")}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-muted text-xs font-bold transition-all border border-border/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
            >
              {copiedType === "email" ? (
                <>
                  <Check className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span className="text-primary">
                    {t("contact.emailCopied")}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>{t("contact.copyEmail")}</span>
                </>
              )}
            </button>
          </div>

          {/* Phone Card */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-border flex flex-col justify-between space-y-5 text-start hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3.5">
              <div className="p-3.5 rounded-2xl bg-primary/10 text-primary">
                <Phone className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground dark:text-foreground/70 uppercase tracking-wider">
                  {t("contact.phoneLabel")}
                </p>
                <p className="text-sm font-bold text-foreground">
                  {personalInfo.phone}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(personalInfo.phone, "phone")}
              aria-label={t("contact.copyPhone")}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-muted text-xs font-bold transition-all border border-border/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
            >
              {copiedType === "phone" ? (
                <>
                  <Check className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span className="text-primary">
                    {t("contact.phoneCopied")}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>{t("contact.copyPhone")}</span>
                </>
              )}
            </button>
          </div>

          {/* Location & Social Card */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-border flex flex-col justify-between space-y-5 text-start hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3.5">
              <div className="p-3.5 rounded-2xl bg-primary/10 text-primary">
                <MapPin className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground dark:text-foreground/70 uppercase tracking-wider">
                  {t("contact.locationLabel")}
                </p>
                <p className="text-sm font-bold text-foreground">{location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn (${newTabNotice})`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 text-xs font-bold transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-md shadow-primary/20"
              >
                <LinkedinIcon className="w-4 h-4" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
              {personalInfo.github && (
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub (${newTabNotice})`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-muted text-xs font-bold transition-colors border border-border/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <GithubIcon className="w-4 h-4" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
