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

  it("calls Google Gemini API and returns dynamic response when GEMINI_API_KEY is present", async () => {
    const mockGeminiReply =
      "Wassim AHMED is an experienced Full Stack Developer and Cloud Architect with strong expertise in Next.js and Cloudflare.";

    // Temporarily mock fetch for Gemini API
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("generativelanguage.googleapis.com")) {
        return new Response(
          JSON.stringify({
            candidates: [
              {
                content: {
                  parts: [{ text: mockGeminiReply }],
                },
              },
            ],
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
      return originalFetch(input, init);
    };

    try {
      const request = new Request(
        "https://wassim-ahmed-portfolio.pages.dev/api/chat",
        {
          method: "POST",
          body: JSON.stringify({
            message: "Tell me about Wassim's cloud skills",
            locale: "en",
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const response = await onRequestPost({
        request,
        env: { GEMINI_API_KEY: "test-valid-key" },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.response).toBe(mockGeminiReply);
      expect(Array.isArray(data.suggestions)).toBe(true);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("falls back to local engine if Gemini API throws or fails", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("generativelanguage.googleapis.com")) {
        return new Response("Unauthorized", { status: 401 });
      }
      return originalFetch(input, init);
    };

    try {
      const request = new Request(
        "https://wassim-ahmed-portfolio.pages.dev/api/chat",
        {
          method: "POST",
          body: JSON.stringify({ message: "bonjour", locale: "fr" }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const response = await onRequestPost({
        request,
        env: { GEMINI_API_KEY: "invalid-key" },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.response).toContain("Wassim AHMED");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
