import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@/test/test-utils";
import { ChatbotWidget } from "./ChatbotWidget";

describe("ChatbotWidget", () => {
  it("renders launcher button in closed state by default", () => {
    render(<ChatbotWidget />);

    const openButton = screen.getByRole("button", {
      name: /poser une question à l'ia/i,
    });
    expect(openButton).toBeInTheDocument();
    expect(openButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens modal when clicking launcher button and displays welcome message", async () => {
    const { user } = render(<ChatbotWidget />);

    const openButton = screen.getByRole("button", {
      name: /poser une question à l'ia/i,
    });
    await user.click(openButton);

    const dialog = screen.getByRole("dialog", { name: /assistant cv ia/i });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText(/assistant cv ia/i)).toBeInTheDocument();
    expect(
      screen.getByText(/bonjour ! je suis l'assistant ia/i)
    ).toBeInTheDocument();
  });

  it("sends a user message and displays the assistant response via MSW", async () => {
    const { user } = render(<ChatbotWidget initialOpen={true} />);

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
    const { user } = render(<ChatbotWidget initialOpen={true} />);

    const suggestionButton = screen.getAllByRole("button", { name: /qu/i })[0];
    const suggestionText = suggestionButton.textContent || "";

    await user.click(suggestionButton);

    await waitFor(() => {
      expect(screen.getByText(suggestionText)).toBeInTheDocument();
    });
  });

  it("closes modal when clicking close button", async () => {
    const { user } = render(<ChatbotWidget initialOpen={true} />);

    const closeButton = screen.getByRole("button", {
      name: /fermer l'assistant/i,
    });
    await user.click(closeButton);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes modal when pressing Escape key", async () => {
    const { user } = render(<ChatbotWidget initialOpen={true} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("resets conversation when clicking clear button", async () => {
    const { user } = render(<ChatbotWidget initialOpen={true} />);

    const input = screen.getByRole("textbox", {
      name: /ex: quelles sont ses compétences/i,
    });
    await user.type(input, "Test message to clear");
    await user.click(screen.getByRole("button", { name: /envoyer/i }));

    expect(screen.getByText("Test message to clear")).toBeInTheDocument();

    const clearButton = screen.getByRole("button", { name: /effacer/i });
    await user.click(clearButton);

    expect(screen.queryByText("Test message to clear")).not.toBeInTheDocument();
    expect(
      screen.getByText(/bonjour ! je suis l'assistant ia/i)
    ).toBeInTheDocument();
  });
});
