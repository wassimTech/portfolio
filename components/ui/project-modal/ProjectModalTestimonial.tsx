import React from "react";
import { Quote, ExternalLink, Award } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/icons";
import { Badge } from "@/components/ui/Badge";
import { ProjectTestimonial } from "@/types/cv";

export interface ProjectModalTestimonialProps {
  testimonial: ProjectTestimonial;
  locale: string;
  testimonialLabel: string;
  viewOnLinkedInLabel: string;
  newTabNotice: string;
}

export function ProjectModalTestimonial({
  testimonial,
  locale,
  testimonialLabel,
  viewOnLinkedInLabel,
  newTabNotice,
}: ProjectModalTestimonialProps) {
  const quote =
    (locale === "ar"
      ? testimonial.quote.ar
      : locale === "en"
        ? testimonial.quote.en
        : testimonial.quote.fr) ||
    testimonial.quote.fr ||
    testimonial.quote.en;
  const role =
    (locale === "ar"
      ? testimonial.role.ar
      : locale === "en"
        ? testimonial.role.en
        : testimonial.role.fr) ||
    testimonial.role.fr ||
    testimonial.role.en;

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-primary" aria-hidden="true" />
          <span>{testimonialLabel}</span>
        </h4>
        <Badge
          variant="accent"
          size="sm"
          shape="pill"
          className="font-bold text-xs"
        >
          <LinkedinIcon
            className="w-3 h-3 text-accent-foreground"
            aria-hidden="true"
          />
          <span>LinkedIn</span>
        </Badge>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-card border border-primary/30 relative overflow-hidden shadow-sm space-y-3.5">
        <div className="absolute -top-2 -end-2 text-primary/10 select-none pointer-events-none">
          <Quote className="w-16 h-16" aria-hidden="true" />
        </div>

        <blockquote className="relative z-10 text-xs sm:text-sm text-foreground italic leading-relaxed">
          &ldquo;{quote}&rdquo;
        </blockquote>

        <div className="relative z-10 pt-2 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-xs sm:text-sm font-bold text-foreground">
              {testimonial.author}
            </p>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>

          <a
            href={testimonial.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${viewOnLinkedInLabel} : ${testimonial.author} (${newTabNotice})`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground text-xs font-bold text-foreground transition-colors self-start sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <LinkedinIcon className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{viewOnLinkedInLabel}</span>
            <ExternalLink className="w-3 h-3 opacity-70" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
