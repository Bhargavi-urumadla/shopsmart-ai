const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

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

const generateAIResponse = async (userPrompt) => {
  try {
    const completion = await client.chat.completions.create({
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
      "Groq API Error:",
      error?.response?.data || error.message
    );

    throw new Error("Failed to generate AI response.");
  }
};

module.exports = {
  generateAIResponse,
};