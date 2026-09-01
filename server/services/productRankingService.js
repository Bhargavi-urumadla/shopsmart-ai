// ============================================================
// ShopSmart AI - Advanced Product Ranking Service
// ============================================================

const WEIGHTS = {
  rating: 10,
  stock: 10,
  budget: 25,
  brand: 20,

  battery: 15,
  camera: 15,
  gaming: 20,
  performance: 20,
  display: 15,
  storage: 15,
};

// ============================================================
// Helpers
// ============================================================

const normalize = (value) => {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).toLowerCase().trim();
};

const hasKeyword = (value, keywords = []) => {
  const text = normalize(value);

  return keywords.some((keyword) =>
    text.includes(normalize(keyword))
  );
};

const productText = (product) => {
  return [
    product.name,
    product.description,
    product.brand,
    product.productType,
    ...(product.tags || []),
  ]
    .filter(Boolean)
    .map(normalize)
    .join(" ");
};

// ============================================================
// Feature Detection
// ============================================================

const isGamingProduct = (product) => {
  const text = productText(product);

  return (
    hasKeyword(text, [
      "gaming",
      "gamer",
      "gaming phone",
      "game",
    ]) ||
    hasKeyword(product.processor, [
      "snapdragon",
      "dimensity",
      "mediatek",
    ]) ||
    hasKeyword(product.tags, [
      "gaming",
      "performance",
    ])
  );
};

const isPerformanceProduct = (product) => {
  const text = productText(product);

  return (
    hasKeyword(text, [
      "performance",
      "powerful",
      "flagship",
      "fast",
      "premium",
    ]) ||
    hasKeyword(product.processor, [
      "snapdragon",
      "dimensity",
      "apple",
      "m-series",
    ]) ||
    hasKeyword(product.ram, [
      "8 gb",
      "12 gb",
      "16 gb",
      "24 gb",
    ])
  );
};

const isBatteryProduct = (product) => {
  const text = productText(product);

  return (
    hasKeyword(text, [
      "battery",
      "long battery",
      "battery life",
    ]) ||
    hasKeyword(product.battery, [
      "4000",
      "4500",
      "5000",
      "5500",
      "6000",
      "7000",
    ])
  );
};

const isCameraProduct = (product) => {
  const text = productText(product);

  return (
    hasKeyword(text, [
      "camera",
      "photography",
      "photo",
      "selfie",
    ]) ||
    hasKeyword(product.camera, [
      "mp",
      "camera",
    ])
  );
};

const isDisplayProduct = (product) => {
  const text = productText(product);

  return (
    hasKeyword(text, [
      "display",
      "screen",
      "amoled",
      "oled",
      "retina",
    ]) ||
    hasKeyword(product.display, [
      "amoled",
      "oled",
      "retina",
      "120hz",
      "144hz",
    ])
  );
};

const isStorageProduct = (product) => {
  const text = productText(product);

  return (
    hasKeyword(text, [
      "storage",
      "ssd",
      "hard drive",
      "large storage",
    ]) ||
    hasKeyword(product.storage, [
      "128",
      "256",
      "512",
      "1tb",
      "2tb",
    ])
  );
};

// ============================================================
// Main Ranking Function
// ============================================================

const rankProducts = (products = [], intent = {}) => {
  if (!Array.isArray(products)) {
    return [];
  }

  return products
    .map((product) => {
      let score = 0;

      const reasons = [];

      const price = Number(product.price) || 0;
      const rating = Number(product.rating) || 0;
      const stock = Number(product.stock) || 0;

      // ========================================================
      // Rating
      // ========================================================

      if (rating > 0) {
        score += rating * WEIGHTS.rating;

        reasons.push(
          `⭐ Rating: ${rating}`
        );
      }

      // ========================================================
      // Stock
      // ========================================================

      if (stock > 0) {
        score += WEIGHTS.stock;

        reasons.push("✅ In Stock");
      } else {
        reasons.push("❌ Out of Stock");
      }

      // ========================================================
      // Budget
      // ========================================================

      if (
        intent.maxPrice !== null &&
        intent.maxPrice !== undefined
      ) {
        if (price <= Number(intent.maxPrice)) {
          score += WEIGHTS.budget;

          reasons.push("💰 Within Budget");
        } else {
          // Strong penalty if outside budget
          score -= WEIGHTS.budget;

          reasons.push("💸 Above Budget");
        }
      }

      // ========================================================
      // Minimum Price
      // ========================================================

      if (
        intent.minPrice !== null &&
        intent.minPrice !== undefined
      ) {
        if (price >= Number(intent.minPrice)) {
          score += 10;

          reasons.push("💰 Meets Minimum Budget");
        }
      }

      // ========================================================
      // Brand
      // ========================================================

      const requestedBrands = [
        ...(intent.brands || []),
      ];

      if (intent.brand) {
        requestedBrands.push(intent.brand);
      }

      const normalizedProductBrand =
        normalize(product.brand);

      const brandMatch = requestedBrands.some(
        (brand) =>
          normalize(brand) ===
          normalizedProductBrand
      );

      if (brandMatch) {
        score += WEIGHTS.brand;

        reasons.push(
          `🏷️ Preferred Brand: ${product.brand}`
        );
      }

      // ========================================================
      // Gaming
      // ========================================================

      if (intent.preferences?.gaming) {
        if (isGamingProduct(product)) {
          score += WEIGHTS.gaming;

          reasons.push(
            "🎮 Gaming Friendly"
          );
        } else {
          score -= 5;
        }
      }

      // ========================================================
      // Performance
      // ========================================================

      if (intent.preferences?.performance) {
        if (isPerformanceProduct(product)) {
          score += WEIGHTS.performance;

          reasons.push(
            "⚡ High Performance"
          );
        } else {
          score -= 5;
        }
      }

      // ========================================================
      // Battery
      // ========================================================

      if (intent.preferences?.battery) {
        if (isBatteryProduct(product)) {
          score += WEIGHTS.battery;

          reasons.push(
            "🔋 Good Battery"
          );
        } else {
          score -= 5;
        }
      }

      // ========================================================
      // Camera
      // ========================================================

      if (intent.preferences?.camera) {
        if (isCameraProduct(product)) {
          score += WEIGHTS.camera;

          reasons.push(
            "📷 Good Camera"
          );
        } else {
          score -= 5;
        }
      }

      // ========================================================
      // Display
      // ========================================================

      if (intent.preferences?.display) {
        if (isDisplayProduct(product)) {
          score += WEIGHTS.display;

          reasons.push(
            "🖥️ Great Display"
          );
        } else {
          score -= 5;
        }
      }

      // ========================================================
      // Storage
      // ========================================================

      if (intent.preferences?.storage) {
        if (isStorageProduct(product)) {
          score += WEIGHTS.storage;

          reasons.push(
            "💾 Large Storage"
          );
        } else {
          score -= 5;
        }
      }

      // ========================================================
      // Product Type Bonus
      // ========================================================

      if (intent.productType) {
        if (
          normalize(product.productType) ===
          normalize(intent.productType)
        ) {
          score += 10;

          reasons.push(
            `📱 Matching Type: ${product.productType}`
          );
        }
      }

      // ========================================================
      // Category Bonus
      // ========================================================

      if (intent.category) {
        if (
          normalize(product.category) ===
          normalize(intent.category)
        ) {
          score += 5;

          reasons.push(
            `📂 Category: ${product.category}`
          );
        }
      }

      // ========================================================
      // Return Ranked Product
      // ========================================================

      return {
        ...(
          typeof product.toObject === "function"
            ? product.toObject()
            : product
        ),

        score: Number(score.toFixed(2)),

        reasons,
      };
    })

    // Highest score first
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      // Rating as secondary sorting
      return (
        Number(b.rating || 0) -
        Number(a.rating || 0)
      );
    });
};

// ============================================================
// Export
// ============================================================

module.exports = {
  rankProducts,
};