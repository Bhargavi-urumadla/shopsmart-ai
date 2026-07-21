const Order = require("../models/Order");
const Cart = require("../models/Cart");

// ==============================
// Place Order
// ==============================
const placeOrder = async (req, res) => {
  try {
    const {
      shippingAddress,
      paymentMethod = "COD",
    } = req.body;

    // Get user's cart
    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("product");

    if (!cartItems.length) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    let totalAmount = 0;

    const products = cartItems.map((item) => {
      totalAmount += item.product.price * item.quantity;

      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price, // Store purchase price
      };
    });

    const order = await Order.create({
      user: req.user._id,
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    // Clear user's cart
    await Cart.deleteMany({
      user: req.user._id,
    });

    const populatedOrder = await Order.findById(order._id)
      .populate("user", "name email")
      .populate("products.product", "name brand price image");

    return res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order: populatedOrder,
    });

  } catch (error) {
    console.error("Place Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to place order.",
    });
  }
};

// ==============================
// Get Logged-in User Orders
// ==============================
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("products.product", "name brand image")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      totalOrders: orders.length,
      orders,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Order By ID
// ==============================
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("products.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.json({
      success: true,
      order,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Cancel Order
// ==============================
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (order.status === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Delivered orders cannot be cancelled.",
      });
    }

    order.status = "Cancelled";
    await order.save();

    return res.json({
      success: true,
      message: "Order cancelled successfully.",
      order,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Admin - Get All Orders
// ==============================
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name brand")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      totalOrders: orders.length,
      orders,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Admin - Update Order Status
// ==============================
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.json({
      success: true,
      message: "Order status updated successfully.",
      order,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Delete Order
// ==============================
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.json({
      success: true,
      message: "Order deleted successfully.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};