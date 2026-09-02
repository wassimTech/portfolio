import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import { ProjectsSection } from "./ProjectsSection";

describe("ProjectsSection", () => {
  it("renders project section header and filter buttons", () => {
    render(<ProjectsSection />);

    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: /mes réalisations/i })
    ).toBeInTheDocument();
  });

  it("filters projects when clicking a category filter button", async () => {
    const { user } = render(<ProjectsSection />);

    const allBtn = screen.getByRole("button", { name: /tous/i });
    expect(allBtn).toHaveAttribute("aria-pressed", "true");

    const mobileBtn = screen.getByRole("button", {
      name: /applications mobiles/i,
    });
    await user.click(mobileBtn);

    expect(mobileBtn).toHaveAttribute("aria-pressed", "true");
    expect(allBtn).toHaveAttribute("aria-pressed", "false");
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
