"use client";

import React, { useEffect, useRef } from "react";
import { useTheme, ColorTheme } from "@/context/ThemeContext";

const THEME_RGB_MAP: Record<ColorTheme, { light: string; dark: string }> = {
  orange: { light: "249, 115, 22", dark: "249, 115, 22" },
  emerald: { light: "16, 185, 129", dark: "16, 185, 129" },
  cyan: { light: "6, 182, 212", dark: "6, 182, 212" },
  violet: { light: "139, 92, 246", dark: "139, 92, 246" },
  rose: { light: "244, 63, 94", dark: "244, 63, 94" },
  amber: { light: "245, 158, 11", dark: "245, 158, 11" },
};

const CODE_WORDS = [
  "{ }",
  "</>",
  "&&",
  "||",
  "const",
  "=>",
  "[]",
  "def",
  "class",
  "public",
  "void",
  "int",
  "async",
  "await",
  "let",
  "SELECT",
  "FROM",
  "<div>",
  "npm",
  "git",
  "Next.js",
  "Cloudflare",
  "React",
  "Hono.js",
  "Prisma",
  "TypeScript",
  "Workers",
  "R2",
  "D1",
  "Docker",
];

interface Particle {
  x: number;
  y: number;
  text: string;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  baseOpacity: number;
  angle: number;
  angularSpeed: number;
}

export function CodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme, colorTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const isDark = theme === "dark";
    const activeRgb = THEME_RGB_MAP[colorTheme] || THEME_RGB_MAP.orange;
    const rgbStr = isDark ? activeRgb.dark : activeRgb.light;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initParticles(width, height);
    };

    const initParticles = (width: number, height: number) => {
      // Density roughly 1 particle per 40000px² with min 20 and max 55
      const count = Math.min(
        Math.max(Math.floor((width * height) / 38000), 22),
        55
      );
      particles = [];

      for (let i = 0; i < count; i++) {
        const text = CODE_WORDS[Math.floor(Math.random() * CODE_WORDS.length)];
        const size = Math.floor(Math.random() * 6) + 11; // 11px - 17px
        const baseOpacity = isDark
          ? Math.random() * 0.14 + 0.05
          : Math.random() * 0.08 + 0.03;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          text,
          size,
          speedX: (Math.random() - 0.5) * 0.35,
          speedY: -(Math.random() * 0.35 + 0.15), // Drift gently upwards
          opacity: baseOpacity,
          baseOpacity,
          angle: (Math.random() - 0.5) * 0.15,
          angularSpeed: (Math.random() - 0.5) * 0.002,
        });
      }
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Render all particles
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.font = `600 ${p.size}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
        ctx.fillStyle = `rgba(${rgbStr}, ${p.opacity})`;
        ctx.fillText(p.text, 0, 0);
        ctx.restore();

        if (!prefersReducedMotion) {
          // Update physics
          p.x += p.speedX;
          p.y += p.speedY;
          p.angle += p.angularSpeed;

          // Wrap around edges smoothly
          if (p.y < -30) {
            p.y = height + 30;
            p.x = Math.random() * width;
          }
          if (p.x < -40) p.x = width + 40;
          if (p.x > width + 40) p.x = -40;
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    resize();
    render();

    window.addEventListener("resize", resize, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [theme, colorTheme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
    />
  );
}
