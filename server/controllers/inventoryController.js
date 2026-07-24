const inventoryService = require("../services/inventoryService");

// Get all inventory
const getInventory = async (req, res) => {
  try {
    const inventory = await inventoryService.getInventory();

    res.status(200).json({
      success: true,
      count: inventory.length,
      data: inventory,
    });
  } catch (error) {
    console.error("Inventory Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get low stock products
const getLowStock = async (req, res) => {
  try {
    const threshold = Number(req.query.threshold) || 10;

    const products = await inventoryService.getLowStock(threshold);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Low Stock Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get out of stock products
const getOutOfStock = async (req, res) => {
  try {
    const products = await inventoryService.getOutOfStock();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Out Of Stock Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update stock
const updateStock = async (req, res) => {
  try {
    const { quantity, note } = req.body;

    const product = await inventoryService.updateStock(
      req.params.id,
      quantity,
      note
    );

    res.status(200).json({
      success: true,
      message: "Stock updated successfully.",
      data: product,
    });
  } catch (error) {
    console.error("Update Stock Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Restock product
const restockProduct = async (req, res) => {
  try {
    const { productId, quantity, note } = req.body;

    const product = await inventoryService.restockProduct(
      productId,
      quantity,
      note
    );

    res.status(200).json({
      success: true,
      message: "Product restocked successfully.",
      data: product,
    });
  } catch (error) {
    console.error("Restock Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Inventory history
const getInventoryHistory = async (req, res) => {
  try {
    const history = await inventoryService.getInventoryHistory(req.params.id);

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    console.error("History Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getInventory,
  getLowStock,
  getOutOfStock,
  updateStock,
  restockProduct,
  getInventoryHistory,
};