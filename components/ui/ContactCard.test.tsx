import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Mail } from "lucide-react";
import { ContactCard } from "./ContactCard";

describe("ContactCard", () => {
  it("renders label, value, and icon with semantic article", () => {
    render(
      <ContactCard
        icon={Mail}
        label="Email"
        value="test@example.com"
        data-testid="contact-card"
      >
        <button type="button">Action</button>
      </ContactCard>
    );

    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
  });
});
