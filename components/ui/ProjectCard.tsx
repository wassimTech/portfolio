"use client";

import React from "react";
import { Project } from "@/types/cv";
import { useI18n } from "@/context/I18nContext";
import { ExternalLink, Users, Calendar, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { ProjectBanner } from "@/components/ui/ProjectBanner";

interface ProjectCardProps {
  project: Project;
  onSelectProject: (project: Project) => void;
}

export function ProjectCard({ project, onSelectProject }: ProjectCardProps) {
  const { locale, t } = useI18n();

  const role = project.role[locale] || project.role.fr;
  const description = project.description[locale] || project.description.fr;

  const categoryLabel =
    {
      fullstack: t("sections.fullstackProjects"),
      mobile: t("sections.mobileProjects"),
      frontend: t("sections.frontendProjects"),
    }[project.category] || project.category;

  // Display top 4 technologies on the card for a clean badge cloud
  const MAX_TAGS_ON_CARD = 4;
  const displayedTechs = project.technologies.slice(0, MAX_TAGS_ON_CARD);
  const extraTechCount = project.technologies.length - MAX_TAGS_ON_CARD;

  const newTabNotice =
    (locale as string) === "fr"
      ? "nouvel onglet"
      : (locale as string) === "ar"
        ? "يفتح في نافذة جديدة"
        : "opens in new tab";

  return (
    <article className="glass-panel p-5 sm:p-6 rounded-3xl border border-border hover:border-primary/50 transition-all duration-300 flex flex-col justify-between space-y-4 group h-full hover:shadow-xl hover:shadow-primary/5">
      {/* Top Banner Graphic & Meta */}
      <div className="space-y-3.5">
        <div className="w-full">
          <ProjectBanner projectId={project.id} />
        </div>

        {/* Category & Period */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          <span className="px-2.5 py-1 rounded-md bg-accent border border-primary/25 text-accent-foreground dark:bg-primary/15 dark:text-primary text-xs font-bold uppercase tracking-wider">
            {categoryLabel}
          </span>
          <span className="shrink-0 px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-semibold flex items-center gap-1.5 border border-border">
            <Calendar className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            <span>{project.period}</span>
          </span>
        </div>

        {/* Title & Role */}
        <div className="space-y-1 text-start">
          <h3 className="text-lg sm:text-xl font-extrabold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-xs font-bold text-primary">{role}</p>
        </div>

        {/* Concise Description */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-start line-clamp-2">
          {description}
        </p>
      </div>

      {/* Tech Stack Preview - Semantic List */}
      <div className="pt-2">
        <ul
          className="flex flex-wrap gap-1.5 list-none p-0 m-0"
          aria-label={t("sections.techStack")}
        >
          {displayedTechs.map((tech) => (
            <li
              key={tech}
              className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs font-semibold border border-border"
            >
              {tech}
            </li>
          ))}
          {extraTechCount > 0 && (
            <li
              className="px-1.5 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs font-bold border border-border"
              aria-label={`+${extraTechCount} ${
                (locale as string) === "fr"
                  ? "autres technologies"
                  : (locale as string) === "ar"
                    ? "تقنية إضافية"
                    : "more technologies"
              }`}
            >
              <span aria-hidden="true">+{extraTechCount}</span>
            </li>
          )}
        </ul>
      </div>

      {/* Footer: Team & Action Controls */}
      <div className="space-y-3 pt-3 border-t border-border mt-auto">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 truncate max-w-[180px]">
            <Users
              className="w-3.5 h-3.5 text-primary shrink-0"
              aria-hidden="true"
            />
            <span className="truncate text-start">{project.team}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("sections.viewOnGithub")} : ${project.title} (${newTabNotice})`}
                className="p-2 min-w-[34px] min-h-[34px] flex items-center justify-center rounded-lg bg-muted text-foreground hover:bg-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <GithubIcon className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("sections.liveDemo")} : ${project.title} (${newTabNotice})`}
                className="p-2 min-w-[34px] min-h-[34px] flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        {/* Primary Card CTA: Open Deep Dive Modal */}
        <button
          type="button"
          onClick={() => onSelectProject(project)}
          aria-haspopup="dialog"
          aria-label={`${t("sections.viewProjectDetails")} : ${project.title}`}
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-card border border-border text-foreground hover:bg-muted text-xs font-bold group-hover:border-primary/40 group-hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span>{t("sections.viewProjectDetails")}</span>
          <ArrowRight
            className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  );
}
