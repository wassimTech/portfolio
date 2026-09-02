import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";

describe("Badge Component", () => {
  it("renders with default secondary variant and text content", () => {
    render(<Badge>React Native</Badge>);
    const badge = screen.getByText("React Native");
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain("bg-secondary");
    expect(badge.className).toContain("text-secondary-foreground");
  });

  it("renders with accent variant for highlight or category", () => {
    render(<Badge variant="accent">Fullstack</Badge>);
    const badge = screen.getByText("Fullstack");
    expect(badge.className).toContain("bg-accent");
    expect(badge.className).toContain("text-accent-foreground");
  });

  it("renders with success variant and accessible contrast classes", () => {
    render(<Badge variant="success">Online</Badge>);
    const badge = screen.getByText("Online");
    expect(badge.className).toContain("bg-emerald-500/15");
    expect(badge.className).toContain("text-emerald-800");
    expect(badge.className).toContain("dark:text-emerald-300");
  });

  it("supports pill shape and size variations", () => {
    render(
      <Badge shape="pill" size="lg" data-testid="pill-badge">
        Pill
      </Badge>
    );
    const badge = screen.getByTestId("pill-badge");
    expect(badge.className).toContain("rounded-full");
    expect(badge.className).toContain("px-3.5");
  });

  it("spreads HTML attributes such as aria-label and role", () => {
    render(
      <Badge role="status" aria-label="Available for hire">
        Available
      </Badge>
    );
    const badge = screen.getByRole("status");
    expect(badge).toHaveAttribute("aria-label", "Available for hire");
  });
});
