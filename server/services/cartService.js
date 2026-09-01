const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ============================================================
// ADD PRODUCT TO CART
// ============================================================

const addToCart = async (
  userId,
  productId,
  quantity = 1
) => {
  if (!userId) {
    throw new Error("User ID is required.");
  }

  if (!productId) {
    throw new Error("Product ID is required.");
  }

  quantity = Number(quantity);

  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error(
      "Quantity must be at least 1."
    );
  }

  // ----------------------------------------------------------
  // Find product
  // ----------------------------------------------------------

  const product =
    await Product.findOne({
      _id: productId,
      isActive: true,
    });

  if (!product) {
    throw new Error(
      "Product not found."
    );
  }

  // ----------------------------------------------------------
  // Check stock
  // ----------------------------------------------------------

  if (
    Number(product.stock) <= 0
  ) {
    throw new Error(
      `${product.name} is currently out of stock.`
    );
  }

  // ----------------------------------------------------------
  // Check existing cart item
  // ----------------------------------------------------------

  let cartItem =
    await Cart.findOne({
      user: userId,
      product: productId,
    });

  if (cartItem) {
    const newQuantity =
      cartItem.quantity + quantity;

    if (
      newQuantity >
      product.stock
    ) {
      throw new Error(
        `Only ${product.stock} units of ${product.name} are available.`
      );
    }

    cartItem.quantity =
      newQuantity;

    await cartItem.save();
  } else {
    if (
      quantity >
      product.stock
    ) {
      throw new Error(
        `Only ${product.stock} units of ${product.name} are available.`
      );
    }

    cartItem =
      await Cart.create({
        user: userId,
        product: productId,
        quantity,
      });
  }

  // ----------------------------------------------------------
  // Return populated cart item
  // ----------------------------------------------------------

  return await Cart.findById(
    cartItem._id
  ).populate("product");
};

// ============================================================
// GET USER CART
// ============================================================

const getCart = async (
  userId
) => {
  if (!userId) {
    throw new Error(
      "User ID is required."
    );
  }

  const cartItems =
    await Cart.find({
      user: userId,
    })
      .populate("product")
      .sort({
        createdAt: -1,
      });

  // ----------------------------------------------------------
  // Calculate totals
  // ----------------------------------------------------------

  let totalItems = 0;
  let totalPrice = 0;

  const items =
    cartItems.map((item) => {
      const product =
        item.product;

      const quantity =
        Number(item.quantity);

      const price =
        Number(product?.price || 0);

      const subtotal =
        price * quantity;

      totalItems += quantity;
      totalPrice += subtotal;

      return {
        _id: item._id,

        product: {
          _id: product?._id,
          name: product?.name,
          brand: product?.brand,
          price: price,
          image: product?.image,
          stock: product?.stock,
        },

        quantity,

        subtotal,
      };
    });

  return {
    items,
    totalItems,
    totalPrice,
  };
};

// ============================================================
// UPDATE CART QUANTITY
// ============================================================

const updateCartQuantity = async (
  userId,
  productId,
  quantity
) => {
  if (!userId) {
    throw new Error(
      "User ID is required."
    );
  }

  quantity = Number(quantity);

  if (
    !Number.isInteger(quantity) ||
    quantity < 1
  ) {
    throw new Error(
      "Quantity must be at least 1."
    );
  }

  const product =
    await Product.findOne({
      _id: productId,
      isActive: true,
    });

  if (!product) {
    throw new Error(
      "Product not found."
    );
  }

  if (
    quantity >
    product.stock
  ) {
    throw new Error(
      `Only ${product.stock} units of ${product.name} are available.`
    );
  }

  const cartItem =
    await Cart.findOneAndUpdate(
      {
        user: userId,
        product: productId,
      },
      {
        quantity,
      },
      {
        new: true,
      }
    ).populate("product");

  if (!cartItem) {
    throw new Error(
      "Product is not in your cart."
    );
  }

  return cartItem;
};

// ============================================================
// REMOVE FROM CART
// ============================================================

const removeFromCart = async (
  userId,
  productId
) => {
  if (!userId) {
    throw new Error(
      "User ID is required."
    );
  }

  const cartItem =
    await Cart.findOneAndDelete({
      user: userId,
      product: productId,
    });

  if (!cartItem) {
    throw new Error(
      "Product is not in your cart."
    );
  }

  return {
    success: true,
    message:
      "Product removed from cart.",
  };
};

// ============================================================
// CLEAR CART
// ============================================================

const clearCart = async (
  userId
) => {
  if (!userId) {
    throw new Error(
      "User ID is required."
    );
  }

  await Cart.deleteMany({
    user: userId,
  });

  return {
    success: true,
    message:
      "Cart cleared successfully.",
  };
};

// ============================================================
// EXPORT
// ============================================================

module.exports = {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
};