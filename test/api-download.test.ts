import { describe, it, expect } from "vitest";
import { onRequestGet } from "../functions/api/download";

describe("GET /api/download (Cloudflare Pages Function)", () => {
  it("redirects to French CV for ?file=cv-fr", async () => {
    const request = new Request(
      "https://wassim-ahmed-portfolio.pages.dev/api/download?file=cv-fr"
    );
    const response = await onRequestGet({ request });

    expect(response.status).toBe(307);
    const location = response.headers.get("location");
    expect(location).toContain("/CV-Wassim-AHMED-FR.pdf");
  });

  it("redirects to English CV for ?file=cv-en", async () => {
    const request = new Request(
      "https://wassim-ahmed-portfolio.pages.dev/api/download?file=cv-en"
    );
    const response = await onRequestGet({ request });

    expect(response.status).toBe(307);
    const location = response.headers.get("location");
    expect(location).toContain("/Resume-Wassim-AHMED-EN.pdf");
  });

  it("redirects to Markdown CV for ?file=cv-md", async () => {
    const request = new Request(
      "https://wassim-ahmed-portfolio.pages.dev/api/download?file=cv-md"
    );
    const response = await onRequestGet({ request });

    expect(response.status).toBe(307);
    const location = response.headers.get("location");
    expect(location).toContain("/CV-Wassim-AHMED.md");
  });

  it("defaults to French CV when no file param is provided", async () => {
    const request = new Request(
      "https://wassim-ahmed-portfolio.pages.dev/api/download"
    );
    const response = await onRequestGet({ request });

    expect(response.status).toBe(307);
    const location = response.headers.get("location");
    expect(location).toContain("/CV-Wassim-AHMED-FR.pdf");
  });

  it("defaults to French CV for unknown file key", async () => {
    const request = new Request(
      "https://wassim-ahmed-portfolio.pages.dev/api/download?file=unknown-key"
    );
    const response = await onRequestGet({ request });

    expect(response.status).toBe(307);
    const location = response.headers.get("location");
    expect(location).toContain("/CV-Wassim-AHMED-FR.pdf");
  });
});
