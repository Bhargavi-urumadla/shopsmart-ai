const Order = require("../models/Order");

// Get all orders
const getAllOrders = async () => {
  return await Order.find()
    .populate("user", "name email")
    .populate("products.product", "name price image")
    .sort({ createdAt: -1 });
};

// Get order by ID
const getOrderById = async (id) => {
  return await Order.findById(id)
    .populate("user", "name email")
    .populate("products.product", "name price image");
};

// Update order status
const updateOrderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  )
    .populate("user", "name email")
    .populate("products.product", "name price image");
};

// Delete order
const deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};

module.exports = {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};