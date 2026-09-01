// ==============================
// Load Environment Variables
// ==============================

const dotenv = require("dotenv");
dotenv.config();

// ==============================
// Groq Client
// ==============================

const OpenAI = require("openai");

const groqApiKey = process.env.GROQ_API_KEY;

if (!groqApiKey) {
  throw new Error(
    "❌ GROQ_API_KEY is missing. Check server/.env"
  );
}

const client = new OpenAI({
  apiKey: groqApiKey,
  baseURL: "https://api.groq.com/openai/v1",
});

// ==============================
// Model
// ==============================

const MODEL =
  process.env.GROQ_MODEL ||
  "llama-3.1-8b-instant";

// ==============================
// System Prompt
// ==============================

const SYSTEM_PROMPT = `
You are ShopSmart AI, an intelligent ecommerce shopping assistant.

Rules:

1. Use only the products provided by ShopSmart.
2. Never invent products.
3. Never invent prices.
4. Never invent stock.
5. Never invent specifications.
6. Recommend products only from the provided data.
7. Compare products objectively.
8. If no products match, say so clearly.
9. Keep responses concise.
10. Be friendly and professional.
`;

// ==============================
// Generate AI Response
// ==============================

const generateAIResponse = async (
  userPrompt,
  options = {}
) => {
  try {
    const completion =
      await client.chat.completions.create(
        {
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

          temperature:
            options.temperature ?? 0.2,

          max_tokens:
            options.maxTokens ?? 180,
        },
        {
          timeout: 15000,
        }
      );

    return (
      completion?.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I couldn't generate a response."
    );
  } catch (error) {
    console.error("❌ Groq API Error");
    console.error("Status:", error?.status);
    console.error("Message:", error?.message);

    throw error;
  }
};

// ==============================
// Export
// ==============================

module.exports = {
  generateAIResponse,
};