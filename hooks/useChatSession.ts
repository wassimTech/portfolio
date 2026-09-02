"use client";

import { useState, useCallback, useId } from "react";
import { useI18n } from "@/context/I18nContext";
import { chatSuggestions } from "@/data/cv";
import { ChatMessage } from "@/types/cv";
import { generateLocalChatResponse } from "@/lib/chat-engine";

function generateMessageId(prefix: string): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function useChatSession() {
  const { locale, t } = useI18n();
  const sessionInstanceId = useId();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: `welcome-${sessionInstanceId}`,
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

  const sendMessage = useCallback(
    async (textToSend?: string) => {
      const messageText = (textToSend || inputValue).trim();
      if (!messageText || isLoading) return;

      const userMessage: ChatMessage = {
        id: generateMessageId("user"),
        role: "user",
        content: messageText,
        timestamp: Date.now(),
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
            const localFallback = generateLocalChatResponse(
              messageText,
              locale
            );
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
          id: generateMessageId("assistant"),
          role: "assistant",
          content: replyContent || t("chatbot.error"),
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        if (
          suggestions &&
          Array.isArray(suggestions) &&
          suggestions.length > 0
        ) {
          setActiveSuggestions(suggestions);
        }
      } catch (error) {
        console.error("Chat request error:", error);
        const errorMessage: ChatMessage = {
          id: generateMessageId("error"),
          role: "assistant",
          content: t("chatbot.error"),
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [inputValue, isLoading, locale, t]
  );

  const clearChat = useCallback(() => {
    const welcomeText = t("chatbot.welcome");
    const initialSuggestions = chatSuggestions.map(
      (s) => s.query[locale] || s.query.fr
    );
    setMessages([
      {
        id: generateMessageId("welcome"),
        role: "assistant",
        content: welcomeText,
        timestamp: 1,
      },
    ]);
    setActiveSuggestions(initialSuggestions);
  }, [locale, t]);

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    activeSuggestions,
    sendMessage,
    clearChat,
  };
}
