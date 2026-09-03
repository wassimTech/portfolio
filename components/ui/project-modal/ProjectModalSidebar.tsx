import React from "react";
import {
  Cpu,
  Users,
  ExternalLink,
  Globe,
  Play,
  Lock,
  MapPin,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
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
  websiteUrl?: string;
  videoUrl?: string;
  githubUrl?: string;
  testimonialUrl?: string;
  testimonialLabel?: string;
  isConfidential?: boolean;
  confidentialityNotice?: string;
  availabilityNotice?: string;
  availabilityLabel?: string;
  liveDemoLabel: string;
  websiteLabel: string;
  videoDemoLabel: string;
  viewOnGithubLabel: string;
  confidentialBadgeLabel: string;
  confidentialNoticeLabel: string;
  confidentialNoticeShowcaseOnlyLabel?: string;
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
  websiteUrl,
  videoUrl,
  githubUrl,
  testimonialUrl,
  testimonialLabel,
  isConfidential,
  confidentialityNotice,
  availabilityNotice,
  availabilityLabel,
  liveDemoLabel,
  websiteLabel,
  videoDemoLabel,
  viewOnGithubLabel,
  confidentialBadgeLabel,
  confidentialNoticeLabel,
  confidentialNoticeShowcaseOnlyLabel,
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

      {availabilityNotice && (
        <div className="p-3.5 rounded-2xl bg-primary/5 border border-primary/20 flex items-start gap-2.5 text-xs text-muted-foreground">
          <MapPin
            className="w-4 h-4 text-primary shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div className="space-y-0.5">
            <span className="font-bold text-foreground block">
              {availabilityLabel || "Disponibilité :"}
            </span>
            <p className="text-[11px] leading-relaxed">{availabilityNotice}</p>
          </div>
        </div>
      )}

      {isConfidential && (
        <div className="p-3.5 rounded-2xl bg-muted/30 border border-border flex items-start gap-2.5 text-xs text-muted-foreground">
          <Lock
            className="w-4 h-4 text-primary shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div className="space-y-0.5">
            <span className="font-bold text-foreground block">
              {confidentialBadgeLabel}
            </span>
            <p className="text-[11px] leading-relaxed">
              {confidentialityNotice ||
                (!demoUrl && websiteUrl
                  ? confidentialNoticeShowcaseOnlyLabel ||
                    confidentialNoticeLabel
                  : confidentialNoticeLabel)}
            </p>
          </div>
        </div>
      )}

      {(demoUrl || websiteUrl || videoUrl || githubUrl || testimonialUrl) && (
        <div className="flex flex-col gap-2.5 pt-1">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${liveDemoLabel} : ${projectTitle} (${newTabNotice})`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 text-xs font-bold transition-opacity shadow-md shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              <span>{liveDemoLabel}</span>
            </a>
          )}

          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${websiteLabel} : ${projectTitle} (${newTabNotice})`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-muted text-xs font-bold transition-colors border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Globe className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>{websiteLabel}</span>
              <ExternalLink
                className="w-3 h-3 opacity-60 ms-auto"
                aria-hidden="true"
              />
            </a>
          )}

          {testimonialUrl && (
            <a
              href={testimonialUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${testimonialLabel || "Avis Client"} : ${projectTitle} (${newTabNotice})`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 text-xs font-bold transition-colors border border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <LinkedinIcon className="w-4 h-4" aria-hidden="true" />
              <span>{testimonialLabel || "Avis Client (LinkedIn)"}</span>
              <ExternalLink
                className="w-3 h-3 opacity-60 ms-auto"
                aria-hidden="true"
              />
            </a>
          )}

          {videoUrl && (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${videoDemoLabel} : ${projectTitle} (${newTabNotice})`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 hover:from-pink-500/20 hover:to-indigo-500/20 text-foreground text-xs font-bold transition-all border border-pink-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Play
                className="w-4 h-4 text-pink-500 fill-pink-500"
                aria-hidden="true"
              />
              <span>{videoDemoLabel}</span>
              <ExternalLink
                className="w-3 h-3 opacity-60 ms-auto"
                aria-hidden="true"
              />
            </a>
          )}

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${viewOnGithubLabel} : ${projectTitle} (${newTabNotice})`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-muted text-xs font-bold transition-colors border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
