const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

// ==========================
// Add To Wishlist
// ==========================
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const existing = await Wishlist.findOne({
      user: req.user._id,
      product: productId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Product already exists in wishlist.",
      });
    }

    const wishlist = await Wishlist.create({
      user: req.user._id,
      product: productId,
    });

    const populatedWishlist = await Wishlist.findById(wishlist._id)
      .populate("product");

    return res.status(201).json({
      success: true,
      message: "Product added to wishlist.",
      wishlist: populatedWishlist,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get Wishlist
// ==========================
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user._id,
    }).populate("product");

    return res.status(200).json({
      success: true,
      totalItems: wishlist.length,
      wishlist,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Remove Wishlist Item
// ==========================
const removeFromWishlist = async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findById(req.params.id);

    if (!wishlistItem) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found.",
      });
    }

    if (wishlistItem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    await Wishlist.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Wishlist item removed successfully.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};