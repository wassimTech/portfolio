import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@/test/test-utils";
import { ProjectModal } from "./ProjectModal";
import { projects } from "@/data/cv";

describe("ProjectModal accessibility and interaction", () => {
  const sampleProject = projects[0];

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
  });
});
