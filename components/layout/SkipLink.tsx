"use client";

import React from "react";
import { useI18n } from "@/context/I18nContext";
import { CornerDownRight } from "lucide-react";

export interface SkipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  targetId?: string;
  children?: React.ReactNode;
}

/**
 * Accessible SkipLink component (WCAG 2.2 AA / AAA compliant).
 * Hidden visually until focused by keyboard navigation (Tab), allowing
 * users to jump straight past repetitive headers directly to the main landmark.
 */
export function SkipLink({
  targetId = "main-content",
  children,
  className = "",
  onClick,
  ...props
}: SkipLinkProps) {
  const { t } = useI18n();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    if (!e.defaultPrevented) {
      const target = document.getElementById(targetId);
      if (target) {
        target.focus();
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className={`sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm shadow-xl border border-primary/20 backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-200 cursor-pointer ${className}`}
      {...props}
    >
      <CornerDownRight
        className="w-4 h-4 shrink-0 rtl:rotate-90"
        aria-hidden="true"
      />
      <span>{children || t("nav.skipToContent")}</span>
    </a>
  );
}
