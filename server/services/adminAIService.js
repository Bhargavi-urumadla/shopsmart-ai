const {
  getSalesOverview,
  getMonthlySales,
  getTopProducts,
  getTopCategories,
} = require("./salesService");

const Product = require("../models/Product");
const { generateAIResponse } = require("./aiService");

const calculateBusinessHealth = (
  overview,
  lowStockCount,
  outOfStockCount
) => {
  let score = 100;

  if (overview.averageOrderValue < 500) score -= 10;

  if (lowStockCount > 10) score -= 10;

  if (outOfStockCount > 5) score -= 15;

  if (overview.totalOrders < 20) score -= 10;

  return Math.max(score, 0);
};

const generateBusinessInsights = async () => {
  // Dashboard Data
  const overview = await getSalesOverview();

  const monthlySales = await getMonthlySales();

  const topProducts = await getTopProducts();

  const topCategories = await getTopCategories();

  // Inventory

  const totalProducts = await Product.countDocuments();

  const lowStockProducts = await Product.find({
    stock: {
      $gt: 0,
      $lte: 10,
    },
  });

  const outOfStockProducts = await Product.find({
    stock: 0,
  });

  // Health Score

  const healthScore = calculateBusinessHealth(
    overview,
    lowStockProducts.length,
    outOfStockProducts.length
  );

  // Recommendations

  const recommendations = [];

  if (lowStockProducts.length > 0) {
    recommendations.push({
      type: "inventory",
      severity: "High",
      title: "Restock Low Stock Products",
      description: `${lowStockProducts.length} products are running low.`,
    });
  }

  if (outOfStockProducts.length > 0) {
    recommendations.push({
      type: "inventory",
      severity: "Critical",
      title: "Out of Stock Products",
      description: `${outOfStockProducts.length} products are unavailable.`,
    });
  }

  if (overview.averageOrderValue < 500) {
    recommendations.push({
      type: "sales",
      severity: "Medium",
      title: "Increase Average Order Value",
      description:
        "Offer bundles or discounts to improve order value.",
    });
  }

  if (topProducts.length > 0) {
    recommendations.push({
      type: "marketing",
      severity: "Low",
      title: "Promote Best Sellers",
      description: `Increase ads for ${topProducts[0].name}.`,
    });
  }

  // AI Prompt

  const prompt = `
You are an expert Ecommerce Business Analyst.

Analyze the following business metrics.

Business Health Score:
${healthScore}/100

Overview:
${JSON.stringify(overview, null, 2)}

Top Products:
${JSON.stringify(topProducts.slice(0, 5), null, 2)}

Top Categories:
${JSON.stringify(topCategories.slice(0, 5), null, 2)}

Monthly Sales:
${JSON.stringify(monthlySales, null, 2)}

Inventory:

Total Products:
${totalProducts}

Low Stock:
${lowStockProducts.length}

Out Of Stock:
${outOfStockProducts.length}

Provide:

1. Executive Summary

2. Strengths

3. Weaknesses

4. Business Recommendations

5. Inventory Suggestions

6. Sales Opportunities

Keep the response under 250 words.
`;

  const aiSummary = await generateAIResponse(prompt);

  // Forecast

  let revenueForecast = overview.totalRevenue;

  if (monthlySales.length >= 3) {
    const recent = monthlySales.slice(-3);

    revenueForecast =
      recent.reduce(
        (sum, item) => sum + item.revenue,
        0
      ) / recent.length;
  }

  return {
    generatedAt: new Date(),

    healthScore,

    overview,

    aiSummary,

    recommendations,

    revenueForecast: Math.round(revenueForecast),

    monthlySales,

    topProducts,

    topCategories,

    inventory: {
      totalProducts,
      lowStock: lowStockProducts,
      outOfStock: outOfStockProducts,
    },
  };
};

module.exports = {
  generateBusinessInsights,
};