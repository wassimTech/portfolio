import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@/test/test-utils";
import { EmbeddedChatbot } from "./EmbeddedChatbot";

describe("EmbeddedChatbot", () => {
  it("renders embedded chatbot with title, online badge, and welcome message", () => {
    render(<EmbeddedChatbot />);

    const region = screen.getByRole("region", { name: /assistant cv ia/i });
    expect(region).toBeInTheDocument();
    expect(screen.getByText(/assistant cv ia/i)).toBeInTheDocument();
    expect(screen.getByText(/en ligne/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /bonjour ! je suis l'assistant ia dédié au cv de wassim ahmed/i
      )
    ).toBeInTheDocument();
  });

  it("sends a user message and displays the assistant response via MSW", async () => {
    const { user } = render(<EmbeddedChatbot />);

    const input = screen.getByRole("textbox", {
      name: /ex: quelles sont ses compétences/i,
    });
    const sendButton = screen.getByRole("button", { name: /envoyer/i });

    await user.type(input, "Quels sont ses projets Cloudflare ?");
    await user.click(sendButton);

    expect(
      screen.getByText("Quels sont ses projets Cloudflare ?")
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText(
          /mocked ai response for "quels sont ses projets cloudflare \?"/i
        )
      ).toBeInTheDocument();
    });
  });

  it("sends message when clicking a suggested question chip", async () => {
    const { user } = render(<EmbeddedChatbot />);

    const suggestionButtons = screen.getAllByRole("button", { name: /qu/i });
    const suggestionButton = suggestionButtons[0];
    const suggestionText = suggestionButton.textContent || "";

    await user.click(suggestionButton);

    await waitFor(() => {
      expect(screen.getByText(suggestionText)).toBeInTheDocument();
    });
  });

  it("resets conversation when clicking clear button", async () => {
    const { user } = render(<EmbeddedChatbot />);

    const input = screen.getByRole("textbox", {
      name: /ex: quelles sont ses compétences/i,
    });
    const sendButton = screen.getByRole("button", { name: /envoyer/i });

    await user.type(input, "Test embedded chat reset");
    await user.click(sendButton);

    expect(screen.getByText("Test embedded chat reset")).toBeInTheDocument();

    const clearButton = screen.getByRole("button", { name: /effacer/i });
    await user.click(clearButton);

    expect(
      screen.queryByText("Test embedded chat reset")
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(
        /bonjour ! je suis l'assistant ia dédié au cv de wassim ahmed/i
      )
    ).toBeInTheDocument();
  });
});
