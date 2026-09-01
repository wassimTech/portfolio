import React from "react";
import Image from "next/image";

interface TechIconProps {
  name: string;
  className?: string;
}

interface LogoDef {
  src: string;
  needsInvert?: boolean;
}

const logoMap: Record<string, LogoDef> = {
  // Languages & Technologies
  javascript: { src: "/logos/javascript.svg" },
  js: { src: "/logos/javascript.svg" },
  html: { src: "/logos/html-5.svg" },
  html5: { src: "/logos/html-5.svg" },
  css: { src: "/logos/css.svg" },
  css3: { src: "/logos/css.svg" },
  scss: { src: "/logos/sass.svg" },
  sass: { src: "/logos/sass.svg" },
  vite: { src: "/logos/vite-icon.svg" },
  firebase: { src: "/logos/firebase-icon.svg" },
  supabase: { src: "/logos/supabase-icon.svg" },
  docker: { src: "/logos/docker-icon.svg" },

  // Frameworks
  vue: { src: "/logos/vue.svg" },
  vuejs: { src: "/logos/vue.svg" },
  "vue.js": { src: "/logos/vue.svg" },
  nestjs: { src: "/logos/nestjs.svg" },
  nest: { src: "/logos/nestjs.svg" },
  express: { src: "/logos/express.svg", needsInvert: true },
  "express.js": { src: "/logos/express.svg", needsInvert: true },

  // Libraries & UI
  react: { src: "/logos/react.svg" },
  "react native": { src: "/logos/react.svg" },
  redux: { src: "/logos/redux.svg" },
  "redux thunk": { src: "/logos/redux-thunk.svg" },
  vuex: { src: "/logos/vuex.svg" },
  pinia: { src: "/logos/pinia.svg" },
  shadcn: { src: "/logos/shadcn.svg", needsInvert: true },
  "shadcn ui": { src: "/logos/shadcn.svg", needsInvert: true },
  "tailwind css": { src: "/logos/tailwindcss-icon.svg" },
  tailwind: { src: "/logos/tailwindcss-icon.svg" },
  tailwindcss: { src: "/logos/tailwindcss-icon.svg" },
  bootstrap: { src: "/logos/bootstrap.svg" },
  vuetify: { src: "/logos/vuetifyjs.svg" },
  "ant design": { src: "/logos/ant-design.svg" },

  // Databases & Backend
  postgres: { src: "/logos/postgresql.svg" },
  postgresql: { src: "/logos/postgresql.svg" },
  prisma: { src: "/logos/prisma.svg" },

  // Collaboration Tools
  git: { src: "/logos/git-icon.svg" },
  github: { src: "/logos/github-icon.svg", needsInvert: true },
  gitlab: { src: "/logos/gitlab-icon.svg" },
  jira: { src: "/logos/jira.svg" },
  monday: { src: "/logos/monday-icon.svg" },

  // Additional Stack
  next: { src: "/logos/nextjs-icon.svg", needsInvert: true },
  "next.js": { src: "/logos/nextjs-icon.svg", needsInvert: true },
  nextjs: { src: "/logos/nextjs-icon.svg", needsInvert: true },
  typescript: { src: "/logos/typescript-icon.svg" },
  ts: { src: "/logos/typescript-icon.svg" },
  node: { src: "/logos/nodejs-icon.svg" },
  "node.js": { src: "/logos/nodejs-icon.svg" },
  nodejs: { src: "/logos/nodejs-icon.svg" },
  hono: { src: "/logos/hono.svg" },
  "hono.js": { src: "/logos/hono.svg" },
  python: { src: "/logos/python.svg" },
  cloudflare: { src: "/logos/cloudflare-icon.svg" },
  "cloudflare workers": { src: "/logos/cloudflare-workers-icon.svg" },
  "cloudflare r2": { src: "/logos/cloudflare-icon.svg" },
  "cloudflare d1": { src: "/logos/cloudflare-icon.svg" },
  "gitlab ci/cd": { src: "/logos/gitlab-icon.svg" },
  "vercel ai sdk": { src: "/logos/vercel.svg", needsInvert: true },
  ai: { src: "/logos/anthropic-icon.svg" },
  stripe: { src: "/logos/stripe.svg" },
  three: { src: "/logos/threejs.svg", needsInvert: true },
  "three.js": { src: "/logos/threejs.svg", needsInvert: true },
  threejs: { src: "/logos/threejs.svg", needsInvert: true },
  webrtc: { src: "/logos/webrtc.svg" },
  pusher: { src: "/logos/pusher-icon.svg" },
  expo: { src: "/logos/expo-icon.svg", needsInvert: true },
  npm: { src: "/logos/npm-icon.svg" },
  "npm (cli)": { src: "/logos/npm-icon.svg" },
  cli: { src: "/logos/npm-icon.svg" },
  devfactory: { src: "/logos/npm-icon.svg" },
};

export function TechIcon({ name, className = "w-7 h-7" }: TechIconProps) {
  const normalized = name.toLowerCase().trim();

  let entry = logoMap[normalized];
  if (!entry) {
    const matchedKey = Object.keys(logoMap).find((k) => normalized.includes(k));
    if (matchedKey) {
      entry = logoMap[matchedKey];
    }
  }

  if (entry) {
    const invertClass = entry.needsInvert ? "dark:invert" : "";

    return (
      <div
        className={`relative inline-flex items-center justify-center ${className}`}
      >
        <Image
          src={entry.src}
          alt={`${name} logo`}
          width={28}
          height={28}
          className={`w-full h-full object-contain transition-transform duration-200 ${invertClass}`}
          unoptimized
        />
      </div>
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}
