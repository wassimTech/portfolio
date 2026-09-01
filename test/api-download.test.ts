import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/download/route";

describe("GET /api/download", () => {
  it("redirects to French CV for ?file=cv-fr", async () => {
    const req = new NextRequest(
      "http://localhost:3000/api/download?file=cv-fr"
    );
    const response = await GET(req);

    expect(response.status).toBe(307);
    const location = response.headers.get("location");
    expect(location).toContain("/CV-Wassim-AHMED-FR.pdf");
  });

  it("redirects to English CV for ?file=cv-en", async () => {
    const req = new NextRequest(
      "http://localhost:3000/api/download?file=cv-en"
    );
    const response = await GET(req);

    expect(response.status).toBe(307);
    const location = response.headers.get("location");
    expect(location).toContain("/Resume-Wassim-AHMED-EN.pdf");
  });

  it("redirects to Markdown CV for ?file=cv-md", async () => {
    const req = new NextRequest(
      "http://localhost:3000/api/download?file=cv-md"
    );
    const response = await GET(req);

    expect(response.status).toBe(307);
    const location = response.headers.get("location");
    expect(location).toContain("/CV-Wassim-AHMED.md");
  });

  it("defaults to French CV when no file param is provided", async () => {
    const req = new NextRequest("http://localhost:3000/api/download");
    const response = await GET(req);

    expect(response.status).toBe(307);
    const location = response.headers.get("location");
    expect(location).toContain("/CV-Wassim-AHMED-FR.pdf");
  });

  it("defaults to French CV for unknown file key", async () => {
    const req = new NextRequest(
      "http://localhost:3000/api/download?file=unknown-key"
    );
    const response = await GET(req);

    expect(response.status).toBe(307);
    const location = response.headers.get("location");
    expect(location).toContain("/CV-Wassim-AHMED-FR.pdf");
  });
});
