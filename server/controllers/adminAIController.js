const {
  generateBusinessInsights,
} = require("../services/adminAIService");

const getDashboardInsights = async (req, res) => {
  try {
    const insights = await generateBusinessInsights();

    return res.status(200).json({
      success: true,
      data: insights,
    });
  } catch (error) {
    console.error("Admin AI Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate dashboard insights.",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardInsights,
};

