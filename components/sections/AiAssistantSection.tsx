"use client";

import React from "react";
import { useI18n } from "@/context/I18nContext";
import { EmbeddedChatbot } from "@/components/ui/EmbeddedChatbot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Bot, Zap, ShieldCheck } from "lucide-react";

export function AiAssistantSection() {
  const { t } = useI18n();

  return (
    <section
      id="assistant"
      className="py-20 relative bg-background border-t border-border overflow-hidden"
      aria-label="AI Assistant Section"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Section Header with Code Bracket Style */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold shadow-xs mb-2">
            <Bot className="w-4 h-4" aria-hidden="true" />
            <span>Cloudflare Workers AI & RAG</span>
          </div>

          <SectionHeading
            title={t("sections.assistantTitle")}
            subtitle={t("sections.assistantSubtitle")}
            className="mb-6"
          />

          {/* Quick Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card border border-border text-xs font-medium text-muted-foreground">
              <Zap className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
              {t("sections.assistantInstant")}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card border border-border text-xs font-medium text-muted-foreground">
              <ShieldCheck
                className="w-3.5 h-3.5 text-emerald-500"
                aria-hidden="true"
              />
              {t("sections.assistantVerified")}
            </span>
          </div>
        </div>

        {/* Embedded Interactive AI Chatbot Assistant */}
        <div className="max-w-4xl mx-auto">
          <EmbeddedChatbot />
        </div>
      </div>
    </section>
  );
}
