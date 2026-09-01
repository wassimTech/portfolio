import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import { ProjectsSection } from "./ProjectsSection";

describe("ProjectsSection", () => {
  it("renders project section header and filter tabs", () => {
    render(<ProjectsSection />);

    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(
      screen.getByRole("tablist", { name: /filter projects by category/i })
    ).toBeInTheDocument();
  });

  it("filters projects when clicking a category filter tab", async () => {
    const { user } = render(<ProjectsSection />);

    const allTab = screen.getByRole("tab", { name: /tous/i });
    expect(allTab).toHaveAttribute("aria-selected", "true");

    const mobileTab = screen.getByRole("tab", { name: /mobile/i });
    await user.click(mobileTab);

    expect(mobileTab).toHaveAttribute("aria-selected", "true");
    expect(allTab).toHaveAttribute("aria-selected", "false");
  });

  it("opens deep-dive project modal when clicking details button and closes it", async () => {
    const { user } = render(<ProjectsSection />);

    const detailsButtons = screen.getAllByRole("button", {
      name: /détails & réalisations/i,
    });
    expect(detailsButtons.length).toBeGreaterThan(0);

    await user.click(detailsButtons[0]);

    // Modal is now open
    const modalDialog = screen.getByRole("dialog");
    expect(modalDialog).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /réalisations clés & responsabilités/i,
      })
    ).toBeInTheDocument();

    // Close button
    const closeButton = screen.getByRole("button", { name: /fermer/i });
    await user.click(closeButton);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
