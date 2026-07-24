const Product = require("../models/Product");
const InventoryLog = require("../models/InventoryLog");

// Get all products with inventory
const getInventory = async () => {
  return await Product.find().select("name category price stock");
};

// Get products with low stock
const getLowStock = async (threshold = 10) => {
  return await Product.find({
    stock: { $gt: 0, $lt: threshold },
  }).select("name stock category");
};

// Get out-of-stock products
const getOutOfStock = async () => {
  return await Product.find({
    stock: 0,
  }).select("name category");
};

// Update stock
const updateStock = async (productId, quantity, note = "") => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  const previousStock = product.stock;

  product.stock = quantity;
  await product.save();

  await InventoryLog.create({
    product: product._id,
    action: "UPDATE",
    quantity,
    previousStock,
    newStock: quantity,
    note,
  });

  return product;
};

// Restock product
const restockProduct = async (productId, quantity, note = "") => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  const previousStock = product.stock;

  product.stock += quantity;
  await product.save();

  await InventoryLog.create({
    product: product._id,
    action: "RESTOCK",
    quantity,
    previousStock,
    newStock: product.stock,
    note,
  });

  return product;
};

// Get inventory history
const getInventoryHistory = async (productId) => {
  return await InventoryLog.find({
    product: productId,
  })
    .populate("product", "name")
    .sort({ createdAt: -1 });
};

module.exports = {
  getInventory,
  getLowStock,
  getOutOfStock,
  updateStock,
  restockProduct,
  getInventoryHistory,
};