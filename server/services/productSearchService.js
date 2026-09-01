const Product = require("../models/Product");

/**
 * Escape special regex characters.
 */
const escapeRegex = (value = "") => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

/**
 * Normalize common product types.
 *
 * This allows users to say:
 * phone / smartphone / mobile
 *
 * while the database may contain:
 * Mobile
 */
const PRODUCT_TYPE_ALIASES = {
  phone: ["Mobile", "Smartphone", "Phone"],
  smartphone: ["Mobile", "Smartphone", "Phone"],
  mobile: ["Mobile", "Smartphone", "Phone"],

  headphones: ["Headphones", "Audio"],
  headphone: ["Headphones", "Audio"],

  milk: ["Milk"],
  coffee: ["Coffee"],
  tea: ["Tea"],

  shoes: ["Shoes"],
  sneakers: ["Shoes"],

  clothing: ["Clothing"],
  hoodie: ["Clothing"],

  charger: ["Charger"],
  keyboard: ["Keyboard"],
  mouse: ["Mouse"],

  smartwatch: ["Smartwatch"],
  watch: ["Smartwatch"],

  vacuum: ["Cleaning"],
  "vacuum cleaner": ["Cleaning"],

  "air fryer": ["Kitchen"],
  "pressure cooker": ["Kitchen"],
};

/**
 * Convert user/AI product type into database values.
 */
const getProductTypeValues = (productType) => {
  if (!productType) {
    return [];
  }

  const normalized = productType
    .toString()
    .trim()
    .toLowerCase();

  return (
    PRODUCT_TYPE_ALIASES[normalized] || [
      productType.trim(),
    ]
  );
};

/**
 * Search ShopSmart products.
 *
 * IMPORTANT:
 * MongoDB is the source of truth.
 *
 * We NEVER remove the user's budget restriction
 * just because no product was found.
 */
const searchProducts = async (intent = {}) => {
  try {
    const query = {
      isActive: true,
    };

    /**
     * ---------------------------------------
     * PRODUCT NAME
     * ---------------------------------------
     */

    if (intent.productNames?.length > 0) {
      query.name = {
        $in: intent.productNames.map(
          (name) =>
            new RegExp(
              `^${escapeRegex(name.trim())}$`,
              "i"
            )
        ),
      };
    }

    /**
     * ---------------------------------------
     * PRODUCT TYPE
     * ---------------------------------------
     */

    if (intent.productType) {
      const productTypes =
        getProductTypeValues(
          intent.productType
        );

      query.productType = {
        $in: productTypes.map(
          (type) =>
            new RegExp(
              `^${escapeRegex(type)}$`,
              "i"
            )
        ),
      };
    }

    /**
     * ---------------------------------------
     * BRAND
     * ---------------------------------------
     */

    const brands =
      intent.brands?.length > 0
        ? intent.brands
        : intent.brand
        ? [intent.brand]
        : [];

    if (brands.length > 0) {
      query.brand = {
        $in: brands.map(
          (brand) =>
            new RegExp(
              `^${escapeRegex(
                brand.trim()
              )}$`,
              "i"
            )
        ),
      };
    }

    /**
     * ---------------------------------------
     * CATEGORY
     * ---------------------------------------
     */

    if (intent.category) {
      query.category = new RegExp(
        `^${escapeRegex(
          intent.category.trim()
        )}$`,
        "i"
      );
    }

    /**
     * ---------------------------------------
     * MAX PRICE
     * ---------------------------------------
     */

    if (
      intent.maxPrice !== null &&
      intent.maxPrice !== undefined
    ) {
      query.price = {
        $lte: Number(intent.maxPrice),
      };
    }

    /**
     * ---------------------------------------
     * SEARCH TEXT
     * ---------------------------------------
     *
     * If no structured filters exist,
     * search across the product catalog.
     */

    const hasStructuredFilters =
      Boolean(query.name) ||
      Boolean(query.productType) ||
      Boolean(query.brand) ||
      Boolean(query.category) ||
      Boolean(query.price);

    let products;

    if (hasStructuredFilters) {
      products = await Product.find(query)
        .sort({
          rating: -1,
          createdAt: -1,
        })
        .limit(20);
    } else {
      const searchText =
        intent.originalMessage
          ?.trim() || "";

      if (!searchText) {
        products = await Product.find({
          isActive: true,
        })
          .sort({
            rating: -1,
            createdAt: -1,
          })
          .limit(20);
      } else {
        const regex = new RegExp(
          escapeRegex(searchText),
          "i"
        );

        products = await Product.find({
          isActive: true,
          $or: [
            {
              name: regex,
            },
            {
              brand: regex,
            },
            {
              category: regex,
            },
            {
              productType: regex,
            },
            {
              description: regex,
            },
            {
              tags: {
                $in: [regex],
              },
            },
          ],
        })
          .sort({
            rating: -1,
            createdAt: -1,
          })
          .limit(20);
      }
    }

    /**
     * IMPORTANT
     *
     * Do NOT remove price restrictions.
     *
     * If the user asks:
     *
     * Samsung under ₹30,000
     *
     * and MongoDB has no match,
     *
     * return [].
     */

    return products;
  } catch (error) {
    console.error(
      "❌ Product Search Error:",
      error
    );

    throw error;
  }
};

module.exports = {
  searchProducts,
};