const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ==========================
// Add To Cart
// ==========================
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1.",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    let cartItem = await Cart.findOne({
      user: req.user._id,
      product: productId,
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();

      await cartItem.populate("product");

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully.",
        cartItem,
      });
    }

    cartItem = await Cart.create({
      user: req.user._id,
      product: productId,
      quantity,
    });

    await cartItem.populate("product");

    return res.status(201).json({
      success: true,
      message: "Product added to cart.",
      cartItem,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get Cart
// ==========================
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user._id,
    }).populate("product");

    const totalItems = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const subtotal = cart.reduce(
      (sum, item) =>
        sum + item.product.price * item.quantity,
      0
    );

    return res.status(200).json({
      success: true,
      totalItems,
      subtotal,
      cart,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Update Cart Quantity
// ==========================
const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1.",
      });
    }

    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found.",
      });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    await cartItem.populate("product");

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully.",
      cartItem,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Remove From Cart
// ==========================
const removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found.",
      });
    }

    await Cart.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Product removed from cart.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
};