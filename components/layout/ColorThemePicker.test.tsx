import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ColorThemePicker } from "./ColorThemePicker";
import { ThemeProvider } from "@/context/ThemeContext";
import { I18nProvider } from "@/context/I18nContext";

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <ThemeProvider>
      <I18nProvider>{ui}</I18nProvider>
    </ThemeProvider>
  );
}

describe("ColorThemePicker", () => {
  it("renders dropdown trigger with aria-haspopup and opens on click", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ColorThemePicker />);

    const trigger = screen.getByRole("button", {
      name: "Choisir une couleur d'accent",
    });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    // Open dropdown
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    // Listbox should be visible with all 6 options
    const listbox = screen.getByRole("listbox", {
      name: "Palette de couleurs",
    });
    expect(listbox).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(6);
  });

  it("selects a color theme and updates active selection", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ColorThemePicker />);

    const trigger = screen.getByRole("button", {
      name: "Choisir une couleur d'accent",
    });
    await user.click(trigger);

    const emeraldOption = screen.getByRole("option", {
      name: /Émeraude Cyber/i,
    });
    await user.click(emeraldOption);

    // Dropdown closes after selection
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-color-theme")).toBe(
      "emerald"
    );
  });

  it("closes dropdown on Escape key", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ColorThemePicker />);

    const trigger = screen.getByRole("button", {
      name: "Choisir une couleur d'accent",
    });
    await user.click(trigger);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("renders inline variant with radio group for mobile view", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ColorThemePicker variant="inline" />);

    const radiogroup = screen.getByRole("radiogroup", {
      name: "Palette de couleurs",
    });
    expect(radiogroup).toBeInTheDocument();

    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(6);

    // Click on Cosmic Violet radio
    const violetRadio = screen.getByRole("radio", { name: /Violet Nebula/i });
    await user.click(violetRadio);

    expect(violetRadio).toHaveAttribute("aria-checked", "true");
    expect(document.documentElement.getAttribute("data-color-theme")).toBe(
      "violet"
    );
  });
});
