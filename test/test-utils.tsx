import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { I18nProvider } from "@/context/I18nContext";
import { ThemeProvider } from "@/context/ThemeContext";

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  initialLocale?: "fr" | "ar" | "en";
  initialTheme?: "dark" | "light";
}

function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  );
}

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  if (options?.initialLocale) {
    localStorage.setItem("portfolio_locale", options.initialLocale);
  }
  if (options?.initialTheme) {
    localStorage.setItem("portfolio_theme", options.initialTheme);
  }

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: AllProviders, ...options }),
  };
};

export * from "@testing-library/react";
export { customRender as render, userEvent };
