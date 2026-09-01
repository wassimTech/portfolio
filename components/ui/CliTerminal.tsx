"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, Copy, Check, Play } from "lucide-react";

export function CliTerminal() {
  const [copied, setCopied] = useState(false);
  const [outputLines, setOutputLines] = useState<string[]>([
    "# DevFactory CLI - Tool built by Wassim AHMED",
    "# Run in terminal to initialize full-stack modules:",
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const copyTimerRef = useRef<NodeJS.Timeout | null>(null);
  const runTimerRef = useRef<NodeJS.Timeout | null>(null);

  const command = "npx devfactory-cli init @templates/fullstack-app";

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      if (runTimerRef.current) clearTimeout(runTimerRef.current);
    };
  }, []);

  const handleCopy = () => {
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    navigator.clipboard.writeText(command);
    setCopied(true);
    copyTimerRef.current = setTimeout(() => setCopied(false), 2500);
  };

  const handleSimulateRun = () => {
    if (isRunning) return;
    if (runTimerRef.current) clearTimeout(runTimerRef.current);
    setIsRunning(true);
    setOutputLines([
      "# Running DevFactory CLI simulation...",
      `$ ${command}`,
      "✔ Fetching project template @templates/fullstack-app...",
      "✔ Connecting to Cloudflare Workers & R2 storage...",
      "✔ Initializing Hono.js serverless API routes...",
      "✔ Setting up Next.js App Router & Tailwind CSS...",
      "🚀 Full Stack Template ready in 580ms!",
    ]);
    runTimerRef.current = setTimeout(() => {
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div className="glass-panel rounded-3xl border border-border overflow-hidden shadow-2xl text-start font-mono text-xs my-8">
      {/* Terminal Bar Header */}
      <div className="px-5 py-3.5 bg-muted/90 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-border" />
          <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
          <div className="w-3 h-3 rounded-full bg-primary/70" />
          <span className="ms-2 text-muted-foreground text-[11px] font-bold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            <span>devfactory-cli — npm package</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSimulateRun}
            disabled={isRunning}
            aria-label="Simulate CLI Execution"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-[11px] font-bold hover:opacity-90 transition-opacity disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Play className="w-3 h-3 fill-current" aria-hidden="true" />
            <span>{isRunning ? "Running..." : "Run Demo"}</span>
          </button>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy Command"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-background text-foreground border border-border text-[11px] font-bold hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {copied ? (
              <>
                <Check
                  className="w-3.5 h-3.5 text-primary"
                  aria-hidden="true"
                />
                <span className="text-primary">Copied!</span>
              </>
            ) : (
              <>
                <Copy
                  className="w-3.5 h-3.5 text-muted-foreground"
                  aria-hidden="true"
                />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-5 bg-card text-foreground space-y-2 min-h-[140px] overflow-x-auto select-text border-t border-border/20">
        <div className="flex items-center gap-2 text-primary font-bold">
          <span className="text-muted-foreground">$</span>
          <span>{command}</span>
        </div>
        <div className="pt-2 space-y-1 text-muted-foreground">
          {outputLines.map((line, idx) => (
            <p
              key={idx}
              className={
                line.startsWith("✔")
                  ? "text-primary font-semibold"
                  : line.startsWith("🚀")
                    ? "text-foreground font-extrabold"
                    : line.startsWith("$")
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
              }
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
