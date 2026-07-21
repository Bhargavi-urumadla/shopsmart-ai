const extractIntent = (message) => {
  const text = message.toLowerCase().trim();

  const intent = {
    intentType: "general",
    category: null,
    productType: null,
    brand: null,
    brands: [],
    productNames: [],
    maxPrice: null,
    preferences: {
      battery: false,
      camera: false,
      gaming: false,
      performance: false,
      display: false,
      storage: false,
    },
  };

  // ==========================
  // Intent Detection
  // ==========================

  if (
    text.includes("compare") ||
    text.includes("difference") ||
    text.includes("vs")
  ) {
    intent.intentType = "comparison";
  } else if (
    text.includes("recommend") ||
    text.includes("best") ||
    text.includes("suggest")
  ) {
    intent.intentType = "recommendation";
  } else if (
    text.includes("wishlist") ||
    text.includes("save for later")
  ) {
    intent.intentType = "wishlist";
  } else if (
    text.includes("add to cart") ||
    text.includes("cart")
  ) {
    intent.intentType = "cart";
  } else if (
    text.includes("show") ||
    text.includes("find") ||
    text.includes("search") ||
    text.includes("need") ||
    text.includes("want") ||
    text.includes("looking") ||
    text.includes("phone") ||
    text.includes("headphones") ||
    text.includes("watch") ||
    text.includes("shoes")
  ) {
    intent.intentType = "search";
  }

  // ==========================
  // Budget
  // ==========================

  const budgetMatch = text.match(
    /(under|below|less than|₹|rs\.?|rupees)?\s*(\d{3,7})/
  );

  if (budgetMatch) {
    intent.maxPrice = Number(budgetMatch[2]);
  }

  // ==========================
  // Product Types
  // ==========================

  const productTypes = [
    "phone",
    "headphones",
    "smart watch",
    "watch",
    "tea",
    "milk",
    "perfume",
    "lamp",
    "shoes",
    "sneakers",
    "sunglasses",
  ];

  for (const type of productTypes) {
    if (text.includes(type)) {
      intent.productType = type;
      break;
    }
  }

  // ==========================
  // Brands
  // ==========================

  const brands = [
    "samsung",
    "apple",
    "iphone",
    "oneplus",
    "xiaomi",
    "sony",
    "noise",
    "nike",
    "puma",
    "amul",
    "tata tea",
    "bella vita",
    "philips",
    "fastrack",
  ];

  for (const brand of brands) {
    if (text.includes(brand)) {
      intent.brands.push(brand);
    }
  }

  if (intent.brands.length === 1) {
    intent.brand = intent.brands[0];
  }

  // ==========================
  // Product Names
  // ==========================

  const productNames = [
    "iphone 15",
    "iphone 16",
    "galaxy s24",
    "galaxy s25",
    "oneplus 12",
    "oneplus 13",
    "sony wh-1000xm5",
    "airpods pro",
  ];

  for (const product of productNames) {
    if (text.includes(product.toLowerCase())) {
      intent.productNames.push(product);
    }
  }

  // ==========================
  // Categories
  // ==========================

  const categories = [
    "electronics",
    "fashion",
    "beauty",
    "home",
    "beverages",
    "dairy",
  ];

  for (const category of categories) {
    if (text.includes(category)) {
      intent.category = category;
      break;
    }
  }

  // ==========================
  // Preferences
  // ==========================

  const preferenceKeywords = {
    battery: [
      "battery",
      "battery life",
      "long battery",
    ],
    camera: [
      "camera",
      "photo",
      "photography",
    ],
    gaming: [
      "gaming",
      "games",
      "gamer",
    ],
    performance: [
      "performance",
      "fast",
      "speed",
    ],
    display: [
      "display",
      "screen",
      "amoled",
      "oled",
    ],
    storage: [
      "storage",
      "128gb",
      "256gb",
      "512gb",
      "1tb",
    ],
  };

  for (const [key, keywords] of Object.entries(
    preferenceKeywords
  )) {
    if (keywords.some((word) => text.includes(word))) {
      intent.preferences[key] = true;
    }
  }

  return intent;
};

module.exports = {
  extractIntent,
};