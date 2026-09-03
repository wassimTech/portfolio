import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/test/test-utils";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/data/cv";

describe("ProjectCard Accessibility & Rendering", () => {
  const sampleProject = projects[0]; // has more than 4 technologies

  it("renders card with title, role and tech tags", () => {
    const onSelect = vi.fn();
    render(<ProjectCard project={sampleProject} onSelectProject={onSelect} />);

    expect(
      screen.getByRole("heading", { level: 3, name: sampleProject.title })
    ).toBeInTheDocument();

    const roleElement = screen.getByText(sampleProject.role.fr);
    expect(roleElement).toBeInTheDocument();
    expect(roleElement.className).toContain("text-accent-foreground");
  });

  it("renders extra tech badge without prohibited aria-label and provides accessible sr-only text", () => {
    const onSelect = vi.fn();
    const { container } = render(
      <ProjectCard project={sampleProject} onSelectProject={onSelect} />
    );

    const extraCount = sampleProject.technologies.length - 4;
    expect(extraCount).toBeGreaterThan(0);

    // Visual element has +X and aria-hidden="true"
    const visualPlus = screen.getByText(`+${extraCount}`);
    expect(visualPlus).toHaveAttribute("aria-hidden", "true");

    // Accessible sr-only element exists
    const srOnlyText = container.querySelector(".sr-only");
    expect(srOnlyText).toBeInTheDocument();
    expect(srOnlyText?.textContent).toContain(`+${extraCount}`);

    // Crucial: The parent Badge element (a generic span) must NOT have an aria-label attribute
    const badgeSpan = visualPlus.parentElement;
    expect(badgeSpan).not.toHaveAttribute("aria-label");
  });

  it("triggers onSelectProject when clicking details button", async () => {
    const onSelect = vi.fn();
    const { user } = render(
      <ProjectCard project={sampleProject} onSelectProject={onSelect} />
    );

    const detailsBtn = screen.getByRole("button", {
      name: new RegExp(sampleProject.title, "i"),
    });
    await user.click(detailsBtn);

    expect(onSelect).toHaveBeenCalledWith(sampleProject);
  });
});
