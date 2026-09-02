import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import { ExperienceSection } from "./ExperienceSection";

describe("ExperienceSection (Qualifications)", () => {
  it("renders qualification section heading and tabs", () => {
    render(<ExperienceSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: /qualification/i })
    ).toBeInTheDocument();

    const educationTab = screen.getByRole("tab", { name: /formation/i });
    const workTab = screen.getByRole("tab", { name: /expérience/i });

    expect(educationTab).toBeInTheDocument();
    expect(workTab).toBeInTheDocument();
    expect(educationTab).toHaveAttribute("aria-selected", "true");
    expect(workTab).toHaveAttribute("aria-selected", "false");
  });

  it("displays education degrees by default and switches to work experience", async () => {
    const { user } = render(<ExperienceSection />);

    // By default Education tab is active
    const educationItems = screen.getAllByText(/diplôme national d’ingénieur/i);
    expect(educationItems.length).toBeGreaterThan(0);

    const schoolItems = screen.getAllByText(
      /école nationale d’ingénieurs de sfax/i
    );
    expect(schoolItems.length).toBeGreaterThan(0);

    // Switch to Work tab
    const workTab = screen.getByRole("tab", { name: /expérience/i });
    await user.click(workTab);

    expect(workTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getAllByText("TEKAB.DEV").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Sastec").length).toBeGreaterThan(0);
  });
});
