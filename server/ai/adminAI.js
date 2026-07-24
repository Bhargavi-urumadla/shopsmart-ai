const { generateAIResponse } = require("../services/aiService");

// Import your models
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

const generateDashboardInsights = async () => {
  // Fetch real data from MongoDB
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalUsers = await User.countDocuments();

  const lowStockProducts = await Product.find({
    stock: { $lt: 10 },
  }).select("name stock");

  // AI Prompt
  const prompt = `
You are an expert AI Business Analyst for ShopSmart AI.

Below is the real-time store data.

Store Statistics:
- Total Products: ${totalProducts}
- Total Orders: ${totalOrders}
- Total Customers: ${totalUsers}

Low Stock Products:
${JSON.stringify(lowStockProducts, null, 2)}

Generate ONLY valid JSON.

Do NOT use markdown.
Do NOT wrap the response in \`\`\`.
Do NOT include explanations.

Return this structure:

{
  "storeHealth": 95,
  "summary": "",
  "forecast": {
    "growth": "",
    "expectedRevenue": ""
  },
  "trending": {
    "category": "",
    "product": ""
  },
  "alerts": [
    {
      "type": "",
      "message": "",
      "priority": ""
    }
  ],
  "recommendations": [
    {
      "title": "",
      "reason": "",
      "priority": ""
    }
  ]
}

Rules:
- Store health must be between 0 and 100.
- Summary should contain exactly 2 sentences.
- Forecast should include expected growth percentage and expected revenue.
- Trending category and product should be realistic.
- Return exactly 2 alerts.
- Return exactly 3 recommendations.
- Base your recommendations on the provided store statistics and low stock products.
`;

  const response = await generateAIResponse(prompt);

  console.log("Raw AI Response:");
  console.log(response);

  const cleanedResponse = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error("Invalid AI JSON:");
    console.log(cleanedResponse);
    throw error;
  }
};

module.exports = {
  generateDashboardInsights,
};