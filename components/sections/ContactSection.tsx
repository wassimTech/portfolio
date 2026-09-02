"use client";

import React, { useState, useEffect, useRef } from "react";
import { useI18n } from "@/context/I18nContext";
import { personalInfo } from "@/data/cv";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactCard } from "@/components/ui/ContactCard";
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
    } catch (err) {
      console.warn("Clipboard copy failed:", err);
    } finally {
      setCopiedType(type);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopiedType(null), 3000);
    }
  };

  const primaryBtnClass =
    "flex-1 inline-flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm shadow-md shadow-primary/20 hover:opacity-95 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] transition-all border border-primary/40 dark:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const secondaryBtnClass =
    "flex-1 inline-flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-secondary/90 hover:bg-muted dark:bg-zinc-800 dark:hover:bg-zinc-700 text-secondary-foreground dark:text-zinc-100 font-bold text-xs sm:text-sm transition-all border border-border dark:border-zinc-500/70 dark:hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer";
  const copiedBtnClass =
    "flex-1 inline-flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-primary/15 dark:bg-primary/25 text-primary dark:text-primary-foreground font-extrabold text-xs sm:text-sm transition-all border border-primary/50 dark:border-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer";

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
          <ContactCard
            icon={Mail}
            label={t("contact.emailLabel")}
            value={personalInfo.email}
          >
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label={`${t("contact.sendEmail")} (${personalInfo.email})`}
              className={primaryBtnClass}
            >
              <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t("contact.sendEmail")}</span>
            </a>
            <button
              type="button"
              onClick={() => handleCopy(personalInfo.email, "email")}
              aria-label={t("contact.copyEmail")}
              className={
                copiedType === "email" ? copiedBtnClass : secondaryBtnClass
              }
            >
              {copiedType === "email" ? (
                <>
                  <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{t("contact.copied")}</span>
                </>
              ) : (
                <>
                  <Copy
                    className="w-4 h-4 text-primary shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t("contact.copy")}</span>
                </>
              )}
            </button>
          </ContactCard>

          {/* Phone Card */}
          <ContactCard
            icon={Phone}
            label={t("contact.phoneLabel")}
            value={personalInfo.phone}
          >
            <a
              href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
              aria-label={`${t("contact.callPhone")} (${personalInfo.phone})`}
              className={primaryBtnClass}
            >
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t("contact.callPhone")}</span>
            </a>
            <button
              type="button"
              onClick={() => handleCopy(personalInfo.phone, "phone")}
              aria-label={t("contact.copyPhone")}
              className={
                copiedType === "phone" ? copiedBtnClass : secondaryBtnClass
              }
            >
              {copiedType === "phone" ? (
                <>
                  <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{t("contact.copied")}</span>
                </>
              ) : (
                <>
                  <Copy
                    className="w-4 h-4 text-primary shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t("contact.copy")}</span>
                </>
              )}
            </button>
          </ContactCard>

          {/* Location & Social Card */}
          <ContactCard
            icon={MapPin}
            label={t("contact.locationLabel")}
            value={location}
          >
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn (${newTabNotice})`}
              className={primaryBtnClass}
            >
              <LinkedinIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
            {personalInfo.github && (
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub (${newTabNotice})`}
                className={secondaryBtnClass}
              >
                <GithubIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>GitHub</span>
              </a>
            )}
          </ContactCard>
        </div>
      </div>
    </section>
  );
}
