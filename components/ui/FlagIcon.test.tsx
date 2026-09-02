import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@/test/test-utils";
import { FlagIcon, FranceFlag, UkFlag, TunisiaFlag } from "./FlagIcon";

describe("FlagIcon", () => {
  it("renders France flag with default styling and aria-hidden", () => {
    const { container } = render(<FlagIcon country="fr" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("viewBox", "0 0 640 480");
  });

  it("renders UK flag when country is en or gb", () => {
    const { container: containerEn } = render(<FlagIcon country="en" />);
    const svgEn = containerEn.querySelector("svg");
    expect(svgEn).toBeInTheDocument();

    const { container: containerGb } = render(<FlagIcon country="gb" />);
    const svgGb = containerGb.querySelector("svg");
    expect(svgGb).toBeInTheDocument();
  });

  it("renders Tunisia flag when country is ar or tn", () => {
    const { container: containerAr } = render(<FlagIcon country="ar" />);
    const svgAr = containerAr.querySelector("svg");
    expect(svgAr).toBeInTheDocument();

    const { container: containerTn } = render(<FlagIcon country="tn" />);
    const svgTn = containerTn.querySelector("svg");
    expect(svgTn).toBeInTheDocument();
  });

  it("renders standalone FranceFlag, UkFlag, and TunisiaFlag correctly", () => {
    const { container: cFr } = render(<FranceFlag className="custom-fr" />);
    expect(cFr.querySelector("svg")).toHaveClass("custom-fr");

    const { container: cUk } = render(<UkFlag className="custom-uk" />);
    expect(cUk.querySelector("svg")).toHaveClass("custom-uk");

    const { container: cTn } = render(<TunisiaFlag className="custom-tn" />);
    expect(cTn.querySelector("svg")).toHaveClass("custom-tn");
  });
});
