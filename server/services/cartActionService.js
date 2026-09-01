const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ============================================================
// ADD PRODUCT
// ============================================================

const addProductToUserCart = async (
  userId,
  productId,
  quantity = 1
) => {
  if (!userId) {
    return {
      success: false,
      requiresLogin: true,
      message:
        "Please log in before adding products to your cart.",
    };
  }

  quantity = Number(quantity);

  if (
    !Number.isInteger(quantity) ||
    quantity < 1
  ) {
    return {
      success: false,
      message:
        "Quantity must be at least 1.",
    };
  }

  const product =
    await Product.findOne({
      _id: productId,
      isActive: true,
    });

  if (!product) {
    return {
      success: false,
      message:
        "The requested product was not found.",
    };
  }

  const stock =
    Number(product.stock || 0);

  if (stock <= 0) {
    return {
      success: false,
      message:
        `${product.name} is currently out of stock.`,
    };
  }

  let cartItem =
    await Cart.findOne({
      user: userId,
      product: productId,
    });

  if (cartItem) {
    const newQuantity =
      Number(cartItem.quantity) +
      quantity;

    if (newQuantity > stock) {
      return {
        success: false,
        message:
          `Only ${stock} units of ${product.name} are available. You already have ${cartItem.quantity} in your cart.`,
      };
    }

    cartItem.quantity =
      newQuantity;

    await cartItem.save();
  } else {
    if (quantity > stock) {
      return {
        success: false,
        message:
          `Only ${stock} units of ${product.name} are available.`,
      };
    }

    cartItem =
      await Cart.create({
        user: userId,
        product: productId,
        quantity,
      });
  }

  await cartItem.populate(
    "product"
  );

  const totals =
    await calculateCartTotals(
      userId
    );

  return {
    success: true,

    message:
      `${product.name} has been added to your cart.`,

    product: {
      _id: product._id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      stock: product.stock,
    },

    quantity:
      cartItem.quantity,

    totalItems:
      totals.totalItems,

    subtotal:
      totals.subtotal,
  };
};

// ============================================================
// GET CART
// ============================================================

const getUserCart = async (
  userId
) => {
  if (!userId) {
    return {
      success: false,
      requiresLogin: true,
      message:
        "Please log in to view your cart.",
    };
  }

  const cart =
    await Cart.find({
      user: userId,
    })
      .populate("product")
      .sort({
        createdAt: -1,
      });

  const validItems =
    cart.filter(
      (item) =>
        item.product
    );

  const staleItems =
    cart.filter(
      (item) =>
        !item.product
    );

  if (staleItems.length) {
    await Cart.deleteMany({
      _id: {
        $in: staleItems.map(
          (item) => item._id
        ),
      },
    });
  }

  let totalItems = 0;
  let subtotal = 0;

  const items =
    validItems.map(
      (item) => {
        const quantity =
          Number(item.quantity || 0);

        const price =
          Number(
            item.product?.price || 0
          );

        const itemTotal =
          price * quantity;

        totalItems +=
          quantity;

        subtotal +=
          itemTotal;

        return {
          cartItemId:
            item._id,

          productId:
            item.product._id,

          name:
            item.product.name,

          brand:
            item.product.brand,

          price,

          quantity,

          itemTotal,

          stock:
            item.product.stock,

          image:
            item.product.image,
        };
      }
    );

  return {
    success: true,
    items,
    totalItems,
    subtotal,
  };
};

// ============================================================
// UPDATE QUANTITY
// ============================================================

const updateCartItemQuantity =
  async (
    userId,
    cartItemId,
    quantity
  ) => {
    if (!userId) {
      return {
        success: false,
        requiresLogin: true,
        message:
          "Please log in to update your cart.",
      };
    }

    quantity = Number(quantity);

    if (
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      return {
        success: false,
        message:
          "Quantity must be at least 1.",
      };
    }

    const cartItem =
      await Cart.findOne({
        _id: cartItemId,
        user: userId,
      }).populate("product");

    if (!cartItem) {
      return {
        success: false,
        message:
          "Cart item not found.",
      };
    }

    if (!cartItem.product) {
      await Cart.findByIdAndDelete(
        cartItemId
      );

      return {
        success: false,
        message:
          "The product no longer exists.",
      };
    }

    const product =
      cartItem.product;

    if (
      quantity >
      Number(product.stock || 0)
    ) {
      return {
        success: false,
        message:
          `Only ${product.stock} units of ${product.name} are available.`,
      };
    }

    cartItem.quantity =
      quantity;

    await cartItem.save();

    await cartItem.populate(
      "product"
    );

    const totals =
      await calculateCartTotals(
        userId
      );

    return {
      success: true,

      message:
        `${product.name} quantity updated to ${quantity}.`,

      product: {
        _id: product._id,
        name: product.name,
        price: product.price,
      },

      quantity,

      totalItems:
        totals.totalItems,

      subtotal:
        totals.subtotal,
    };
  };

// ============================================================
// UPDATE BY PRODUCT
// ============================================================

const updateCartItemByProduct =
  async (
    userId,
    productId,
    quantity
  ) => {
    if (!userId) {
      return {
        success: false,
        requiresLogin: true,
        message:
          "Please log in to update your cart.",
      };
    }

    const cartItem =
      await Cart.findOne({
        user: userId,
        product: productId,
      });

    if (!cartItem) {
      return {
        success: false,
        message:
          "That product is not in your cart.",
      };
    }

    return updateCartItemQuantity(
      userId,
      cartItem._id,
      quantity
    );
  };

// ============================================================
// REMOVE PRODUCT
// ============================================================

const removeProductFromUserCart =
  async (
    userId,
    productId
  ) => {
    if (!userId) {
      return {
        success: false,
        requiresLogin: true,
        message:
          "Please log in to modify your cart.",
      };
    }

    const cartItem =
      await Cart.findOne({
        user: userId,
        product: productId,
      }).populate("product");

    if (!cartItem) {
      return {
        success: false,
        message:
          "That product is not in your cart.",
      };
    }

    const productName =
      cartItem.product?.name ||
      "Product";

    await Cart.findByIdAndDelete(
      cartItem._id
    );

    const totals =
      await calculateCartTotals(
        userId
      );

    return {
      success: true,

      message:
        `${productName} has been removed from your cart.`,

      totalItems:
        totals.totalItems,

      subtotal:
        totals.subtotal,
    };
  };

// ============================================================
// REMOVE BY CART ITEM ID
// ============================================================

const removeCartItem =
  async (
    userId,
    cartItemId
  ) => {
    if (!userId) {
      return {
        success: false,
        requiresLogin: true,
        message:
          "Please log in to modify your cart.",
      };
    }

    const cartItem =
      await Cart.findOne({
        _id: cartItemId,
        user: userId,
      }).populate("product");

    if (!cartItem) {
      return {
        success: false,
        message:
          "Cart item not found.",
      };
    }

    const productName =
      cartItem.product?.name ||
      "Product";

    await Cart.findByIdAndDelete(
      cartItemId
    );

    const totals =
      await calculateCartTotals(
        userId
      );

    return {
      success: true,

      message:
        `${productName} has been removed from your cart.`,

      totalItems:
        totals.totalItems,

      subtotal:
        totals.subtotal,
    };
  };

// ============================================================
// CLEAR CART
// ============================================================

const clearUserCart = async (
  userId
) => {
  if (!userId) {
    return {
      success: false,
      requiresLogin: true,
      message:
        "Please log in to clear your cart.",
    };
  }

  await Cart.deleteMany({
    user: userId,
  });

  return {
    success: true,

    message:
      "Your cart has been cleared.",

    totalItems: 0,

    subtotal: 0,
  };
};

// ============================================================
// CALCULATE TOTALS
// ============================================================

const calculateCartTotals =
  async (userId) => {
    const cart =
      await Cart.find({
        user: userId,
      }).populate("product");

    let totalItems = 0;
    let subtotal = 0;

    for (const item of cart) {
      if (!item.product) {
        continue;
      }

      const quantity =
        Number(item.quantity || 0);

      const price =
        Number(
          item.product.price || 0
        );

      totalItems += quantity;

      subtotal +=
        price * quantity;
    }

    return {
      totalItems,
      subtotal,
    };
  };

// ============================================================
// EXPORT
// ============================================================

module.exports = {
  addProductToUserCart,
  getUserCart,
  updateCartItemQuantity,
  updateCartItemByProduct,
  removeProductFromUserCart,
  removeCartItem,
  clearUserCart,
  calculateCartTotals,
};