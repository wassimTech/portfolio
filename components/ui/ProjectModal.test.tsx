import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@/test/test-utils";
import { ProjectModal } from "./ProjectModal";
import { projects } from "@/data/cv";
import { Project } from "@/types/cv";

describe("ProjectModal accessibility and interaction", () => {
  const sampleProject = projects[0];

  const projectWithUrls: Project = {
    ...sampleProject,
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example/repo",
  };

  it("does not render when isOpen is false or project is null", () => {
    const { rerender } = render(
      <ProjectModal project={sampleProject} isOpen={false} onClose={vi.fn()} />
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    rerender(<ProjectModal project={null} isOpen={true} onClose={vi.fn()} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders accessible dialog and focuses interactive control on open", async () => {
    const onClose = vi.fn();
    render(
      <ProjectModal project={sampleProject} isOpen={true} onClose={onClose} />
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");

    const closeButton = screen.getByRole("button", { name: /fermer/i });
    expect(closeButton).toBeInTheDocument();

    await waitFor(() => {
      expect(document.activeElement).toBe(closeButton);
    });
  });

  it("triggers onClose when pressing Escape key", async () => {
    const onClose = vi.fn();
    const { user } = render(
      <ProjectModal project={sampleProject} isOpen={true} onClose={onClose} />
    );

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("provides keyboard access to the scrollable container (tabindex 0)", () => {
    const { container } = render(
      <ProjectModal project={sampleProject} isOpen={true} onClose={vi.fn()} />
    );

    const scrollableDiv = container.querySelector(".overflow-y-auto");
    expect(scrollableDiv).toBeInTheDocument();
    expect(scrollableDiv).toHaveAttribute("tabindex", "0");
    expect(scrollableDiv).toHaveClass("flex-1");
    expect(scrollableDiv).toHaveClass("min-h-0");
  });

  it("handles keyboard navigation and scrolls with behavior auto", async () => {
    const { container, user } = render(
      <ProjectModal project={sampleProject} isOpen={true} onClose={vi.fn()} />
    );

    const scrollableDiv = container.querySelector(
      ".overflow-y-auto"
    ) as HTMLDivElement;
    const scrollByMock = vi.fn();
    scrollableDiv.scrollBy = scrollByMock;

    await user.keyboard("{ArrowDown}");
    expect(scrollByMock).toHaveBeenCalledWith({ top: 60, behavior: "auto" });

    await user.keyboard("{ArrowUp}");
    expect(scrollByMock).toHaveBeenCalledWith({ top: -60, behavior: "auto" });

    await user.keyboard("{PageDown}");
    expect(scrollByMock).toHaveBeenCalledWith({
      top: scrollableDiv.clientHeight * 0.8,
      behavior: "auto",
    });
  });

  it("scrolls to top on Home key and to bottom on End key", async () => {
    const { container, user } = render(
      <ProjectModal project={sampleProject} isOpen={true} onClose={vi.fn()} />
    );

    const scrollableDiv = container.querySelector(
      ".overflow-y-auto"
    ) as HTMLDivElement;
    const scrollToMock = vi.fn();
    scrollableDiv.scrollTo = scrollToMock;

    await user.keyboard("{Home}");
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: "auto" });

    await user.keyboard("{End}");
    expect(scrollToMock).toHaveBeenCalledWith({
      top: scrollableDiv.scrollHeight,
      behavior: "auto",
    });
  });

  it("does not intercept arrow keys if focus is within a select element", async () => {
    const { container, user } = render(
      <ProjectModal project={sampleProject} isOpen={true} onClose={vi.fn()} />
    );

    const scrollableDiv = container.querySelector(
      ".overflow-y-auto"
    ) as HTMLDivElement;
    const scrollByMock = vi.fn();
    scrollableDiv.scrollBy = scrollByMock;

    const select = document.createElement("select");
    document.body.appendChild(select);
    select.focus();

    await user.keyboard("{ArrowDown}");
    expect(scrollByMock).not.toHaveBeenCalled();

    document.body.removeChild(select);
  });

  it("forwards wheel events on header/backdrop to the scroll container", () => {
    const { container } = render(
      <ProjectModal project={sampleProject} isOpen={true} onClose={vi.fn()} />
    );

    const dialog = screen.getByRole("dialog");
    const scrollableDiv = container.querySelector(
      ".overflow-y-auto"
    ) as HTMLDivElement;

    const wheelEvent = new WheelEvent("wheel", {
      bubbles: true,
      cancelable: true,
      deltaY: 100,
    });
    dialog.dispatchEvent(wheelEvent);

    expect(scrollableDiv.scrollTop).toBe(100);
  });

  it("renders project details, accomplishments, tech badges, and action links", () => {
    render(
      <ProjectModal project={projectWithUrls} isOpen={true} onClose={vi.fn()} />
    );

    expect(screen.getByText(projectWithUrls.title)).toBeInTheDocument();
    projectWithUrls.technologies.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });

    const demoLink = screen.getByRole("link", { name: /démo en ligne/i });
    expect(demoLink).toBeInTheDocument();
    expect(demoLink).toHaveAttribute("target", "_blank");
    expect(demoLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(demoLink.getAttribute("aria-label")).toContain("nouvel onglet");

    const githubLink = screen.getByRole("link", { name: /code source/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("target", "_blank");
  });

  it("renders english notice for external links when locale is english", () => {
    render(
      <ProjectModal
        project={projectWithUrls}
        isOpen={true}
        onClose={vi.fn()}
      />,
      { initialLocale: "en" }
    );

    const demoLink = screen.getByRole("link", { name: /live demo/i });
    expect(demoLink).toBeInTheDocument();
    expect(demoLink.getAttribute("aria-label")).toContain("opens in new tab");
  });
});
