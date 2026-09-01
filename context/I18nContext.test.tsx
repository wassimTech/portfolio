import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { I18nProvider, useI18n } from "./I18nContext";

function TestConsumer() {
  const { locale, setLocale, dir, t } = useI18n();

  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="dir">{dir}</span>
      <span data-testid="translation">{t("nav.about")}</span>
      <button onClick={() => setLocale("en")}>Set English</button>
      <button onClick={() => setLocale("fr")}>Set French</button>
    </div>
  );
}

describe("I18nContext", () => {
  it("provides default french locale and LTR direction", () => {
    render(
      <I18nProvider>
        <TestConsumer />
      </I18nProvider>
    );

    expect(screen.getByTestId("locale")).toHaveTextContent("fr");
    expect(screen.getByTestId("dir")).toHaveTextContent("ltr");
    expect(screen.getByTestId("translation")).toHaveTextContent("À propos");
  });

  it("switches to English with LTR direction", async () => {
    const user = userEvent.setup();
    render(
      <I18nProvider>
        <TestConsumer />
      </I18nProvider>
    );

    await user.click(screen.getByRole("button", { name: "Set English" }));

    expect(screen.getByTestId("locale")).toHaveTextContent("en");
    expect(screen.getByTestId("dir")).toHaveTextContent("ltr");
    expect(screen.getByTestId("translation")).toHaveTextContent("About");
  });

  it("falls back to French translation or key path when key is not found", () => {
    function FallbackConsumer() {
      const { t } = useI18n();
      return <span data-testid="missing-key">{t("non.existent.key")}</span>;
    }

    render(
      <I18nProvider>
        <FallbackConsumer />
      </I18nProvider>
    );

    expect(screen.getByTestId("missing-key")).toHaveTextContent(
      "non.existent.key"
    );
  });

  it("throws error when useI18n is used outside I18nProvider", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<TestConsumer />)).toThrow(
      "useI18n must be used within an I18nProvider"
    );

    consoleError.mockRestore();
  });
});
