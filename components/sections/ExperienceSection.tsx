"use client";

import React from "react";
import { useI18n } from "@/context/I18nContext";
import { experiences } from "@/data/cv";
import { Briefcase, GraduationCap, BookOpen, Calendar } from "lucide-react";

export function ExperienceSection() {
  const { locale, t } = useI18n();

  const getIcon = (type: string) => {
    switch (type) {
      case "work":
        return Briefcase;
      case "education":
        return GraduationCap;
      case "instruction":
        return BookOpen;
      default:
        return Briefcase;
    }
  };

  return (
    <section
      id="experience"
      className="py-20 relative bg-background border-t border-border"
      aria-label="Experience Timeline Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t("sections.experienceTitle")}
          </h2>
          <p className="text-base text-muted-foreground">
            {t("sections.experienceSubtitle")}
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div
            className="absolute start-4 sm:start-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const IconComponent = getIcon(exp.type);
              const isEven = index % 2 === 0;

              const role = exp.role[locale] || exp.role.fr;
              const description = exp.description
                ? exp.description[locale] || exp.description.fr
                : "";

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute start-4 sm:start-1/2 top-0 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 ring-4 ring-background z-10">
                    <IconComponent className="w-4 h-4" aria-hidden="true" />
                  </div>

                  {/* Timeline Card */}
                  <div className="ms-12 sm:ms-0 sm:w-1/2 sm:px-8 w-full">
                    <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-border hover:border-primary/50 transition-all text-start space-y-3.5 group">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                        <span className="text-xs font-bold text-primary">
                          {exp.company}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-secondary-foreground font-semibold bg-secondary px-2.5 py-1 rounded-md border border-border/50">
                          <Calendar
                            className="w-3.5 h-3.5 text-primary"
                            aria-hidden="true"
                          />
                          <span>{exp.period}</span>
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {role}
                      </h3>

                      {description && (
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {description}
                        </p>
                      )}

                      {exp.technologies && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium border border-border/50"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
