"use client";

import React, { useState } from "react";
import { useI18n } from "@/context/I18nContext";
import { personalInfo } from "@/data/cv";
import { Mail, Phone, MapPin, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

export function ContactSection() {
  const { locale, t } = useI18n();
  const [copiedType, setCopiedType] = useState<"email" | "phone" | null>(null);

  const location = personalInfo.location[locale] || personalInfo.location.fr;

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 3000);
  };

  return (
    <section
      id="contact"
      className="py-20 relative bg-background border-t border-border"
      aria-label="Contact Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t("sections.contactTitle")}
          </h2>
          <p className="text-base text-muted-foreground">
            {t("sections.contactSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Email Card */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-border flex flex-col justify-between space-y-5 text-start hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Mail className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
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
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-muted text-xs font-bold transition-all border border-border/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-border flex flex-col justify-between space-y-5 text-start hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Phone className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
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
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-muted text-xs font-bold transition-all border border-border/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-border flex flex-col justify-between space-y-5 text-start hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <MapPin className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
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
                aria-label="LinkedIn Profile"
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
                  aria-label="GitHub Profile"
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
