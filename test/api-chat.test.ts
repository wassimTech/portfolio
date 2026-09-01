import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/chat/route";

describe("POST /api/chat", () => {
  it("returns 400 if message is missing or empty", async () => {
    const req = new NextRequest("http://localhost:3000/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: "   " }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe("Message is required");
  });

  it("returns 200 and chat response for valid French message", async () => {
    const req = new NextRequest("http://localhost:3000/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: "bonjour", locale: "fr" }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(req);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.response).toBeDefined();
    expect(data.response).toContain("Wassim AHMED");
    expect(Array.isArray(data.suggestions)).toBe(true);
  });

  it("returns 200 and English chat response when locale is en", async () => {
    const req = new NextRequest("http://localhost:3000/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: "hello", locale: "en" }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(req);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.response).toBeDefined();
    expect(data.response).toContain("Hello!");
    expect(Array.isArray(data.suggestions)).toBe(true);
  });
});
