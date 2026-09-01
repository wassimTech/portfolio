"use client";

import React, { useState } from "react";
import { useI18n } from "@/context/I18nContext";
import { projects } from "@/data/cv";
import { Project } from "@/types/cv";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { Code, Layers, Smartphone, Layout } from "lucide-react";

type CategoryFilter = "all" | "fullstack" | "mobile" | "frontend";

export function ProjectsSection() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories: {
    id: CategoryFilter;
    labelKey: string;
    icon: React.ElementType;
  }[] = [
    { id: "all", labelKey: "sections.allProjects", icon: Layout },
    { id: "fullstack", labelKey: "sections.fullstackProjects", icon: Layers },
    { id: "mobile", labelKey: "sections.mobileProjects", icon: Smartphone },
    { id: "frontend", labelKey: "sections.frontendProjects", icon: Code },
  ];

  const filteredProjects = projects.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section
      id="projects"
      className="py-20 relative bg-background/50 border-t border-border"
      aria-label="Projects Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t("sections.projectsTitle")}
          </h2>
          <p className="text-base text-muted-foreground">
            {t("sections.projectsSubtitle")}
          </p>

          {/* Category Filter Chips */}
          <div
            className="flex flex-wrap justify-center items-center gap-2 pt-4"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border"
                  }`}
                >
                  <IconComponent className="w-4 h-4" aria-hidden="true" />
                  <span>{t(cat.labelKey)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={handleSelectProject}
            />
          ))}
        </div>

        {/* Deep Dive Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </section>
  );
}
