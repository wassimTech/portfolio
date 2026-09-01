"use client";

import React, { useEffect, useRef } from "react";
import { Project } from "@/types/cv";
import { useI18n } from "@/context/I18nContext";
import {
  X,
  ExternalLink,
  Users,
  Calendar,
  CheckCircle2,
  Layers,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { ProjectBanner } from "@/components/ui/ProjectBanner";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { locale, t } = useI18n();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key & Lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const role = project.role[locale] || project.role.fr;
  const description = project.description[locale] || project.description.fr;
  const tasks = project.tasks[locale] || project.tasks.fr;

  const categoryLabel = {
    fullstack: locale === "fr" ? "Fullstack Web" : "Fullstack Web",
    mobile: locale === "fr" ? "Application Mobile" : "Mobile App",
    frontend: locale === "fr" ? "Frontend" : "Frontend",
  }[project.category];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Modal Backdrop Overlay */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog Box */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-card border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/25 text-primary text-xs font-bold uppercase tracking-wider">
              {categoryLabel}
            </span>
            <span className="px-3 py-1 rounded-lg bg-muted text-muted-foreground text-xs font-medium flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{project.period}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t("sections.closeModal")}
            className="p-2 rounded-xl bg-muted text-muted-foreground hover:text-foreground hover:bg-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 text-start">
          {/* Main Title & Role */}
          <div className="space-y-2">
            <h3
              id="project-modal-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight"
            >
              {project.title}
            </h3>
            <p className="text-base font-bold text-primary flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{role}</span>
            </p>
          </div>

          {/* 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left / Main Column (7 cols): Overview & Responsibilities */}
            <div className="lg:col-span-7 space-y-6">
              {/* Project Overview */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>{t("sections.projectOverview")}</span>
                </h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Key Accomplishments & Tasks */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2
                    className="w-4 h-4 text-primary"
                    aria-hidden="true"
                  />
                  <span>{t("sections.keyAccomplishments")}</span>
                </h4>
                <div className="p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border/70 space-y-3">
                  <ul className="space-y-3 text-xs sm:text-sm text-foreground/90">
                    {tasks.map((task, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2
                          className="w-4 h-4 text-primary shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="leading-relaxed">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right / Sidebar Column (5 cols): Visual Graphic, Tech Stack & Meta */}
            <div className="lg:col-span-5 space-y-6">
              {/* Compact Visual Graphic */}
              <div className="rounded-2xl overflow-hidden border border-border/80 shadow-md">
                <ProjectBanner projectId={project.id} />
              </div>

              {/* Tech Stack Matrix */}
              <div className="p-5 rounded-2xl bg-card border border-border space-y-3">
                <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>{t("sections.techStack")}</span>
                </h4>
                <div
                  className="flex flex-wrap gap-2"
                  aria-label={t("sections.techStack")}
                >
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-xl bg-secondary text-secondary-foreground text-xs font-medium border border-border/60 hover:border-primary/40 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta Info: Team */}
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/70 flex items-center gap-3 text-xs text-muted-foreground">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Users className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {t("sections.teamLabel")}
                  </p>
                  <p>{project.team}</p>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("sections.liveDemo")} for ${project.title}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 text-xs font-bold transition-opacity shadow-md shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    <span>{t("sections.liveDemo")}</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("sections.viewOnGithub")} for ${project.title}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-muted text-xs font-bold transition-colors border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <GithubIcon className="w-4 h-4" aria-hidden="true" />
                    <span>{t("sections.viewOnGithub")}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
