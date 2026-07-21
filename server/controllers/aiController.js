const {
  saveConversation,
  getConversation,
} = require("../services/memoryService");
const {
  rankProducts,
} = require("../services/productRankingService");
const 
{ generateAIResponse } = require("../services/aiService");
const { searchProducts } = require("../services/productSearchService");
const { extractIntent } = require("../services/intentService");

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    const sessionId = req.ip;
    const previousConversation = await getConversation(sessionId);
    console.log("Previous Conversation:", previousConversation);
const previousPreferences =
  previousConversation?.preferences || {};
    // Validate user input
    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a message.",
      });
    }

    // Extract user intent
    const intent = extractIntent(message);
    console.log("Extracted Intent:", intent);
    console.dir(intent, { depth: null });

   const mergedPreferences = {
  battery:
    previousPreferences.battery || intent.preferences.battery,

  camera:
    previousPreferences.camera || intent.preferences.camera,

  gaming:
    previousPreferences.gaming || intent.preferences.gaming,

  performance:
    previousPreferences.performance || intent.preferences.performance,

  display:
    previousPreferences.display || intent.preferences.display,

  storage:
    previousPreferences.storage || intent.preferences.storage,
};

intent.preferences = mergedPreferences;

console.log("Merged Preferences:", mergedPreferences);

if (
  !intent.productType &&
  previousConversation?.lastProducts &&
  previousConversation.lastProducts.length > 0
) {
  intent.productType =
    previousConversation.lastProducts[0].productType;

  console.log(
    "Using previous product type:",
    intent.productType
  );
}
// Follow-up preference update should continue the previous search
if (
  intent.intentType === "general" &&
  intent.productType
) {
  intent.intentType = "search";

  console.log(
    "Converted general intent to search (follow-up conversation)"
  );
}

    // Search matching products
    let products = [];

    if (intent.intentType !== "general") {
      products = await searchProducts({
        ...intent,
        originalMessage: message,
      });

      console.log("Products from MongoDB:", products);

      products = rankProducts(products, intent);
    }

    // Build product context for AI
    let productContext = "No matching products found.";
if (products.length > 0) {
  productContext = products
    .map(
      (product, index) => `
${index + 1}.
Name: ${product.name}
Category: ${product.category}
Product Type: ${product.productType}
Brand: ${product.brand}
Price: ₹${product.price}
Rating: ${product.rating}
Stock: ${product.stock}
Description: ${product.description}
Tags: ${
          product.tags && product.tags.length > 0
            ? product.tags.join(", ")
            : "None"
        }
`
    )
    .join("\n----------------------------\n");
}

    // Prompt for AI
   const prompt = `
You are ShopSmart AI, an intelligent shopping assistant.

Customer Request:
"${message}"

Previous Conversation:
${
  previousConversation
    ? `
Previous User Message:
${previousConversation.lastMessage}

Previous Products:
${
  previousConversation.lastProducts.length
    ? previousConversation.lastProducts
        .map((p) => `${p.name} - ₹${p.price}`)
        .join("\n")
    : "None"
}
`
    : "No previous conversation."
}

Detected Intent:
${intent.intentType}

User Preferences:
Battery: ${mergedPreferences.battery ? "Yes" : "No"}
Camera: ${mergedPreferences.camera ? "Yes" : "No"}
Gaming: ${mergedPreferences.gaming ? "Yes" : "No"}
Performance: ${mergedPreferences.performance ? "Yes" : "No"}
Display: ${mergedPreferences.display ? "Yes" : "No"}
Storage: ${mergedPreferences.storage ? "Yes" : "No"}

Available Products:
${
  products.length > 0
    ? productContext
    : "No matching products were found in the ShopSmart catalog."
}

Important Rules:

- Answer naturally, clearly, and professionally.
- Use ONLY the products listed under "Available Products".
- Never invent products that are not in the ShopSmart catalog.
- If no products are available, clearly tell the customer that ShopSmart currently doesn't have matching products.
- For general questions, answer naturally and helpfully.
- For shopping questions, use only the products provided above.
- If the detected intent is "comparison":
  - Compare products based on price, rating, stock, category, and description.
  - If only one matching product is available, explain that the comparison is limited because the other requested product or brand is unavailable.
  - End the response with a recommendation.
- Keep the response concise, friendly, and easy to understand.
When recommending a product, always consider ALL remembered user preferences.

If multiple preferences are true, mention every one of them.

Example:
"The user prefers a phone with a good battery and a good camera."

Do not focus only on the latest preference from the conversation.
User Preferences:

Battery: ${mergedPreferences.battery ? "Yes" : "No"}

Camera: ${mergedPreferences.camera ? "Yes" : "No"}

Gaming: ${mergedPreferences.gaming ? "Yes" : "No"}

Performance: ${mergedPreferences.performance ? "Yes" : "No"}

Display: ${mergedPreferences.display ? "Yes" : "No"}

Storage: ${mergedPreferences.storage ? "Yes" : "No"}
`;
console.log("Products before save:", products);
console.log("Merged Preferences before save:", mergedPreferences);
    // Generate AI response
    const aiResponse = await generateAIResponse(prompt);
   const productsToSave =
  products.length > 0
    ? products
    : previousConversation?.lastProducts || [];

await saveConversation(
  sessionId,
  message,
  productsToSave,
  mergedPreferences,
  intent,
  aiResponse
);
    console.log("Conversation Saved:", await getConversation(sessionId));

    return res.status(200).json({
      success: true,
      message: aiResponse,
      products: productsToSave,
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
      error: error.message,
    });
  }
};

module.exports = {
  chatWithAI,
   saveConversation,
  getConversation,
};