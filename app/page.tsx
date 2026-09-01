"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
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
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
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
