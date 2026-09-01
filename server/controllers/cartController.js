const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ============================================================
// Add To Cart
// ============================================================

const addToCart = async (req, res) => {
  try {
    const {
      productId,
      quantity = 1,
    } = req.body;

    const requestedQuantity = Number(quantity);

    // Validate product ID
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    // Validate quantity
    if (
      !Number.isInteger(requestedQuantity) ||
      requestedQuantity < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1.",
      });
    }

    // Find active product
    const product = await Product.findOne({
      _id: productId,
      isActive: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found or inactive.",
      });
    }

    // Check stock
    if (Number(product.stock) <= 0) {
      return res.status(400).json({
        success: false,
        message: `${product.name} is currently out of stock.`,
      });
    }

    // Find existing cart item
    let cartItem = await Cart.findOne({
      user: req.user._id,
      product: productId,
    });

    // ========================================================
    // Product already exists in cart
    // ========================================================

    if (cartItem) {
      const newQuantity =
        Number(cartItem.quantity) +
        requestedQuantity;

      // Check stock before increasing quantity
      if (newQuantity > Number(product.stock)) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} units of ${product.name} are available.`,
        });
      }

      cartItem.quantity = newQuantity;

      await cartItem.save();

      await cartItem.populate("product");

      return res.status(200).json({
        success: true,
        message: `${product.name} quantity updated successfully.`,
        cartItem,
      });
    }

    // ========================================================
    // New product in cart
    // ========================================================

    if (requestedQuantity > Number(product.stock)) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} units of ${product.name} are available.`,
      });
    }

    cartItem = await Cart.create({
      user: req.user._id,
      product: productId,
      quantity: requestedQuantity,
    });

    await cartItem.populate("product");

    return res.status(201).json({
      success: true,
      message: `${product.name} added to cart.`,
      cartItem,
    });
  } catch (error) {
    console.error("ADD TO CART ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// Get Cart
// ============================================================

const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user._id,
    }).populate("product");

    // ========================================================
    // Remove stale cart items
    // ========================================================
    // A cart item can exist even when its referenced Product
    // has been deleted. In that case item.product === null.
    // We remove those items instead of causing:
    //
    // Cannot read properties of null (reading 'price')
    // ========================================================

    const validCart = [];
    const staleCartIds = [];

    for (const item of cart) {
      if (!item.product) {
        staleCartIds.push(item._id);
      } else {
        validCart.push(item);
      }
    }

    // Delete stale cart records
    if (staleCartIds.length > 0) {
      await Cart.deleteMany({
        _id: {
          $in: staleCartIds,
        },
      });

      console.log(
        `🧹 Removed ${staleCartIds.length} stale cart item(s).`
      );
    }

    // ========================================================
    // Calculate totals
    // ========================================================

    const totalItems = validCart.reduce(
      (sum, item) =>
        sum + Number(item.quantity || 0),
      0
    );

    const subtotal = validCart.reduce(
      (sum, item) => {
        const price = Number(
          item.product?.price || 0
        );

        const quantity = Number(
          item.quantity || 0
        );

        return sum + price * quantity;
      },
      0
    );

    return res.status(200).json({
      success: true,
      totalItems,
      subtotal,
      cart: validCart,
    });
  } catch (error) {
    console.error("GET CART ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// Update Cart Quantity
// ============================================================

const updateCart = async (req, res) => {
  try {
    const requestedQuantity =
      Number(req.body.quantity);

    // Validate quantity
    if (
      !Number.isInteger(requestedQuantity) ||
      requestedQuantity < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1.",
      });
    }

    // Find cart item
    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("product");

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found.",
      });
    }

    // Check if product still exists
    if (!cartItem.product) {
      await Cart.findByIdAndDelete(
        req.params.id
      );

      return res.status(404).json({
        success: false,
        message:
          "The product associated with this cart item no longer exists.",
      });
    }

    const product = cartItem.product;

    // Check stock
    if (
      requestedQuantity >
      Number(product.stock)
    ) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} units of ${product.name} are available.`,
      });
    }

    // Update quantity
    cartItem.quantity =
      requestedQuantity;

    await cartItem.save();

    await cartItem.populate("product");

    return res.status(200).json({
      success: true,
      message:
        "Cart updated successfully.",
      cartItem,
    });
  } catch (error) {
    console.error(
      "UPDATE CART ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// Remove From Cart
// ============================================================

const removeFromCart = async (
  req,
  res
) => {
  try {
    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message:
          "Cart item not found.",
      });
    }

    await Cart.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Product removed from cart.",
    });
  } catch (error) {
    console.error(
      "REMOVE FROM CART ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// Export
// ============================================================

module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
};