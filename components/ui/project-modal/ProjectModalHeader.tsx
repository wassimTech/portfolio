import React from "react";
import { Calendar, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export interface ProjectModalHeaderProps {
  categoryLabel: string;
  period: string;
  closeLabel: string;
  onClose: () => void;
  closeButtonRef: React.RefObject<HTMLButtonElement | null>;
}

export function ProjectModalHeader({
  categoryLabel,
  period,
  closeLabel,
  onClose,
  closeButtonRef,
}: ProjectModalHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-border bg-card shrink-0 z-10">
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
          <span>{period}</span>
        </Badge>
      </div>

      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="p-2 rounded-xl bg-muted text-muted-foreground hover:text-foreground hover:bg-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  );
}
