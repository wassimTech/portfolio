import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TechIcon } from "./TechIcon";

describe("TechIcon", () => {
  it("renders image logo for matched tech name", () => {
    render(<TechIcon name="Next.js" />);
    const img = screen.getByRole("img", { name: /next\.js logo/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/logos/nextjs-icon.svg");
  });

  it("renders image logo for React", () => {
    render(<TechIcon name="React" />);
    const img = screen.getByRole("img", { name: /react logo/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/logos/react.svg");
  });

  it("renders image logo for Cloudflare Workers", () => {
    render(<TechIcon name="Cloudflare Workers" />);
    const img = screen.getByRole("img", { name: /cloudflare workers logo/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/logos/cloudflare-workers-icon.svg");
  });

  it("renders fallback svg when tech icon is not in map", () => {
    const { container } = render(<TechIcon name="UnknownTechStackXYZ" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
