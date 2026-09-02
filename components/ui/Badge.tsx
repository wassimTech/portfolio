"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  "accent" | "secondary" | "outline" | "neutral" | "success";

export type BadgeSize = "sm" | "md" | "lg";

export type BadgeShape = "rounded" | "pill";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  children: React.ReactNode;
}

/**
 * Reusable accessible Badge primitive adhering to SOLID principles:
 * - Single Responsibility: Renders a styled, WCAG 2.2 AA/AAA compliant status or category badge.
 * - Open/Closed: Configurable via variants, sizes, shapes, and HTML attributes.
 * - Liskov Substitution: Drops in as a standard HTML span element.
 * - Interface Segregation: Focused prop interface.
 * - Dependency Inversion: Pure UI component without hardcoded state.
 */
export function Badge({
  variant = "secondary",
  size = "md",
  shape = "rounded",
  children,
  className,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-1.5 font-semibold transition-colors duration-200 select-none";

  const variantStyles: Record<BadgeVariant, string> = {
    accent:
      "bg-accent text-accent-foreground border border-primary/30 dark:border-accent-foreground/35 shadow-2xs",
    secondary:
      "bg-secondary text-secondary-foreground border border-border dark:border-zinc-700/80 hover:border-primary/40 dark:hover:border-accent-foreground/40",
    outline:
      "bg-card text-foreground border border-border dark:border-zinc-700/80",
    neutral: "bg-muted/80 text-foreground border border-border",
    success:
      "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-600/30 dark:border-emerald-400/40",
  };

  const sizeStyles: Record<BadgeSize, string> = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3.5 py-1.5 text-xs sm:text-sm",
  };

  const shapeStyles: Record<BadgeShape, string> = {
    rounded: size === "sm" ? "rounded-md" : "rounded-lg",
    pill: "rounded-full",
  };

  return (
    <span
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        shapeStyles[shape],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
