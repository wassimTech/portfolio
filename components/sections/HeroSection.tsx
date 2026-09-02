"use client";

import React from "react";
import Image from "next/image";
import { useI18n } from "@/context/I18nContext";
import { personalInfo } from "@/data/cv";
import {
  ArrowRight,
  Mail,
  Layers,
  Code2,
  Cloud,
  CheckCircle,
  Briefcase,
} from "lucide-react";

export function HeroSection() {
  const { locale, t } = useI18n();

  const title = personalInfo.title[locale] || personalInfo.title.fr;
  const bio = personalInfo.bio[locale] || personalInfo.bio.fr;

  const stats = [
    {
      value: "6+",
      label: t("hero.projectsDelivered"),
      icon: Layers,
    },
    {
      value: "100%",
      label: t("hero.techQuality"),
      icon: Code2,
    },
    {
      value: "Edge",
      label: t("hero.cloudPlatform"),
      icon: Cloud,
    },
  ];

  return (
    <section
      id="about"
      className="relative pt-8 sm:pt-14 pb-16 overflow-hidden"
      aria-label="Hero Section"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-10 start-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 end-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Top Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Big Punchy Typography */}
          <div className="lg:col-span-8 text-start space-y-6">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-card border border-border text-foreground text-xs font-semibold shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
              </span>
              <span>{t("hero.badge")}</span>
            </div>

            {/* Giant Punchline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-[1.08]">
                <span>{t("hero.punchlineMain")}</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-accent-foreground">
                  {t("hero.punchlineHighlight")}
                </span>
              </h1>
              <h2 className="text-lg sm:text-xl font-bold text-primary pt-2">
                {personalInfo.name} — {title}
              </h2>
            </div>

            {/* Subtitle / Bio summary */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {t("hero.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 active:scale-98 transition-all shadow-lg shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>{t("hero.viewProjects")}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-card border border-border text-foreground font-semibold text-sm hover:bg-muted active:scale-98 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Mail className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>{t("hero.contactMe")}</span>
              </a>

              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-muted text-muted-foreground hover:text-foreground text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Briefcase
                  className="w-4 h-4 text-primary"
                  aria-hidden="true"
                />
                <span>{t("hero.viewExperience")}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Sleek Portrait / Profile Card */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative group w-72 sm:w-80 aspect-square rounded-3xl p-2 bg-gradient-to-b from-primary/30 via-border to-border/40 border border-border shadow-2xl">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-card">
                <Image
                  src="/avatar.jpg"
                  alt={`${personalInfo.name} - ${title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                  priority
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                {/* Bottom Card Badge */}
                <div className="absolute bottom-3 start-3 end-3 p-3 rounded-xl glass-panel border border-border text-start">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-extrabold text-foreground">
                        {personalInfo.name}
                      </p>
                      <p className="text-xs font-semibold text-primary">
                        {title}
                      </p>
                    </div>
                    <span className="p-1 rounded-full bg-primary/20 text-primary">
                      <CheckCircle className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Horizontal Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4 border-t border-border/70">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="glass-panel p-5 rounded-2xl border border-border hover:border-primary/50 transition-all text-start space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-foreground group-hover:text-primary transition-colors">
                    {stat.value}
                  </span>
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <IconComponent className="w-4 h-4" aria-hidden="true" />
                  </div>
                </div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Big Name & Biography Block */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-border grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-start">
          <div className="md:col-span-5 space-y-1">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary">
              Full Stack Engineer
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
              Wassim AHMED
            </h2>
            <p className="text-xs text-muted-foreground">
              {personalInfo.location[locale] || personalInfo.location.fr}
            </p>
          </div>
          <div className="md:col-span-7 space-y-3 border-t md:border-t-0 md:border-s border-border md:ps-8 pt-4 md:pt-0">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {bio}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-md bg-accent text-accent-foreground text-xs font-semibold">
                Next.js & React
              </span>
              <span className="px-2.5 py-1 rounded-md bg-accent text-accent-foreground text-xs font-semibold">
                NestJS & Hono.js
              </span>
              <span className="px-2.5 py-1 rounded-md bg-accent text-accent-foreground text-xs font-semibold">
                React Native (iOS/Android)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-accent text-accent-foreground text-xs font-semibold">
                Cloudflare Workers & R2/D1
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
