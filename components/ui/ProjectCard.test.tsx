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

  it("renders verified client review badge and action buttons when available", () => {
    // Find ZorLife project which has demoUrl and testimonial
    const zorlifeProject = projects.find((p) => p.id === "zorlife-mobile-app");
    expect(zorlifeProject).toBeDefined();

    if (zorlifeProject) {
      render(
        <ProjectCard project={zorlifeProject} onSelectProject={vi.fn()} />
      );

      // Client review badge is displayed
      expect(screen.getByText(/Avis Client/i)).toBeInTheDocument();

      // Demo link and LinkedIn review link are rendered
      const links = screen.getAllByRole("link");
      const linkedInLink = links.find((l) =>
        l.getAttribute("href")?.includes("linkedin.com")
      );
      expect(linkedInLink).toBeDefined();
      expect(linkedInLink).toHaveAttribute("target", "_blank");
    }
  });

  it("renders video demo action button for projects with videoUrl", () => {
    const bloomProject = projects.find((p) => p.id === "bloom-photo-memories");
    expect(bloomProject).toBeDefined();

    if (bloomProject) {
      render(<ProjectCard project={bloomProject} onSelectProject={vi.fn()} />);

      const links = screen.getAllByRole("link");
      const videoLink = links.find((l) =>
        l.getAttribute("href")?.includes("instagram.com")
      );
      expect(videoLink).toBeDefined();
      expect(videoLink).toHaveAttribute("target", "_blank");
    }
  });

  it("renders website link for projects with websiteUrl", () => {
    const obydoProject = projects.find(
      (p) => p.id === "obydo-unfold-management"
    );
    expect(obydoProject).toBeDefined();

    if (obydoProject) {
      render(<ProjectCard project={obydoProject} onSelectProject={vi.fn()} />);

      const links = screen.getAllByRole("link");
      const websiteLink = links.find((l) =>
        l.getAttribute("href")?.includes("obydo.fr")
      );
      expect(websiteLink).toBeDefined();
      expect(websiteLink).toHaveAttribute("target", "_blank");
    }
  });

  it("renders both live app and showcase website links for URJOB on card", () => {
    const urjobProject = projects.find((p) => p.id === "urjob-ai-recruitment");
    expect(urjobProject).toBeDefined();

    if (urjobProject) {
      render(<ProjectCard project={urjobProject} onSelectProject={vi.fn()} />);

      const links = screen.getAllByRole("link");
      const appLink = links.find(
        (l) => l.getAttribute("href") === "https://app.urjob.ai/"
      );
      expect(appLink).toBeDefined();

      const websiteLink = links.find((l) =>
        l.getAttribute("href")?.includes("urjob.ai/index.html")
      );
      expect(websiteLink).toBeDefined();
    }
  });
});
