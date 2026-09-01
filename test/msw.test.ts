import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "./mocks/server";

describe("MSW (Mock Service Worker) integration", () => {
  it("intercepts GET /api/stats with default mock data", async () => {
    const response = await fetch("/api/stats");
    expect(response.ok).toBe(true);

    const data = await response.json();
    expect(data).toEqual({
      experienceYears: 6,
      completedProjects: 15,
      technologiesCount: 25,
    });
  });

  it("intercepts POST /api/contact with success response", async () => {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "John Doe",
        email: "john@example.com",
        message: "Hello Wassim!",
      }),
    });

    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.message).toBe("Message sent successfully");
  });

  it("returns 400 when required fields are missing", async () => {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "John Doe" }),
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toBe("Missing required fields");
  });

  it("allows runtime handler overrides via server.use", async () => {
    server.use(
      http.get("/api/stats", () => {
        return HttpResponse.json({
          experienceYears: 10,
          completedProjects: 50,
          technologiesCount: 40,
        });
      })
    );

    const response = await fetch("/api/stats");
    const data = await response.json();
    expect(data.experienceYears).toBe(10);
    expect(data.completedProjects).toBe(50);
  });
});
