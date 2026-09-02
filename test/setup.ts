import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { beforeAll, afterEach, afterAll, vi } from "vitest";
import { server } from "./mocks/server";

// Establish MSW API mocking before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
});

// Reset handlers and clean DOM between tests
afterEach(() => {
  cleanup();
  server.resetHandlers();
  localStorage.clear();
  vi.clearAllMocks();
});

// Clean up MSW after all tests finish
afterAll(() => {
  server.close();
});

// Polyfill window.matchMedia for JSDOM
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Polyfill IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn().mockReturnValue([]);
  unobserve = vi.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Polyfill ResizeObserver
class MockResizeObserver implements ResizeObserver {
  disconnect = vi.fn();
  observe = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
});

// Polyfill navigator.clipboard safely
if (!navigator.clipboard) {
  Object.defineProperty(navigator, "clipboard", {
    writable: true,
    configurable: true,
    value: {
      writeText: vi.fn().mockResolvedValue(undefined),
      readText: vi.fn().mockResolvedValue(""),
    },
  });
}

// Polyfill scrollTo and scrollIntoView
window.scrollTo = vi.fn();
if (typeof window.HTMLElement.prototype.scrollTo !== "function") {
  window.HTMLElement.prototype.scrollTo = vi.fn();
}
if (typeof window.HTMLElement.prototype.scrollIntoView !== "function") {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
}

// Polyfill HTMLDialogElement for JSDOM
if (typeof HTMLDialogElement !== "undefined") {
  HTMLDialogElement.prototype.showModal =
    HTMLDialogElement.prototype.showModal ||
    function (this: HTMLDialogElement) {
      this.setAttribute("open", "");
    };
  HTMLDialogElement.prototype.close =
    HTMLDialogElement.prototype.close ||
    function (this: HTMLDialogElement) {
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    };
}
