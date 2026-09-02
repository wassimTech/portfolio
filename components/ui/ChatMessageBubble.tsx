"use client";

import React from "react";
import { ChatMessage } from "@/types/cv";
import { Bot, User } from "lucide-react";

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

export function formatChatMessageContent(content: string): React.ReactNode[] {
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
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div
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
        {formatChatMessageContent(message.content)}
      </div>

      {!isAssistant && (
        <div className="w-7 h-7 shrink-0 rounded-lg bg-accent text-accent-foreground flex items-center justify-center mt-0.5">
          <User className="w-4 h-4" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
