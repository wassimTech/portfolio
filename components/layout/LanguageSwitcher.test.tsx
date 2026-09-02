import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

describe("LanguageSwitcher", () => {
  it("renders FR and EN language options with the default language active and flags rendered", () => {
    const { container } = render(<LanguageSwitcher />);

    const frButton = screen.getByRole("button", {
      name: /switch language to français/i,
    });
    const enButton = screen.getByRole("button", {
      name: /switch language to english/i,
    });

    expect(frButton).toBeInTheDocument();
    expect(enButton).toBeInTheDocument();

    expect(frButton).toHaveAttribute("aria-pressed", "true");
    expect(enButton).toHaveAttribute("aria-pressed", "false");

    // Verify SVG flags are present inside buttons
    const svgs = container.querySelectorAll("button svg");
    expect(svgs.length).toBe(2);
    svgs.forEach((svg) => {
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });
  });

  it("updates the active language when clicking EN locale", async () => {
    const { user } = render(<LanguageSwitcher />);

    const enButton = screen.getByRole("button", {
      name: /switch language to english/i,
    });
    const frButton = screen.getByRole("button", {
      name: /switch language to français/i,
    });

    await user.click(enButton);
    expect(enButton).toHaveAttribute("aria-pressed", "true");
    expect(frButton).toHaveAttribute("aria-pressed", "false");

    await user.click(frButton);
    expect(frButton).toHaveAttribute("aria-pressed", "true");
    expect(enButton).toHaveAttribute("aria-pressed", "false");
  });
});
