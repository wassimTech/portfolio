"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useI18n } from "@/context/I18nContext";
import { personalInfo } from "@/data/cv";
import { Send, ArrowRight, Layers, Code2, Cloud } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Badge } from "@/components/ui/Badge";

export function HeroSection() {
  const { locale, t } = useI18n();

  const roles = useMemo(
    () => [
      personalInfo.title[locale] || personalInfo.title.fr,
      (locale as string) === "fr"
        ? "Développeur Web"
        : (locale as string) === "ar"
          ? "مطور ويب"
          : "Web Developer",
      (locale as string) === "fr"
        ? "Développeur Mobile"
        : (locale as string) === "ar"
          ? "مطور تطبيقات موبايل"
          : "Mobile Developer",
    ],
    [locale]
  );

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < fullText.length) {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        } else {
          // Pause before starting to delete
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(fullText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, roles]);

  const bio = personalInfo.bio[locale] || personalInfo.bio.fr;
  const newTabNotice =
    (locale as string) === "fr"
      ? "nouvel onglet"
      : (locale as string) === "ar"
        ? "يفتح في نافذة جديدة"
        : "opens in new tab";

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
      className="relative pt-10 sm:pt-16 pb-12 overflow-hidden flex flex-col justify-between"
      aria-label="Hero Introduction"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-10 start-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 end-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14 w-full">
        {/* Top Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Big Punchy Typography */}
          <div className="lg:col-span-7 text-start space-y-6">
            {/* Availability Badge */}
            <Badge
              variant="outline"
              shape="pill"
              size="lg"
              className="gap-2.5 shadow-xs"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary dark:bg-accent-foreground opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary dark:bg-accent-foreground" />
              </span>
              <span>{t("hero.badge")}</span>
            </Badge>

            {/* Greeting, Name & Role as semantic H1 landmark (WCAG 1.3.1 / 2.4.6) */}
            <h1 className="space-y-1.5">
              <span className="block text-xl sm:text-2xl font-bold text-foreground">
                {t("hero.greeting")}{" "}
                <span className="text-primary">{personalInfo.name}</span>
              </span>

              {/* Typewriter Dynamic Title */}
              <span className="min-h-[2.5rem] sm:min-h-[3.2rem] flex items-center">
                {/* Accessible screen reader announcement for current role */}
                <span className="sr-only"> - {roles[currentRoleIndex]}</span>
                {/* Visual animated typewriter */}
                <span
                  aria-hidden="true"
                  className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-accent-foreground">
                    {displayText}
                  </span>
                  <span className="inline-block w-0.5 h-8 sm:h-11 bg-primary ms-1 animate-pulse" />
                </span>
              </span>
            </h1>

            {/* Subtitle / Bio summary */}
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
              {bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 active:scale-98 transition-all shadow-lg shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>{t("hero.contactMe")}</span>
                <Send className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-card border border-border text-foreground font-semibold text-sm hover:bg-muted active:scale-98 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>{t("hero.viewProjects")}</span>
                <ArrowRight
                  className="w-4 h-4 rtl:rotate-180 text-primary"
                  aria-hidden="true"
                />
              </a>

              {/* Social Quick Links */}
              <div className="flex items-center gap-2 ms-2">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn (${newTabNotice})`}
                  className="p-3 rounded-xl bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <LinkedinIcon className="w-4 h-4" aria-hidden="true" />
                </a>
                {personalInfo.github && (
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub (${newTabNotice})`}
                    className="p-3 rounded-xl bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <GithubIcon className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Orbital Avatar / Profile Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              {/* Orbital Outer Rings */}
              <div
                className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_25s_linear_infinite]"
                style={{ transform: "rotateX(60deg)" }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-4 rounded-full border border-dashed border-primary/30 animate-[spin_35s_linear_infinite_reverse]"
                style={{ transform: "rotateY(60deg)" }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-[-10px] rounded-full border border-primary/15 animate-[spin_45s_linear_infinite]"
                aria-hidden="true"
              />

              {/* Central Glowing Avatar */}
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full p-2 bg-gradient-to-tr from-primary/80 via-primary/30 to-border border border-primary/40 shadow-2xl shadow-primary/20">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-card">
                  <Image
                    src="/avatar.jpg"
                    alt={`${personalInfo.name} - Full Stack Developer`}
                    fill
                    sizes="(max-width: 768px) 200px, 240px"
                    className="object-cover object-top filter contrast-105 hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-2 border-t border-border/70">
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
      </div>
    </section>
  );
}
