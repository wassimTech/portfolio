import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/test/test-utils";
import { personalInfo } from "@/data/cv";
import { ContactSection } from "./ContactSection";

describe("ContactSection", () => {
  it("renders contact section with email, phone, location, and social links", () => {
    render(<ContactSection />);

    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByText(personalInfo.email)).toBeInTheDocument();
    expect(screen.getByText(personalInfo.phone)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      personalInfo.linkedin
    );
  });

  it("shows confirmation state when email copy button is clicked", async () => {
    const spy = vi.spyOn(navigator.clipboard, "writeText");
    const { user } = render(<ContactSection />);

    const copyEmailButton = screen.getByRole("button", {
      name: /copier l'email/i,
    });
    await user.click(copyEmailButton);

    expect(spy).toHaveBeenCalledWith(personalInfo.email);
    expect(screen.getByRole("status")).toHaveTextContent(
      /email copié dans le presse-papier/i
    );
  });

  it("shows confirmation state when phone copy button is clicked", async () => {
    const spy = vi.spyOn(navigator.clipboard, "writeText");
    const { user } = render(<ContactSection />);

    const copyPhoneButton = screen.getByRole("button", {
      name: /copier le téléphone/i,
    });
    await user.click(copyPhoneButton);

    expect(spy).toHaveBeenCalledWith(personalInfo.phone);
    expect(screen.getByRole("status")).toHaveTextContent(/numéro copié/i);
  });
});
