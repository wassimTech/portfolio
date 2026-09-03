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
import { Badge } from "@/components/ui/Badge";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { locale, t } = useI18n();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    if (!dialog.open) {
      try {
        dialog.showModal();
      } catch {
        // Dialog may already be open or in an invalid state — ignore
      }
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const handleBackdropClick = (e: MouseEvent) => {
      if (e.target === dialog) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      const scrollEl = scrollRef.current;
      if (!scrollEl) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        scrollEl.scrollBy({ top: 60, behavior: "smooth" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        scrollEl.scrollBy({ top: -60, behavior: "smooth" });
      } else if (e.key === "PageDown") {
        e.preventDefault();
        scrollEl.scrollBy({
          top: scrollEl.clientHeight * 0.8,
          behavior: "smooth",
        });
      } else if (e.key === "PageUp") {
        e.preventDefault();
        scrollEl.scrollBy({
          top: -scrollEl.clientHeight * 0.8,
          behavior: "smooth",
        });
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollEl.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "End") {
        e.preventDefault();
        scrollEl.scrollTo({ top: scrollEl.scrollHeight, behavior: "smooth" });
      }
    };

    dialog.addEventListener("click", handleBackdropClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      dialog.removeEventListener("click", handleBackdropClick);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const role = project.role[locale] || project.role.fr;
  const description = project.description[locale] || project.description.fr;
  const tasks = project.tasks[locale] || project.tasks.fr;

  const categoryLabel =
    {
      fullstack: t("sections.fullstackProjects"),
      mobile: t("sections.mobileProjects"),
      frontend: t("sections.frontendProjects"),
    }[project.category] || project.category;

  const newTabNotice = locale === "fr" ? "nouvel onglet" : "opens in new tab";

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="m-auto fixed inset-0 z-50 p-3 sm:p-6 md:p-8 bg-transparent max-w-none max-h-none w-full h-full flex items-center justify-center border-none outline-none backdrop:bg-black/70 backdrop:backdrop-blur-md open:animate-in open:fade-in open:zoom-in-95 duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-card border border-border shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge
              variant="accent"
              size="md"
              className="uppercase tracking-wider font-bold"
            >
              {categoryLabel}
            </Badge>
            <Badge variant="secondary" size="md" className="shrink-0">
              <Calendar
                className="w-3.5 h-3.5 text-primary dark:text-accent-foreground shrink-0"
                aria-hidden="true"
              />
              <span>{project.period}</span>
            </Badge>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t("sections.closeModal")}
            className="p-2 rounded-xl bg-muted text-muted-foreground hover:text-foreground hover:bg-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div
          ref={scrollRef}
          role="region"
          aria-labelledby="project-modal-title"
          tabIndex={0}
          className="overflow-y-auto p-6 sm:p-8 space-y-8 text-start outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        >
          <div className="space-y-1.5">
            <h3
              id="project-modal-title"
              className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight leading-snug"
            >
              {project.title}
            </h3>
            <p className="text-base font-bold text-accent-foreground flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{role}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>{t("sections.projectOverview")}</span>
                </h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2
                    className="w-4 h-4 text-primary"
                    aria-hidden="true"
                  />
                  <span>{t("sections.keyAccomplishments")}</span>
                </h4>
                <div className="p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border space-y-3">
                  <ul className="space-y-3 text-xs sm:text-sm text-foreground">
                    {tasks.map((task, index) => (
                      <li
                        key={`${project.id}-task-${index}`}
                        className="flex items-start gap-3"
                      >
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

            <div className="lg:col-span-5 space-y-6">
              <div className="w-full">
                <ProjectBanner projectId={project.id} />
              </div>

              <div className="p-5 rounded-2xl bg-card border border-border space-y-3">
                <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>{t("sections.techStack")}</span>
                </h4>
                <ul
                  className="flex flex-wrap gap-2 list-none p-0 m-0"
                  aria-label={t("sections.techStack")}
                >
                  {project.technologies.map((tech) => (
                    <li key={`${project.id}-tech-${tech}`}>
                      <Badge
                        variant="secondary"
                        size="md"
                        className="hover:border-primary/50 dark:hover:border-accent-foreground/50 transition-colors"
                      >
                        {tech}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>

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

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("sections.liveDemo")} : ${project.title} (${newTabNotice})`}
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
                    aria-label={`${t("sections.viewOnGithub")} : ${project.title} (${newTabNotice})`}
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
    </dialog>
  );
}
