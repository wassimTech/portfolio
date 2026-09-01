import { describe, it, expect } from "vitest";
import { onRequestPost } from "../functions/api/chat";

describe("POST /api/chat (Cloudflare Pages Function)", () => {
  it("returns 400 if message is missing or empty", async () => {
    const request = new Request(
      "https://wassim-ahmed-portfolio.pages.dev/api/chat",
      {
        method: "POST",
        body: JSON.stringify({ message: "   " }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const response = await onRequestPost({ request, env: {} });
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe("Message is required");
  });

  it("returns 200 and chat response for valid French message", async () => {
    const request = new Request(
      "https://wassim-ahmed-portfolio.pages.dev/api/chat",
      {
        method: "POST",
        body: JSON.stringify({ message: "bonjour", locale: "fr" }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const response = await onRequestPost({ request, env: {} });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.response).toBeDefined();
    expect(data.response).toContain("Wassim AHMED");
    expect(Array.isArray(data.suggestions)).toBe(true);
  });

  it("returns 200 and English chat response when locale is en", async () => {
    const request = new Request(
      "https://wassim-ahmed-portfolio.pages.dev/api/chat",
      {
        method: "POST",
        body: JSON.stringify({ message: "hello", locale: "en" }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const response = await onRequestPost({ request, env: {} });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.response).toBeDefined();
    expect(data.response).toContain("Hello!");
    expect(Array.isArray(data.suggestions)).toBe(true);
  });
});
