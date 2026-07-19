const Product = require("../models/Product");

const searchProducts = async (intent) => {
  const query = {};

  // Product Type
  if (intent.productType) {
    query.productType = {
      $regex: intent.productType,
      $options: "i",
    };
  }

  // Brand
  if (intent.brand) {
    query.brand = {
      $regex: intent.brand,
      $options: "i",
    };
  }

  // Category
  if (intent.category) {
    query.category = {
      $regex: intent.category,
      $options: "i",
    };
  }

  // Budget
  if (intent.maxPrice) {
    query.price = {
      $lte: intent.maxPrice,
    };
  }

  // If no structured intent was detected,
  // search using the user's original message.
  if (Object.keys(query).length === 0) {
    return await Product.find({
      $or: [
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
            $in: [new RegExp(intent.originalMessage, "i")],
          },
        },
      ],
    });
  }

  return await Product.find(query);
};

module.exports = {
  searchProducts,
};