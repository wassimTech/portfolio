import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import { SkillsSection } from "./SkillsSection";

describe("SkillsSection", () => {
  it("renders section title and skill categories", () => {
    render(<SkillsSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: /compétences/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Langages et technologies/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /Frameworks/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /Bibliothèques/i })
    ).toBeInTheDocument();
  });

  it("switches category filter buttons and shows only selected category", async () => {
    const { user } = render(<SkillsSection />);

    const frameworksBtn = screen.getByRole("button", { name: /Frameworks/i });
    await user.click(frameworksBtn);

    expect(frameworksBtn).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("NestJS")).toBeInTheDocument();
    expect(screen.getByText("Express")).toBeInTheDocument();
    expect(screen.queryByText("HTML")).not.toBeInTheDocument();

    const allBtn = screen.getByRole("button", { name: /Toutes/i });
    await user.click(allBtn);
    expect(allBtn).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("HTML")).toBeInTheDocument();
  });
});
