"use client";

import React, { useState } from "react";
import { useI18n } from "@/context/I18nContext";
import { experiences } from "@/data/cv";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GraduationCap, Briefcase, Calendar } from "lucide-react";

type QualificationTab = "education" | "work";

export function ExperienceSection() {
  const { locale, t } = useI18n();
  const [activeTab, setActiveTab] = useState<QualificationTab>("education");

  const educationList = experiences.filter((exp) => exp.type === "education");
  const workList = experiences.filter(
    (exp) => exp.type === "work" || exp.type === "instruction"
  );

  const activeList = activeTab === "education" ? educationList : workList;

  return (
    <section
      id="qualification"
      className="py-20 sm:py-24 relative bg-background/50 border-t border-border"
      aria-label={t("sections.qualificationTitle")}
    >
      <div id="experience" className="sr-only" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Code Bracket Style */}
        <SectionHeading
          title={t("sections.qualificationTitle")}
          subtitle={t("sections.qualificationSubtitle")}
        />

        {/* Qualification Tabs Switcher */}
        <div
          className="flex items-center justify-center gap-8 sm:gap-12 mb-12 sm:mb-16"
          role="tablist"
          aria-label="Qualification Tabs"
        >
          <button
            type="button"
            role="tab"
            id="tab-education"
            aria-selected={activeTab === "education"}
            aria-controls="panel-education"
            onClick={() => setActiveTab("education")}
            className={`inline-flex items-center gap-2.5 text-lg sm:text-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl px-4 py-2 cursor-pointer ${
              activeTab === "education"
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <GraduationCap
              className={`w-6 h-6 transition-transform duration-300 ${
                activeTab === "education"
                  ? "text-primary scale-110"
                  : "text-muted-foreground"
              }`}
              aria-hidden="true"
            />
            <span>{t("sections.educationTab")}</span>
          </button>

          <button
            type="button"
            role="tab"
            id="tab-work"
            aria-selected={activeTab === "work"}
            aria-controls="panel-work"
            onClick={() => setActiveTab("work")}
            className={`inline-flex items-center gap-2.5 text-lg sm:text-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl px-4 py-2 cursor-pointer ${
              activeTab === "work"
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Briefcase
              className={`w-6 h-6 transition-transform duration-300 ${
                activeTab === "work"
                  ? "text-primary scale-110"
                  : "text-muted-foreground"
              }`}
              aria-hidden="true"
            />
            <span>{t("sections.workTab")}</span>
          </button>
        </div>

        {/* Alternating Vertical Timeline matching hamila.uk */}
        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="relative max-w-2xl mx-auto"
        >
          <div className="space-y-0">
            {activeList.map((item, index) => {
              const isEven = index % 2 === 0;
              const isLast = index === activeList.length - 1;
              const roleTitle = item.role[locale] || item.role.fr;

              const contentBlock = (
                <div className="space-y-1 sm:space-y-1.5 pb-8 sm:pb-10 text-start group">
                  <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                    {roleTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground dark:text-foreground/70 font-normal">
                    {item.company}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground dark:text-foreground/65 font-normal pt-1">
                    <Calendar
                      className="w-3.5 h-3.5 text-muted-foreground/80 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item.period}</span>
                  </div>
                </div>
              );

              const centerNode = (
                <div className="flex flex-col items-center h-full">
                  {/* Glowing Rounder Marker */}
                  <span
                    className="w-3.5 h-3.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)] ring-2 ring-background z-10 shrink-0 block transition-transform duration-300 hover:scale-125"
                    aria-hidden="true"
                  />
                  {/* Continuous Vertical Line */}
                  {!isLast && (
                    <span
                      className="w-[1px] bg-primary flex-1 min-h-[5rem] sm:min-h-[6rem] block"
                      aria-hidden="true"
                    />
                  )}
                </div>
              );

              return (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_max-content_1fr] gap-x-4 sm:gap-x-8 items-start"
                >
                  {/* Left Column */}
                  {isEven ? contentBlock : <div aria-hidden="true" />}

                  {/* Center Column (Rounder + Line) */}
                  {centerNode}

                  {/* Right Column */}
                  {!isEven ? contentBlock : <div aria-hidden="true" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
