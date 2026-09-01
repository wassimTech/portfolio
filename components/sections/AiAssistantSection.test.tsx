import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import { AiAssistantSection } from "./AiAssistantSection";

describe("AiAssistantSection", () => {
  it("renders the AI assistant section with header, badges, and embedded chatbot", () => {
    render(<AiAssistantSection />);

    expect(
      screen.getByRole("region", { name: /ai assistant section/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /assistant virtuel ia/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/cloudflare workers ai & rag/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /assistant cv ia/i })
    ).toBeInTheDocument();
  });
});
