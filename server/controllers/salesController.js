const salesService = require("../services/salesService");

// Dashboard Overview
const getSalesOverview = async (req, res) => {
  try {
    const data = await salesService.getSalesOverview();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Sales Overview Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Revenue
const getRevenue = async (req, res) => {
  try {
    const data = await salesService.getRevenue();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Revenue Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Monthly Sales
const getMonthlySales = async (req, res) => {
  try {
    const data = await salesService.getMonthlySales();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Monthly Sales Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Top Products
const getTopProducts = async (req, res) => {
  try {
    const data = await salesService.getTopProducts();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Top Products Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Top Categories
const getTopCategories = async (req, res) => {
  try {
    const data = await salesService.getTopCategories();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Top Categories Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSalesOverview,
  getRevenue,
  getMonthlySales,
  getTopProducts,
  getTopCategories,
};