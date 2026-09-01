import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

describe("LanguageSwitcher", () => {
  it("renders FR and EN language options with the default language active", () => {
    render(<LanguageSwitcher />);

    const frButton = screen.getByRole("button", {
      name: /switch language to fr/i,
    });
    const enButton = screen.getByRole("button", {
      name: /switch language to en/i,
    });

    expect(frButton).toBeInTheDocument();
    expect(enButton).toBeInTheDocument();

    expect(frButton).toHaveAttribute("aria-pressed", "true");
    expect(enButton).toHaveAttribute("aria-pressed", "false");
  });

  it("updates the active language when clicking EN locale", async () => {
    const { user } = render(<LanguageSwitcher />);

    const enButton = screen.getByRole("button", {
      name: /switch language to en/i,
    });
    const frButton = screen.getByRole("button", {
      name: /switch language to fr/i,
    });

    await user.click(enButton);

    expect(enButton).toHaveAttribute("aria-pressed", "true");
    expect(frButton).toHaveAttribute("aria-pressed", "false");
  });
});
