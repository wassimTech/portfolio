import React from "react";
import { ShieldCheck, Layers } from "lucide-react";

export interface ProjectModalTitleProps {
  title: string;
  role: string;
}

export function ProjectModalTitle({ title, role }: ProjectModalTitleProps) {
  return (
    <div className="space-y-1.5">
      <h3
        id="project-modal-title"
        className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight leading-snug"
      >
        {title}
      </h3>
      <p className="text-base font-bold text-accent-foreground flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 shrink-0" aria-hidden="true" />
        <span>{role}</span>
      </p>
    </div>
  );
}

export interface ProjectModalOverviewProps {
  description: string;
  overviewLabel: string;
}

export function ProjectModalOverview({
  description,
  overviewLabel,
}: ProjectModalOverviewProps) {
  return (
    <div className="space-y-3">
      <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
        <Layers className="w-4 h-4 text-primary" aria-hidden="true" />
        <span>{overviewLabel}</span>
      </h4>
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
