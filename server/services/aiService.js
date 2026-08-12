// ==============================
// Load Environment Variables
// ==============================

const dotenv = require("dotenv");

dotenv.config();

// ==============================
// OpenAI-Compatible Groq Client
// ==============================

const OpenAI = require("openai");

// Get Groq API key
const groqApiKey = process.env.GROQ_API_KEY;

// Debug check - never print the actual API key
console.log(
  "🔑 GROQ API KEY AVAILABLE:",
  Boolean(groqApiKey)
);

console.log(
  "🔑 GROQ API KEY LENGTH:",
  groqApiKey ? groqApiKey.length : 0
);

// Stop immediately if the key is missing
if (!groqApiKey) {
  throw new Error(
    "❌ GROQ_API_KEY is missing. Please check server/.env"
  );
}

// ==============================
// Create Groq Client
// ==============================

const client = new OpenAI({
  apiKey: groqApiKey,
  baseURL: "https://api.groq.com/openai/v1",
});

// ==============================
// AI Model
// ==============================

const MODEL =
  process.env.GROQ_MODEL ||
  "llama-3.3-70b-versatile";

// ==============================
// System Prompt
// ==============================

const SYSTEM_PROMPT = `
You are ShopSmart AI, an intelligent shopping assistant.

Your responsibilities:

- Help customers choose the right products.
- Recommend only products provided in the prompt.
- Never invent products, prices, or specifications.
- Explain recommendations clearly.
- Compare products objectively.
- If no matching products exist, politely inform the user.
- Answer general shopping questions naturally.
- Keep responses concise (under 200 words).
- Be friendly and professional.
`;

// ==============================
// Generate AI Response
// ==============================

const generateAIResponse = async (userPrompt) => {
  try {
    const completion =
      await client.chat.completions.create({
        model: MODEL,

        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],

        temperature: 0.7,

        max_tokens: 300,
      });

    return (
      completion?.choices?.[0]?.message?.content?.trim() ||
      "I'm sorry, I couldn't generate a response at the moment."
    );
  } catch (error) {
    console.error(
      "❌ Groq API Error:",
      error?.response?.data || error.message
    );

    throw new Error(
      "Failed to generate AI response."
    );
  }
};

// ==============================
// Export
// ==============================

module.exports = {
  generateAIResponse,
};