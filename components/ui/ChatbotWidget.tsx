"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useI18n } from "@/context/I18nContext";
import { chatSuggestions } from "@/data/cv";
import { ChatMessage } from "@/types/cv";
import { generateLocalChatResponse } from "@/lib/chat-engine";
import {
  Sparkles,
  Send,
  X,
  Bot,
  RotateCcw,
  User,
  MessageSquare,
} from "lucide-react";

interface ChatbotWidgetProps {
  initialOpen?: boolean;
}

let nextId = 0;
function createId(prefix: string): string {
  nextId += 1;
  return `${prefix}-${nextId}`;
}

export function ChatbotWidget({ initialOpen = false }: ChatbotWidgetProps) {
  const { locale, t } = useI18n();
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: createId("welcome"),
      role: "assistant",
      content: t("chatbot.welcome"),
      timestamp: 1,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeSuggestions, setActiveSuggestions] = useState<string[]>(() =>
    chatSuggestions.map((s) => s.query[locale] || s.query.fr)
  );
  const feedContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputValue).trim();
    if (!messageText || isLoading) return;

    const userMessage: ChatMessage = {
      id: createId("user"),
      role: "user",
      content: messageText,
      timestamp: 2,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      let replyContent = "";
      let suggestions: string[] = [];

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: messageText,
            locale,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          replyContent = data.response;
          suggestions = data.suggestions;
        } else {
          // In local dev (next dev) without Cloudflare Pages proxy or if endpoint returns non-200
          const localFallback = generateLocalChatResponse(messageText, locale);
          replyContent = localFallback.response;
          suggestions = localFallback.suggestions;
        }
      } catch (fetchErr) {
        console.warn(
          "API unavailable, falling back to local chat engine:",
          fetchErr
        );
        const localFallback = generateLocalChatResponse(messageText, locale);
        replyContent = localFallback.response;
        suggestions = localFallback.suggestions;
      }

      const assistantMessage: ChatMessage = {
        id: createId("assistant"),
        role: "assistant",
        content: replyContent || t("chatbot.error"),
        timestamp: 3,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      if (suggestions && Array.isArray(suggestions) && suggestions.length > 0) {
        setActiveSuggestions(suggestions);
      }
    } catch (error) {
      console.error("Chat request error:", error);
      const errorMessage: ChatMessage = {
        id: createId("error"),
        role: "assistant",
        content: t("chatbot.error"),
        timestamp: 4,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    const welcomeText = t("chatbot.welcome");
    const initialSuggestions = chatSuggestions.map(
      (s) => s.query[locale] || s.query.fr
    );
    setMessages([
      {
        id: createId("welcome"),
        role: "assistant",
        content: welcomeText,
        timestamp: 1,
      },
    ]);
    setActiveSuggestions(initialSuggestions);
  };

  const formatMessageText = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      const parts = line.split(/(\*\*.*?\*\*|`.*?`)/g);

      return (
        <p
          key={idx}
          className={line.startsWith("- ") ? "ms-3 my-1 list-item" : "my-1"}
        >
          {parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pIdx} className="font-extrabold text-foreground">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith("`") && part.endsWith("`")) {
              return (
                <code
                  key={pIdx}
                  className="px-1.5 py-0.5 rounded-md bg-background/80 text-primary font-mono text-xs"
                >
                  {part.slice(1, -1)}
                </code>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 end-6 z-50">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label={t("chatbot.open")}
            aria-expanded={false}
            className="group relative flex items-center justify-center p-4 rounded-2xl bg-primary text-primary-foreground shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span className="absolute -top-1.5 -end-1.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
            </span>
            <div className="flex items-center gap-2 font-bold text-sm">
              <Sparkles
                className="w-5 h-5 text-primary-foreground animate-pulse"
                aria-hidden="true"
              />
              <span className="hidden sm:inline-block pe-1">
                {t("chatbot.title")}
              </span>
            </div>
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
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                    {t("chatbot.badge")}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("chatbot.subtitle")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearChat}
                aria-label={t("chatbot.clear")}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={t("chatbot.close")}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
          >
            {messages.map((msg) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isAssistant ? "justify-start" : "justify-end"}`}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                      <Bot className="w-4 h-4" aria-hidden="true" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                      isAssistant
                        ? "bg-muted/80 text-foreground border border-border/60 rounded-tl-xs"
                        : "bg-primary text-primary-foreground font-medium rounded-tr-xs shadow-sm"
                    }`}
                  >
                    {formatMessageText(msg.content)}
                  </div>

                  {!isAssistant && (
                    <div className="w-7 h-7 shrink-0 rounded-lg bg-accent text-accent-foreground flex items-center justify-center mt-0.5">
                      <User className="w-4 h-4" aria-hidden="true" />
                    </div>
                  )}
                </div>
              );
            })}

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
                    onClick={() => handleSendMessage(sug)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-muted text-xs font-medium transition-colors border border-border/50 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <MessageSquare
                      className="w-3 h-3 text-primary"
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
              handleSendMessage();
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
              className="p-2.5 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 disabled:opacity-50 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
