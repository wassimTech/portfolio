import { NextRequest, NextResponse } from "next/server";
import { generateLocalChatResponse } from "@/lib/chat-engine";
import { Locale } from "@/types/cv";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, locale = "fr" } = body;

    if (!message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const safeLocale: Locale = locale === "en" ? "en" : "fr";

    // Check if external LLM API key (e.g., GEMINI_API_KEY) is available
    const rawApiKey = process.env.GEMINI_API_KEY;
    const geminiApiKey = rawApiKey?.replace(/^["']|["']$/g, "").trim();

    if (geminiApiKey) {
      try {
        const langName = safeLocale === "en" ? "English" : "French";
        const systemPrompt = `You are the official AI Portfolio Assistant for Wassim AHMED, a Senior Full Stack Developer & Team Leader.
Answer user questions accurately, engagingly, and professionally based on his verified background:
- 5+ years experience in Next.js, React, Vue.js, NestJS, Hono.js, React Native, Cloudflare Workers/R2/D1, Prisma, Docker, PostgreSQL, Three.js, GitLab CI/CD.
- Team Leader on ZorLife (React Native, 3D Three.js, Cloudflare D1/Workers, Stripe) and Bloom (React Native, Vue Admin, NestJS, Python).
- Built AI Workflow platform with devfactory-cli on NPM at TEKAB.DEV.
- Built URJOB AI recruitment platform with NestJS, Vue/Next.js.
- Instructed Full-Stack JS at GoMyCode (2019-2021).
- National Engineering Degree from ENIS (École Nationale d'Ingénieurs de Sfax).
- Email: wassim.ahmed.tech@gmail.com, Phone: +216 23 579 414, Sfax Tunisia.
Respond in ${langName} with clean markdown formatting.`;

        // Fast, high-throughput models
        const modelsToTry = ["gemini-3.5-flash-lite", "gemini-3.5-flash"];

        for (const model of modelsToTry) {
          try {
            const geminiRes = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  systemInstruction: {
                    parts: [{ text: systemPrompt }],
                  },
                  contents: [
                    {
                      role: "user",
                      parts: [{ text: message }],
                    },
                  ],
                  generationConfig: {
                    maxOutputTokens: 450,
                    temperature: 0.7,
                  },
                }),
                signal: AbortSignal.timeout(10000),
              }
            );

            if (geminiRes.ok) {
              const geminiData = await geminiRes.json();
              const replyText =
                geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
              if (replyText) {
                const fallback = generateLocalChatResponse(message, safeLocale);
                return NextResponse.json({
                  response: replyText.trim(),
                  suggestions: fallback.suggestions,
                });
              }
            }
          } catch (modelErr) {
            console.warn(`Gemini model ${model} error:`, modelErr);
          }
        }
      } catch (externalError) {
        console.warn(
          "External LLM error, falling back to local engine:",
          externalError
        );
      }
    }

    // Fallback to local intelligent CV knowledge engine
    const result = generateLocalChatResponse(message, safeLocale);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error processing chat request" },
      { status: 500 }
    );
  }
}
