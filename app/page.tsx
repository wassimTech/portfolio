"use client";

import React from "react";
import { SkipLink } from "@/components/layout/SkipLink";
import { Navbar } from "@/components/layout/Navbar";
import { CodeBackground } from "@/components/ui/CodeBackground";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { AiAssistantSection } from "@/components/sections/AiAssistantSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ChatbotWidget } from "@/components/ui/ChatbotWidget";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 relative">
      <CodeBackground />
      <SkipLink targetId="main-content" />
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 focus:outline-none relative z-10"
      >
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <AiAssistantSection />
        <ContactSection />
      </main>
      <ChatbotWidget />
      <Footer />
    </div>
  );
}
