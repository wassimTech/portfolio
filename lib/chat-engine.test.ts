import { describe, it, expect } from "vitest";
import { generateLocalChatResponse } from "./chat-engine";

describe("generateLocalChatResponse", () => {
  it("handles greetings with warm welcoming responses without project dumping", () => {
    const resHello = generateLocalChatResponse("hello", "en");
    expect(resHello.response).toContain("Hello! 👋");
    expect(resHello.response).not.toContain(
      "Wassim developed the Collaborative Workflow"
    );

    const resBonjour = generateLocalChatResponse("bonjour !", "fr");
    expect(resBonjour.response).toContain("Bonjour ! 👋");
    expect(resBonjour.response).not.toContain("Wassim a conçu et développé");

    const resSalut = generateLocalChatResponse("salut comment ça va ?", "fr");
    expect(resSalut.response).toContain("Bonjour ! 👋");
  });

  it("handles identity questions (Who are you?)", () => {
    const resWho = generateLocalChatResponse("who are you?", "en");
    expect(resWho.response).toContain("I am an interactive AI assistant");

    const resQui = generateLocalChatResponse("qui es tu ?", "fr");
    expect(resQui.response).toContain("Je suis l'assistant IA interactif");
  });

  it("handles politeness and goodbye", () => {
    const resThanks = generateLocalChatResponse("merci beaucoup !", "fr");
    expect(resThanks.response).toContain("Avec grand plaisir !");

    const resBye = generateLocalChatResponse("thank you, bye", "en");
    expect(resBye.response).toContain("You're very welcome!");
  });

  it("handles contact inquiries accurately", () => {
    const resContact = generateLocalChatResponse(
      "comment contacter wassim ?",
      "fr"
    );
    expect(resContact.response).toContain("wassim.ahmed.tech@gmail.com");
    expect(resContact.response).toContain("+216 23 579 414");
  });

  it("handles specific Cloudflare and AI projects accurately", () => {
    const resAI = generateLocalChatResponse(
      "Quels sont ses projets Cloudflare et IA ?",
      "fr"
    );
    expect(resAI.response).toContain("Plateforme de gestion de projet");
    expect(resAI.response).toContain("devfactory-cli");
    expect(resAI.response).toContain("Hono.js");
  });

  it("handles skills and stack inquiries accurately", () => {
    const resStack = generateLocalChatResponse(
      "Quelles sont ses compétences en Next.js et React ?",
      "fr"
    );
    expect(resStack.response).toContain("Stack Technique");
    expect(resStack.response).toContain("Next.js");
  });

  it("handles education inquiries accurately", () => {
    const resEdu = generateLocalChatResponse("Quelle est sa formation ?", "fr");
    expect(resEdu.response).toContain(
      "École Nationale d'Ingénieurs de Sfax (ENIS)"
    );
  });
});
