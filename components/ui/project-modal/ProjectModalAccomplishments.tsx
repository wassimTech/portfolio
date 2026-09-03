import React from "react";
import { CheckCircle2 } from "lucide-react";

export interface ProjectModalAccomplishmentsProps {
  projectId: string;
  tasks: string[];
  accomplishmentsLabel: string;
}

export function ProjectModalAccomplishments({
  projectId,
  tasks,
  accomplishmentsLabel,
}: ProjectModalAccomplishmentsProps) {
  return (
    <div className="space-y-3 pt-2">
      <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-primary" aria-hidden="true" />
        <span>{accomplishmentsLabel}</span>
      </h4>
      <div className="p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border space-y-3">
        <ul className="space-y-3 text-xs sm:text-sm text-foreground">
          {tasks.map((task, index) => (
            <li
              key={`${projectId}-task-${index}`}
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
  );
}
