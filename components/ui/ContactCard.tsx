"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ContactCardProps extends React.HTMLAttributes<HTMLElement> {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  children?: React.ReactNode;
}

/**
 * ContactCard component adhering to SOLID principles:
 * - Single Responsibility: Renders a consistent, accessible contact card frame and content header.
 * - Open/Closed: Open for extension via children slot, closed for internal modification.
 * - Liskov Substitution: Drops in as a standard HTML article element extending HTMLElement attributes.
 * - Interface Segregation: Lean, focused prop interface.
 * - Dependency Inversion: Pure presentational component decoupled from external data stores.
 */
export function ContactCard({
  icon: Icon,
  label,
  value,
  children,
  className,
  ...props
}: ContactCardProps) {
  return (
    <article
      className={cn(
        "glass-panel p-6 sm:p-7 rounded-3xl border border-border flex flex-col justify-between space-y-5 text-start hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 group",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="p-3.5 rounded-2xl bg-primary/10 text-primary shrink-0 transition-colors group-hover:bg-primary/15">
          <Icon className="w-6 h-6" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {label}
          </p>
          <p
            className="text-xs sm:text-[13px] font-bold text-foreground break-all"
            title={value}
          >
            {value}
          </p>
        </div>
      </div>

      {children && (
        <div className="flex items-center gap-3 w-full pt-1">{children}</div>
      )}
    </article>
  );
}
