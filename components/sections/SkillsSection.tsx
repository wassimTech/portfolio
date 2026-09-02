"use client";

import React, { useState, useMemo } from "react";
import { useI18n } from "@/context/I18nContext";
import { skillCategories } from "@/data/cv";
import { TechIcon } from "@/components/ui/TechIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import {
  Code2,
  Layers,
  Boxes,
  Database,
  GitBranch,
  Terminal,
} from "lucide-react";

export function SkillsSection() {
  const { locale, t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "languages-tech":
        return Code2;
      case "libraries":
        return Boxes;
      case "frameworks":
        return Layers;
      case "databases":
        return Database;
      case "collaboration":
        return GitBranch;
      default:
        return Terminal;
    }
  };

  const filteredCategories = useMemo(() => {
    return skillCategories.filter(
      (cat) => selectedCategory === "all" || cat.id === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <section
      id="skills"
      className="py-20 relative bg-background/50 border-t border-border"
      aria-label={t("sections.skillsTitle")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header with Code Bracket Style */}
        <SectionHeading
          title={t("sections.skillsTitle")}
          subtitle={t("sections.skillsSubtitle")}
        />

        {/* Centered Category Filter Buttons */}
        <div
          className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto w-full py-2 px-1 scrollbar-none"
          role="toolbar"
          aria-label={t("sections.skillsTitle")}
        >
          <button
            type="button"
            aria-pressed={selectedCategory === "all"}
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap cursor-pointer ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
            }`}
          >
            {t("skills.allCategories")}
          </button>
          {skillCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const catTitle = cat.title[locale] || cat.title.fr;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {catTitle}
              </button>
            );
          })}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {filteredCategories.map((category) => {
            const IconComponent = getCategoryIcon(category.id);
            const title = category.title[locale] || category.title.fr;
            const spanClass =
              category.skills.length >= 8 ? "lg:col-span-6" : "lg:col-span-4";
            const gridColsClass =
              category.skills.length >= 8 ? "grid-cols-4" : "grid-cols-3";

            return (
              <div
                key={category.id}
                className={`glass-panel p-6 sm:p-7 rounded-3xl border border-border hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 space-y-6 group flex flex-col justify-between ${spanClass}`}
              >
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary group-hover:scale-105 transition-transform duration-200">
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-extrabold text-lg sm:text-xl text-foreground">
                      {title}
                    </h3>
                  </div>
                  <Badge
                    variant="secondary"
                    shape="pill"
                    size="md"
                    className="font-bold"
                  >
                    {category.skills.length}
                  </Badge>
                </div>

                {/* Squircles Tech Grid */}
                <div
                  className={`grid ${gridColsClass} gap-3 sm:gap-3.5 flex-1 content-start`}
                  role="list"
                  aria-label={`${title} skills`}
                >
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      role="listitem"
                      className="flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl bg-card border border-border hover:border-primary/60 hover:bg-muted/50 hover:shadow-xs transition-all duration-200 group/item text-center space-y-2 cursor-default relative aspect-square"
                    >
                      <div className="w-8 h-8 flex items-center justify-center text-foreground group-hover/item:scale-110 transition-transform duration-200">
                        <TechIcon
                          name={skill.name}
                          className="w-7 h-7"
                          alt=""
                          ariaHidden={true}
                        />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground group-hover/item:text-foreground transition-colors truncate max-w-full">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
