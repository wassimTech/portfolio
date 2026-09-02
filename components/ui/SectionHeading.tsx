"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  level?: 2 | 3;
}

export function SectionHeading({
  title,
  subtitle,
  className,
  level = 2,
}: SectionHeadingProps) {
  const HeadingTag = level === 2 ? "h2" : "h3";

  return (
    <div
      className={cn(
        "text-center max-w-3xl mx-auto space-y-2 mb-10 sm:mb-14",
        className
      )}
    >
      <HeadingTag className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight inline-flex items-center justify-center gap-2">
        <span
          className="text-primary font-mono text-xl sm:text-2xl select-none"
          aria-hidden="true"
        >
          &lt;
        </span>
        <span className="bg-gradient-to-r from-foreground to-foreground bg-clip-text">
          {title}
        </span>
        <span
          className="text-primary font-mono text-xl sm:text-2xl select-none"
          aria-hidden="true"
        >
          / &gt;
        </span>
      </HeadingTag>

      {subtitle && (
        <p className="text-xs sm:text-sm text-muted-foreground font-medium tracking-wide">
          {subtitle}
        </p>
      )}
    </div>
  );
}
