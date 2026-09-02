import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme } from "./ThemeContext";

function ThemeConsumer() {
  const {
    theme,
    toggleTheme,
    colorTheme,
    setColorTheme,
    availableColorThemes,
  } = useTheme();

  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <span data-testid="current-color">{colorTheme}</span>
      <button onClick={toggleTheme}>Toggle Mode</button>
      <button onClick={() => setColorTheme("emerald")}>Set Emerald</button>
      <button onClick={() => setColorTheme("cyan")}>Set Cyan</button>
      <span data-testid="available-count">{availableColorThemes.length}</span>
    </div>
  );
}

describe("ThemeContext", () => {
  it("provides default dark theme, default orange color, and sets html attributes", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId("current-theme")).toHaveTextContent("dark");
    expect(screen.getByTestId("current-color")).toHaveTextContent("orange");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.getAttribute("data-color-theme")).toBe(
      "orange"
    );
    expect(screen.getByTestId("available-count")).toHaveTextContent("6");
  });

  it("toggles theme from dark to light and back to dark", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    const button = screen.getByRole("button", { name: "Toggle Mode" });

    // Toggle to Light
    await user.click(button);
    expect(screen.getByTestId("current-theme")).toHaveTextContent("light");
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    // Toggle back to Dark
    await user.click(button);
    expect(screen.getByTestId("current-theme")).toHaveTextContent("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.classList.contains("light")).toBe(false);
  });

  it("updates colorTheme and sets data-color-theme attribute on documentElement", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    const emeraldBtn = screen.getByRole("button", { name: "Set Emerald" });
    await user.click(emeraldBtn);

    expect(screen.getByTestId("current-color")).toHaveTextContent("emerald");
    expect(document.documentElement.getAttribute("data-color-theme")).toBe(
      "emerald"
    );
    expect(localStorage.getItem("portfolio_color_theme")).toBe("emerald");

    const cyanBtn = screen.getByRole("button", { name: "Set Cyan" });
    await user.click(cyanBtn);

    expect(screen.getByTestId("current-color")).toHaveTextContent("cyan");
    expect(document.documentElement.getAttribute("data-color-theme")).toBe(
      "cyan"
    );
  });

  it("throws error when useTheme is called outside ThemeProvider", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<ThemeConsumer />)).toThrow(
      "useTheme must be used within a ThemeProvider"
    );

    consoleError.mockRestore();
  });
});
