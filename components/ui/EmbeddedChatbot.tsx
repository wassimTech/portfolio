"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { useI18n } from "@/context/I18nContext";
import { useChatSession } from "@/hooks/useChatSession";
import { ChatMessageBubble } from "@/components/ui/ChatMessageBubble";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Send, Bot, RotateCcw, MessageSquare } from "lucide-react";

export function EmbeddedChatbot() {
  const { t } = useI18n();
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
              <Badge variant="success" shape="pill" size="sm">
                {t("chatbot.badge")}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {t("chatbot.subtitle")}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={clearChat}
          aria-label={t("chatbot.clear")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-background text-foreground border border-border text-xs font-semibold hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
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
        <div className="px-5 py-3 border-t border-border/60 bg-muted/30">
          <p className="text-xs font-bold text-muted-foreground text-start mb-2">
            {t("chatbot.suggestionsTitle")}
          </p>
          <div className="flex flex-wrap gap-2">
            {activeSuggestions.map((sug, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => sendMessage(sug)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-muted dark:hover:bg-zinc-800 text-xs font-medium transition-colors border border-border dark:border-zinc-700 hover:border-primary/50 dark:hover:border-accent-foreground/50 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
              >
                <MessageSquare
                  className="w-3.5 h-3.5 text-primary dark:text-accent-foreground shrink-0"
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
          sendMessage();
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
          className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm hover:opacity-90 disabled:opacity-50 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        >
          <span>{t("chatbot.send")}</span>
          <Send className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
