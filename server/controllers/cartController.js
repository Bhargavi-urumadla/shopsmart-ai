const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add Product to Cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Check if already in cart
    let cartItem = await Cart.findOne({
      user: req.user.id,
      product: productId,
    });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();

      return res.status(200).json({
        message: "Cart updated",
        cartItem,
      });
    }

    // Create new cart item
    cartItem = await Cart.create({
      user: req.user.id,
      product: productId,
      quantity: quantity || 1,
    });

    res.status(201).json({
      message: "Added to cart",
      cartItem,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get Cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user.id,
    }).populate("product");

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Cart Quantity
const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    cartItem.quantity = quantity;

    await cartItem.save();

    res.status(200).json({
      message: "Cart updated successfully",
      cartItem,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Remove from Cart
const removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Removed from cart",
    });

  } catch (error) {
    res.status(500).json({
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