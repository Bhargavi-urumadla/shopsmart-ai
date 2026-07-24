const adminOrderService = require("../services/adminOrderService");

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await adminOrderService.getAllOrders();

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get order by ID
const getOrder = async (req, res) => {
  try {
    const order = await adminOrderService.getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update status
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await adminOrderService.updateOrderStatus(
      req.params.id,
      status
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const order = await adminOrderService.deleteOrder(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getOrders,
  getOrder,
  updateStatus,
  deleteOrder,
};