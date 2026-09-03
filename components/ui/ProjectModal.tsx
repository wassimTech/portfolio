"use client";

import React from "react";
import { Project } from "@/types/cv";
import { useI18n } from "@/context/I18nContext";
import { useProjectModalBehavior } from "@/hooks/useProjectModalBehavior";
import {
  ProjectModalHeader,
  ProjectModalTitle,
  ProjectModalOverview,
  ProjectModalAccomplishments,
  ProjectModalSidebar,
} from "@/components/ui/project-modal";

export interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { locale, t } = useI18n();

  const { dialogRef, closeButtonRef, scrollRef } = useProjectModalBehavior({
    isOpen,
    hasProject: Boolean(project),
    onClose,
  });

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

  const newTabNotice =
    (locale as string) === "fr"
      ? "nouvel onglet"
      : (locale as string) === "ar"
        ? "يفتح في نافذة جديدة"
        : "opens in new tab";

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
      className="m-auto fixed inset-0 z-50 p-3 sm:p-6 md:p-8 bg-transparent max-w-none max-h-none w-full h-full flex items-center justify-center border-none outline-none overscroll-contain backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-in open:fade-in open:zoom-in-95 duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-card border border-border shadow-2xl overflow-hidden">
        <ProjectModalHeader
          categoryLabel={categoryLabel}
          period={project.period}
          closeLabel={t("sections.closeModal")}
          onClose={onClose}
          closeButtonRef={closeButtonRef}
        />

        <div
          ref={scrollRef}
          role="region"
          aria-labelledby="project-modal-title"
          tabIndex={0}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-8 text-start outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring transform-gpu"
        >
          <ProjectModalTitle title={project.title} role={role} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <ProjectModalOverview
                description={description}
                overviewLabel={t("sections.projectOverview")}
              />

              <ProjectModalAccomplishments
                projectId={project.id}
                tasks={tasks}
                accomplishmentsLabel={t("sections.keyAccomplishments")}
              />
            </div>

            <div className="lg:col-span-5">
              <ProjectModalSidebar
                projectId={project.id}
                projectTitle={project.title}
                technologies={project.technologies}
                team={project.team}
                teamLabel={t("sections.teamLabel")}
                techStackLabel={t("sections.techStack")}
                demoUrl={project.demoUrl}
                githubUrl={project.githubUrl}
                liveDemoLabel={t("sections.liveDemo")}
                viewOnGithubLabel={t("sections.viewOnGithub")}
                newTabNotice={newTabNotice}
              />
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
