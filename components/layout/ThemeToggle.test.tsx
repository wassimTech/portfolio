import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
  it("renders theme toggle button with initial dark mode label", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button", {
      name: /switch to light theme/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("toggles aria-label when clicked", async () => {
    const { user } = render(<ThemeToggle />);

    const button = screen.getByRole("button", {
      name: /switch to light theme/i,
    });
    await user.click(button);

    expect(
      screen.getByRole("button", { name: /switch to dark theme/i })
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /switch to dark theme/i })
    );
    expect(
      screen.getByRole("button", { name: /switch to light theme/i })
    ).toBeInTheDocument();
  });
});
