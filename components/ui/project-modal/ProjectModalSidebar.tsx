import React from "react";
import { Cpu, Users, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { ProjectBanner } from "@/components/ui/ProjectBanner";
import { Badge } from "@/components/ui/Badge";

export interface ProjectModalSidebarProps {
  projectId: string;
  projectTitle: string;
  technologies: string[];
  team: string;
  teamLabel: string;
  techStackLabel: string;
  demoUrl?: string;
  githubUrl?: string;
  liveDemoLabel: string;
  viewOnGithubLabel: string;
  newTabNotice: string;
}

export function ProjectModalSidebar({
  projectId,
  projectTitle,
  technologies,
  team,
  teamLabel,
  techStackLabel,
  demoUrl,
  githubUrl,
  liveDemoLabel,
  viewOnGithubLabel,
  newTabNotice,
}: ProjectModalSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="w-full">
        <ProjectBanner projectId={projectId} />
      </div>

      <div className="p-5 rounded-2xl bg-card border border-border space-y-3">
        <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
          <Cpu className="w-4 h-4 text-primary" aria-hidden="true" />
          <span>{techStackLabel}</span>
        </h4>
        <ul
          className="flex flex-wrap gap-2 list-none p-0 m-0"
          aria-label={techStackLabel}
        >
          {technologies.map((tech) => (
            <li key={`${projectId}-tech-${tech}`}>
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
          <p className="font-semibold text-foreground">{teamLabel}</p>
          <p>{team}</p>
        </div>
      </div>

      {(demoUrl || githubUrl) && (
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${liveDemoLabel} : ${projectTitle} (${newTabNotice})`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 text-xs font-bold transition-opacity shadow-md shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              <span>{liveDemoLabel}</span>
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${viewOnGithubLabel} : ${projectTitle} (${newTabNotice})`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-muted text-xs font-bold transition-colors border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <GithubIcon className="w-4 h-4" aria-hidden="true" />
              <span>{viewOnGithubLabel}</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
