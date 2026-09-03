"use client";

import React from "react";
import { Project } from "@/types/cv";
import { useI18n } from "@/context/I18nContext";
import {
  ExternalLink,
  Users,
  Calendar,
  ArrowRight,
  Globe,
  Play,
  Award,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { ProjectBanner } from "@/components/ui/ProjectBanner";
import { Badge } from "@/components/ui/Badge";

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
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge
              variant="accent"
              size="md"
              className="uppercase tracking-wider font-bold"
            >
              {categoryLabel}
            </Badge>
            {project.testimonial && (
              <Badge
                variant="accent"
                size="sm"
                className="font-bold shrink-0 shadow-2xs text-xs"
              >
                <Award
                  className="w-3.5 h-3.5 text-accent-foreground shrink-0"
                  aria-hidden="true"
                />
                <span>{t("sections.clientReview")}</span>
              </Badge>
            )}
          </div>
          <Badge variant="secondary" size="md" className="shrink-0">
            <Calendar
              className="w-3.5 h-3.5 text-primary dark:text-accent-foreground shrink-0"
              aria-hidden="true"
            />
            <span>{project.period}</span>
          </Badge>
        </div>

        {/* Title & Role */}
        <div className="space-y-1 text-start">
          <h3 className="text-lg sm:text-xl font-extrabold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-xs font-bold text-accent-foreground">{role}</p>
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
            <li key={tech}>
              <Badge variant="secondary" size="sm">
                {tech}
              </Badge>
            </li>
          ))}
          {extraTechCount > 0 && (
            <li>
              <Badge variant="secondary" size="sm" className="font-bold px-1.5">
                <span className="sr-only">
                  {`+${extraTechCount} ${
                    (locale as string) === "fr"
                      ? "autres technologies"
                      : (locale as string) === "ar"
                        ? "تقنية إضافية"
                        : "more technologies"
                  }`}
                </span>
                <span aria-hidden="true">+{extraTechCount}</span>
              </Badge>
            </li>
          )}
        </ul>
      </div>

      {/* Footer: Team & Action Controls */}
      <div className="space-y-3 pt-3 border-t border-border mt-auto">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 truncate max-w-[180px]">
            <Users
              className="w-3.5 h-3.5 text-primary dark:text-accent-foreground shrink-0"
              aria-hidden="true"
            />
            <span className="truncate text-start">{project.team}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={t("sections.viewOnGithub")}
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
                title={t("sections.liveDemo")}
                aria-label={`${t("sections.liveDemo")} : ${project.title} (${newTabNotice})`}
                className="p-2 min-w-[34px] min-h-[34px] flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
            {project.websiteUrl && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={t("sections.viewWebsite")}
                aria-label={`${t("sections.viewWebsite")} : ${project.title} (${newTabNotice})`}
                className="p-2 min-w-[34px] min-h-[34px] flex items-center justify-center rounded-lg bg-muted text-foreground hover:bg-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Globe className="w-4 h-4 text-primary" aria-hidden="true" />
              </a>
            )}
            {project.videoUrl && (
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={t("sections.viewVideoDemo")}
                aria-label={`${t("sections.viewVideoDemo")} : ${project.title} (${newTabNotice})`}
                className="p-2 min-w-[34px] min-h-[34px] flex items-center justify-center rounded-lg bg-gradient-to-tr from-pink-500/10 to-purple-500/10 text-pink-500 hover:from-pink-500/20 hover:to-purple-500/20 transition-all border border-pink-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Play
                  className="w-4 h-4 fill-pink-500 text-pink-500"
                  aria-hidden="true"
                />
              </a>
            )}
            {project.testimonial && (
              <a
                href={project.testimonial.url}
                target="_blank"
                rel="noopener noreferrer"
                title={t("sections.viewClientReview")}
                aria-label={`${t("sections.viewClientReview")} : ${project.title} (${newTabNotice})`}
                className="p-2 min-w-[34px] min-h-[34px] flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <LinkedinIcon className="w-4 h-4" aria-hidden="true" />
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
