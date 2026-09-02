import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/test/test-utils";
import { SkipLink } from "./SkipLink";

describe("SkipLink", () => {
  it("renders skip link with default href pointing to #main-content and accessible French text", () => {
    render(<SkipLink />);

    const link = screen.getByRole("link", {
      name: /passer au contenu principal/i,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "#main-content");
  });

  it("renders English text when locale is set to EN", () => {
    render(<SkipLink />, { initialLocale: "en" });

    const link = screen.getByRole("link", {
      name: /skip to main content/i,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "#main-content");
  });

  it("supports custom targetId and custom children", () => {
    render(<SkipLink targetId="custom-section">Go to content</SkipLink>);

    const link = screen.getByRole("link", {
      name: /go to content/i,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "#custom-section");
  });

  it("focuses and scrolls to target element on click", async () => {
    const { user } = render(
      <div>
        <SkipLink targetId="test-target" />
        <main id="test-target" tabIndex={-1}>
          Target Content
        </main>
      </div>
    );

    const link = screen.getByRole("link", {
      name: /passer au contenu principal/i,
    });
    const target = screen.getByText("Target Content");

    const scrollIntoViewMock = vi.fn();
    target.scrollIntoView = scrollIntoViewMock;

    await user.click(link);

    expect(document.activeElement).toBe(target);
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });
  });
});
