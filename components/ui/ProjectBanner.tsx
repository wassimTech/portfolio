import React from "react";
import {
  Layers,
  Bot,
  Smartphone,
  BookOpen,
  ShoppingBag,
  Video,
  Terminal,
  Sparkles,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface ProjectBannerProps {
  projectId: string;
}

interface BannerConfig {
  primaryIcon: React.ElementType;
  secondaryIcon: React.ElementType;
  tag: string;
}

const bannerConfigs: Record<string, BannerConfig> = {
  "workflow-management-platform": {
    primaryIcon: Terminal,
    secondaryIcon: Layers,
    tag: "devfactory-cli / Hono",
  },
  "urjob-ai-recruitment": {
    primaryIcon: Bot,
    secondaryIcon: Sparkles,
    tag: "Matching & Kanban / NestJS",
  },
  "zorlife-mobile-app": {
    primaryIcon: Smartphone,
    secondaryIcon: Activity,
    tag: "React Native / 3D Filament",
  },
  "bloom-photo-memories": {
    primaryIcon: BookOpen,
    secondaryIcon: Sparkles,
    tag: "Mobile App & Admin / Stripe",
  },
  "obydo-unfold-management": {
    primaryIcon: ShoppingBag,
    secondaryIcon: Layers,
    tag: "Enchères & Mangopay / Vue.js",
  },
  "webinarplease-videoconference": {
    primaryIcon: Video,
    secondaryIcon: Activity,
    tag: "WebRTC Streaming / React",
  },
};

export function ProjectBanner({ projectId }: ProjectBannerProps) {
  const config = bannerConfigs[projectId] || {
    primaryIcon: Layers,
    secondaryIcon: Sparkles,
    tag: "Full Stack Project",
  };

  const PrimaryIcon = config.primaryIcon;
  const SecondaryIcon = config.secondaryIcon;

  return (
    <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-card border border-border/80 flex items-center justify-center group-hover:border-primary/40 transition-colors shadow-inner">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/20 pointer-events-none" />

      {/* Center Connected Icon Cluster */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="p-3.5 rounded-2xl bg-primary/15 border border-primary/30 text-primary shadow-lg shadow-primary/10 group-hover:scale-110 transition-transform duration-300">
          <PrimaryIcon className="w-8 h-8" aria-hidden="true" />
        </div>
        <div className="h-0.5 w-8 bg-gradient-to-r from-primary/50 to-border" />
        <div className="p-2.5 rounded-xl bg-accent border border-border text-accent-foreground">
          <SecondaryIcon className="w-5 h-5" aria-hidden="true" />
        </div>
      </div>

      {/* Bottom Tag Badge */}
      <Badge
        variant="outline"
        size="sm"
        className="absolute bottom-3 start-3 bg-background border-border font-mono shadow-xs"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-primary dark:bg-accent-foreground animate-pulse" />
        <span>{config.tag}</span>
      </Badge>
    </div>
  );
}
