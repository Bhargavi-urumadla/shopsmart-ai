const Product = require("../models/Product");

// =========================
// Add Product
// =========================
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      productType,
      brand,
      price,
      image,
      stock,
      rating,
      battery,
      camera,
      display,
      processor,
      ram,
      storage,
      color,
      weight,
      tags,
      isFeatured,
    } = req.body;

    if (
      !name ||
      !description ||
      !category ||
      !productType ||
      price === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const product = await Product.create({
      name,
      description,
      category,
      productType,
      brand,
      price,
      image,
      stock,
      rating,
      battery,
      camera,
      display,
      processor,
      ram,
      storage,
      color,
      weight,
      tags,
      isFeatured,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get All Products
// =========================
const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {
      isActive: true,
    };

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.brand) {
      filter.brand = req.query.brand;
    }

    if (req.query.productType) {
      filter.productType = req.query.productType;
    }

    if (req.query.search) {
      filter.$or = [
        {
          name: {
            $regex: req.query.search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: req.query.search,
            $options: "i",
          },
        },
        {
          brand: {
            $regex: req.query.search,
            $options: "i",
          },
        },
      ];
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};

      if (req.query.minPrice) {
        filter.price.$gte = Number(req.query.minPrice);
      }

      if (req.query.maxPrice) {
        filter.price.$lte = Number(req.query.maxPrice);
      }
    }

    let sort = {
      createdAt: -1,
    };

    switch (req.query.sort) {
      case "priceAsc":
        sort = { price: 1 };
        break;

      case "priceDesc":
        sort = { price: -1 };
        break;

      case "rating":
        sort = { rating: -1 };
        break;

      case "latest":
        sort = { createdAt: -1 };
        break;

      case "nameAsc":
        sort = { name: 1 };
        break;

      case "nameDesc":
        sort = { name: -1 };
        break;

      default:
        break;
    }

    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments(filter);

    const totalPages = Math.max(
  1,
  Math.ceil(totalProducts / limit)
);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =========================
// Featured Products
// =========================
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isFeatured: true,
      isActive: true,
    });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get Product By ID
// =========================
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Update Product
// =========================
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Delete Product (Soft Delete)
// =========================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        isActive: false,
      },
      {
        new: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Exports
// =========================
module.exports = {
  addProduct,
  getProducts,
  getFeaturedProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};