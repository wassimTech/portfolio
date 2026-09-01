import { http, HttpResponse } from "msw";

export const handlers = [
  // Chatbot API handler
  http.post("/api/chat", async ({ request }) => {
    const body = (await request.json()) as {
      message?: string;
      locale?: string;
    };
    if (!body?.message) {
      return HttpResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }
    return HttpResponse.json({
      response: `Mocked AI response for "${body.message}". Wassim AHMED is a Senior Full Stack Developer & Team Leader.`,
      suggestions: ["Tell me about ZorLife", "What are his Cloudflare skills?"],
    });
  }),

  // Sample contact submission handler
  http.post("/api/contact", async ({ request }) => {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };
    if (!body?.email || !body?.message) {
      return HttpResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }
    return HttpResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  }),

  // Sample portfolio stats / data API handler
  http.get("/api/stats", () => {
    return HttpResponse.json({
      experienceYears: 6,
      completedProjects: 15,
      technologiesCount: 25,
    });
  }),
];
