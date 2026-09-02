"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useI18n } from "@/context/I18nContext";
import { useChatSession } from "@/hooks/useChatSession";
import { ChatMessageBubble } from "@/components/ui/ChatMessageBubble";
import { Badge } from "@/components/ui/Badge";
import { Send, X, Bot, RotateCcw, MessageSquare } from "lucide-react";

interface ChatbotWidgetProps {
  initialOpen?: boolean;
}

export function ChatbotWidget({ initialOpen = false }: ChatbotWidgetProps) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [showTeaser, setShowTeaser] = useState(true);

  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    activeSuggestions,
    sendMessage,
    clearChat,
  } = useChatSession();

  const feedContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowTeaser(false);
  };

  const handleDismissTeaser = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTeaser(false);
  };

  // Scroll to bottom
  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    if (feedContainerRef.current) {
      feedContainerRef.current.scrollTo({
        top: feedContainerRef.current.scrollHeight,
        behavior,
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages, scrollToBottom]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Floating Launcher & Teaser Container */}
      <div className="fixed bottom-6 end-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
        {/* Proactive Floating Teaser Bubble */}
        {!isOpen && showTeaser && (
          <div
            role="status"
            aria-live="polite"
            className="pointer-events-auto relative group flex items-start gap-2.5 p-3 max-w-[270px] sm:max-w-[290px] rounded-2xl bg-card/95 backdrop-blur-xl border border-primary/40 shadow-2xl hover:border-primary transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
          >
            <button
              type="button"
              onClick={handleOpenChat}
              className="flex-1 flex items-start gap-2.5 text-start cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
            >
              <div className="p-1.5 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                <Bot className="w-4 h-4 animate-pulse" aria-hidden="true" />
              </div>
              <p className="flex-1 text-xs font-medium text-foreground leading-relaxed">
                {t("chatbot.teaser")}
              </p>
            </button>
            <button
              type="button"
              onClick={handleDismissTeaser}
              aria-label={t("chatbot.dismissTeaser")}
              className="p-1 -me-1 -mt-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            {/* Downward pointing triangle */}
            <div className="absolute -bottom-1.5 end-8 w-3 h-3 rotate-45 bg-card/95 border-b border-r border-primary/40 group-hover:border-primary transition-colors" />
          </div>
        )}

        {/* 3D Holographic AI Crystal Orb Sphere Launcher */}
        {!isOpen && (
          <button
            type="button"
            onClick={handleOpenChat}
            aria-label={t("chatbot.open")}
            aria-expanded={false}
            className="pointer-events-auto group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-500 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {/* Dynamic Outer Aura Luminescence */}
            <span
              className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary/60 via-primary/30 to-accent-foreground/40 blur-xl opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 animate-orb-glow"
              aria-hidden="true"
            />

            {/* Outer Rim 3D Glass Ring */}
            <span
              className="absolute inset-0 rounded-full p-[1.5px] bg-gradient-to-b from-white/60 via-primary/40 to-black/60 shadow-2xl"
              aria-hidden="true"
            />

            {/* 3D Sphere Body */}
            <span className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-card via-card/90 to-background flex items-center justify-center shadow-inner border border-primary/20">
              {/* Swirling Holographic Plasma Nebula */}
              <span
                className="absolute inset-0.5 rounded-full bg-gradient-to-tr from-primary via-accent-foreground/50 to-primary/30 opacity-80 blur-[2px] animate-orb-spin group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />

              {/* Second Counter-Rotating Light Glow */}
              <span
                className="absolute inset-1 rounded-full bg-gradient-to-br from-white/30 via-transparent to-primary/40 opacity-70 blur-[1px] animate-pulse"
                aria-hidden="true"
              />

              {/* Central Luminous AI Icon */}
              <span className="relative z-10 text-primary-foreground drop-shadow-[0_0_12px_rgba(255,255,255,0.85)] group-hover:scale-110 transition-transform duration-300">
                <Bot
                  className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                  aria-hidden="true"
                />
              </span>

              {/* Top Specular Glass Reflection */}
              <span
                className="absolute top-1 inset-x-2.5 h-3.5 sm:h-4 rounded-full bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none blur-[0.5px]"
                aria-hidden="true"
              />

              {/* Bottom Ambient Shadow */}
              <span
                className="absolute bottom-1 inset-x-3 h-2.5 rounded-full bg-gradient-to-t from-primary/60 to-transparent pointer-events-none blur-sm"
                aria-hidden="true"
              />
            </span>

            {/* Top-Right Active Status Indicator Dot (matching user reference screenshot) */}
            <span className="absolute top-0 end-0 z-20 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-emerald-500 ring-2 ring-card shadow-md" />
            </span>
          </button>
        )}
      </div>

      {/* Expandable Chat Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("chatbot.title")}
          className="fixed bottom-4 end-4 sm:bottom-6 sm:end-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] flex flex-col rounded-3xl bg-card/95 backdrop-blur-2xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-muted/70 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="relative p-2 rounded-xl bg-primary/10 text-primary">
                <Bot className="w-5 h-5" aria-hidden="true" />
                <span className="absolute bottom-1 end-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-card" />
              </div>
              <div className="text-start">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-extrabold text-foreground">
                    {t("chatbot.title")}
                  </h3>
                  <Badge variant="success" shape="pill" size="sm">
                    {t("chatbot.badge")}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("chatbot.subtitle")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={clearChat}
                aria-label={t("chatbot.clear")}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={t("chatbot.close")}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Message Feed */}
          <div
            ref={feedContainerRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 text-start text-xs sm:text-sm"
            aria-live="polite"
            aria-busy={isLoading}
          >
            {messages.map((msg) => (
              <ChatMessageBubble key={msg.id} message={msg} />
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center text-muted-foreground text-xs">
                <div className="w-7 h-7 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Bot className="w-4 h-4 animate-spin" aria-hidden="true" />
                </div>
                <div className="p-3 rounded-2xl bg-muted/60 border border-border/40 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                  <span className="ms-1.5 text-xs text-muted-foreground">
                    {t("chatbot.thinking")}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Quick Prompts */}
          {activeSuggestions.length > 0 && (
            <div className="px-4 py-2 border-t border-border/50 bg-background/50">
              <p className="text-xs font-bold text-muted-foreground text-start mb-1.5">
                {t("chatbot.suggestionsTitle")}
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {activeSuggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => sendMessage(sug)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-muted dark:hover:bg-zinc-800 text-xs font-medium transition-colors border border-border dark:border-zinc-700 hover:border-primary/50 dark:hover:border-accent-foreground/50 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                  >
                    <MessageSquare
                      className="w-3 h-3 text-primary dark:text-accent-foreground shrink-0"
                      aria-hidden="true"
                    />
                    <span className="truncate max-w-[280px]">{sug}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="p-3.5 bg-muted/40 border-t border-border flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t("chatbot.placeholder")}
              aria-label={t("chatbot.placeholder")}
              className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              aria-label={t("chatbot.send")}
              className="p-2.5 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 disabled:opacity-50 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
