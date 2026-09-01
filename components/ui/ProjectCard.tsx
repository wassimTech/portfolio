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

  const categoryLabel = {
    fullstack: locale === "fr" ? "Fullstack Web" : "Fullstack Web",
    mobile: locale === "fr" ? "Application Mobile" : "Mobile App",
    frontend: locale === "fr" ? "Frontend" : "Frontend",
  }[project.category];

  // Display top 4 technologies on the card for a clean badge cloud
  const MAX_TAGS_ON_CARD = 4;
  const displayedTechs = project.technologies.slice(0, MAX_TAGS_ON_CARD);
  const extraTechCount = project.technologies.length - MAX_TAGS_ON_CARD;

  return (
    <article className="glass-panel p-5 sm:p-6 rounded-3xl border border-border hover:border-primary/50 transition-all duration-300 flex flex-col justify-between space-y-4 group h-full hover:shadow-xl hover:shadow-primary/5">
      {/* Top Banner Graphic & Meta */}
      <div className="space-y-3.5">
        <button
          type="button"
          onClick={() => onSelectProject(project)}
          className="w-full text-start cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl overflow-hidden"
          aria-label={`${t("sections.viewProjectDetails")} - ${project.title}`}
        >
          <ProjectBanner projectId={project.id} />
        </button>

        {/* Category & Period */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          <span className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/25 text-primary text-[11px] font-bold uppercase tracking-wider">
            {categoryLabel}
          </span>
          <span className="shrink-0 px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-xs font-medium flex items-center gap-1">
            <Calendar className="w-3 h-3" aria-hidden="true" />
            <span>{project.period}</span>
          </span>
        </div>

        {/* Title & Role */}
        <div className="space-y-1 text-start">
          <h3 className="text-lg sm:text-xl font-extrabold text-foreground group-hover:text-primary transition-colors flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => onSelectProject(project)}
              className="text-start font-extrabold text-foreground group-hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              {project.title}
            </button>
          </h3>
          <p className="text-xs font-bold text-primary">{role}</p>
        </div>

        {/* Concise Description */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-start line-clamp-2">
          {description}
        </p>
      </div>

      {/* Tech Stack Preview */}
      <div className="pt-2">
        <div
          className="flex flex-wrap gap-1.5"
          aria-label={t("sections.techStack")}
        >
          {displayedTechs.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-[11px] font-medium border border-border/50"
            >
              {tech}
            </span>
          ))}
          {extraTechCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground text-[10px] font-semibold">
              +{extraTechCount}
            </span>
          )}
        </div>
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
                aria-label={`${t("sections.viewOnGithub")} for ${project.title}`}
                className="p-1.5 rounded-lg bg-muted text-foreground hover:bg-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <GithubIcon className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("sections.liveDemo")} for ${project.title}`}
                className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        {/* Primary Card CTA: Open Deep Dive Modal */}
        <button
          type="button"
          onClick={() => onSelectProject(project)}
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
