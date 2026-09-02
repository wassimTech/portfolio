// scripts/test-gemini.mjs
// Test script to debug Google Gemini API connection directly from terminal

import https from "node:https";

const apiKey =
  process.argv[2] ||
  process.env.GEMINI_API_KEY ||
  "";

console.log("==========================================");
console.log("   TEST DIAGNOSTIC GOOGLE GEMINI API      ");
console.log("==========================================");

if (!apiKey || apiKey.trim() === "") {
  console.error("\n❌ Aucune clé API fournie !");
  console.log("\n👉 Utilisation :");
  console.log("   node scripts/test-gemini.mjs AIzaSyVotreCleIci\n");
  process.exit(1);
}

const cleanKey = apiKey.trim().replace(/^["']|["']$/g, "");
console.log(`\n🔑 Clé détectée (longueur: ${cleanKey.length} caractères, début: ${cleanKey.slice(0, 8)}...)`);

const testMessage = "Présente Wassim AHMED et ses compétences principales en 2 phrases.";
const systemPrompt = `You are the official AI Portfolio Assistant for Wassim AHMED. Answer professionally in French.`;

const models = [
  "gemini-3.6-flash",
  "gemini-3.7-flash",
  "gemini-flash-latest",
  "gemini-3.5-flash",
  "gemini-3.1-flash-lite",
];

async function testModel(model) {
  console.log(`\n📡 Test du modèle : [${model}]...`);
  
  const payload = JSON.stringify({
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    contents: [
      {
        role: "user",
        parts: [{ text: testMessage }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 300,
      temperature: 0.7,
    },
  });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      signal: AbortSignal.timeout(7000),
    });

    const status = response.status;
    const data = await response.json();

    if (response.ok) {
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log(`✅ SUCCÈS avec ${model} (HTTP ${status}) !`);
      console.log(`\n💬 Réponse reçue de l'IA :\n------------------------------------------`);
      console.log(text?.trim());
      console.log(`------------------------------------------`);
      return true;
    } else {
      console.error(`❌ ÉCHEC avec ${model} (HTTP ${status})`);
      console.error(`Détail de l'erreur Google :`, JSON.stringify(data, null, 2));
      return false;
    }
  } catch (err) {
    console.error(`❌ Erreur réseau lors de l'appel à ${model} :`, err.message);
    return false;
  }
}

async function run() {
  for (const model of models) {
    const success = await testModel(model);
    if (success) {
      console.log(`\n🎉 Votre clé API Gemini fonctionne parfaitement avec ${model} !`);
      process.exit(0);
    }
  }
  console.log("\n⚠️ Aucun modèle n'a pu répondre. Vérifiez le message d'erreur ci-dessus.");
  process.exit(1);
}

run();
