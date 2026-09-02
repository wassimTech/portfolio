"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useI18n } from "@/context/I18nContext";
import { chatSuggestions } from "@/data/cv";
import { ChatMessage } from "@/types/cv";
import { generateLocalChatResponse } from "@/lib/chat-engine";
import {
  Sparkles,
  Send,
  Bot,
  RotateCcw,
  User,
  MessageSquare,
} from "lucide-react";

let nextId = 0;
function createId(prefix: string): string {
  nextId += 1;
  return `${prefix}-${nextId}`;
}

export function EmbeddedChatbot() {
  const { locale, t } = useI18n();
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
  const isInitialMount = useRef(true);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    if (feedContainerRef.current) {
      feedContainerRef.current.scrollTo({
        top: feedContainerRef.current.scrollHeight,
        behavior,
      });
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    scrollToBottom();
  }, [messages, scrollToBottom]);

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
    <div
      className="glass-panel rounded-3xl border border-border overflow-hidden shadow-2xl text-start my-8 flex flex-col"
      role="region"
      aria-label={t("chatbot.title")}
    >
      {/* Interactive Chat Header */}
      <div className="px-5 py-4 bg-muted/80 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative p-2 rounded-xl bg-primary/10 text-primary">
            <Bot className="w-5 h-5" aria-hidden="true" />
            <span className="absolute bottom-1 end-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-card" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-foreground flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>{t("chatbot.title")}</span>
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                {t("chatbot.badge")}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {t("chatbot.subtitle")}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClearChat}
          aria-label={t("chatbot.clear")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-background text-foreground border border-border text-xs font-semibold hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RotateCcw
            className="w-3.5 h-3.5 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="hidden sm:inline">{t("chatbot.clear")}</span>
        </button>
      </div>

      {/* Message Feed */}
      <div
        ref={feedContainerRef}
        className="p-5 bg-card/60 text-foreground space-y-4 min-h-[220px] max-h-[360px] overflow-y-auto text-xs sm:text-sm"
        aria-live="polite"
        aria-busy={isLoading}
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
        <div className="px-5 py-3 border-t border-border/60 bg-muted/30">
          <p className="text-xs font-bold text-muted-foreground text-start mb-2">
            {t("chatbot.suggestionsTitle")}
          </p>
          <div className="flex flex-wrap gap-2">
            {activeSuggestions.map((sug, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(sug)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-muted text-xs font-medium transition-colors border border-border/50 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <MessageSquare
                  className="w-3.5 h-3.5 text-primary shrink-0"
                  aria-hidden="true"
                />
                <span className="truncate max-w-[320px]">{sug}</span>
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
        className="p-4 bg-muted/50 border-t border-border flex items-center gap-2.5"
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t("chatbot.placeholder")}
          aria-label={t("chatbot.placeholder")}
          className="flex-1 px-4 py-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          aria-label={t("chatbot.send")}
          className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm hover:opacity-90 disabled:opacity-50 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span>{t("chatbot.send")}</span>
          <Send className="w-4 h-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
