const { generateAIResponse } = require("../services/aiService");
const { searchProducts } = require("../services/productSearchService");
const { extractIntent } = require("../services/intentService");

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    // Validate user input
    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a message.",
      });
    }

    // Extract user intent
    const intent = extractIntent(message);
    console.log("Extracted Intent:", intent);

    // Search matching products
 const products = await searchProducts({
  ...intent,
  originalMessage: message,
});

    // If no matching products found
    if (products.length === 0) {
      return res.status(200).json({
        success: true,
        message:
          "I couldn't find any matching products in the ShopSmart catalog.",
        products: [],
      });
    }

    // Build product context for AI
    const productContext = products
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
      .join("\n");

    // Prompt for AI
    const prompt = `
You are ShopSmart AI.

A customer asked:

"${message}"

These are the ONLY products available in our store:

${productContext}

Instructions:
- Recommend ONLY from these products.
- Never invent products.
- Explain why your recommendation matches the customer's request.
- Mention price and rating where relevant.
- If multiple products match, compare them briefly.
`;

    // Generate AI response
    const aiResponse = await generateAIResponse(prompt);

    return res.status(200).json({
      success: true,
      message: aiResponse,
      products,
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
};