const Product = require("../models/Product");

const searchProducts = async (intent) => {
  try {
    const query = {
      isActive: true,
    };

    // Product Name
    if (intent.productNames?.length > 0) {
      query.name = {
        $in: intent.productNames.map(
          (name) => new RegExp(`^${name}$`, "i")
        ),
      };
    }

    // Product Type
    if (intent.productType) {
      query.productType = new RegExp(
        `^${intent.productType}$`,
        "i"
      );
    }

    // Multiple Brands
    if (intent.brands?.length > 0) {
      query.brand = {
        $in: intent.brands.map(
          (brand) => new RegExp(`^${brand}$`, "i")
        ),
      };
    }

    // Single Brand
    else if (intent.brand) {
      query.brand = new RegExp(
        `^${intent.brand}$`,
        "i"
      );
    }

    // Category
    if (intent.category) {
      query.category = new RegExp(
        `^${intent.category}$`,
        "i"
      );
    }

    // Budget
    if (intent.maxPrice) {
      query.price = {
        $lte: intent.maxPrice,
      };
    }

    // Structured Search
    let products;

    if (Object.keys(query).length > 1) {
      products = await Product.find(query);
    }

    // General Search
    else {
      products = await Product.find({
        isActive: true,
        $or: [
          {
            $text: {
              $search: intent.originalMessage,
            },
          },
          {
            name: {
              $regex: intent.originalMessage,
              $options: "i",
            },
          },
          {
            description: {
              $regex: intent.originalMessage,
              $options: "i",
            },
          },
          {
            tags: {
              $in: [
                new RegExp(intent.originalMessage, "i"),
              ],
            },
          },
        ],
      });
    }

    // Budget fallback
    if (
      products.length === 0 &&
      intent.maxPrice
    ) {
      const fallbackQuery = {
        ...query,
      };

      delete fallbackQuery.price;

      products = await Product.find(fallbackQuery);

      products.fallback = true;
    }

    return products;

  } catch (error) {
    console.error("Product Search Error:", error);
    throw error;
  }
};

module.exports = {
  searchProducts,
};