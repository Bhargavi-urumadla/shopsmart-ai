// ============================================================
// ShopSmart AI - Intent Service
// ============================================================

// ============================================================
// DEFAULT PREFERENCES
// ============================================================

const DEFAULT_PREFERENCES = {
  battery: false,
  camera: false,
  gaming: false,
  performance: false,
  display: false,
  storage: false,
};

// ============================================================
// NORMALIZE TEXT
// ============================================================

const normalizeText = (message = "") => {
  return String(message)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
};

// ============================================================
// PARSE MONEY
// ============================================================

const parseMoney = (value) => {
  if (!value) {
    return null;
  }

  const cleaned = String(value)
    .replace(/,/g, "")
    .replace(/₹/g, "")
    .replace(/rs\.?/gi, "")
    .replace(/inr/gi, "")
    .replace(/rupees/gi, "")
    .trim();

  const number = Number(cleaned);

  if (!Number.isFinite(number)) {
    return null;
  }

  if (number <= 0) {
    return null;
  }

  return number;
};

// ============================================================
// EXTRACT BUDGET
// ============================================================

const extractBudget = (text) => {
  let minPrice = null;
  let maxPrice = null;

  // between ₹50,000 and ₹80,000
  const betweenMatch = text.match(
    /between\s*(?:₹|rs\.?|inr|rupees)?\s*([\d,]+)\s*(?:and|-)\s*(?:₹|rs\.?|inr|rupees)?\s*([\d,]+)/i
  );

  if (betweenMatch) {
    minPrice = parseMoney(
      betweenMatch[1]
    );

    maxPrice = parseMoney(
      betweenMatch[2]
    );

    return {
      minPrice,
      maxPrice,
    };
  }

  // from ₹50,000 to ₹80,000
  const rangeMatch = text.match(
    /from\s*(?:₹|rs\.?|inr|rupees)?\s*([\d,]+)\s*(?:to|-)\s*(?:₹|rs\.?|inr|rupees)?\s*([\d,]+)/i
  );

  if (rangeMatch) {
    minPrice = parseMoney(
      rangeMatch[1]
    );

    maxPrice = parseMoney(
      rangeMatch[2]
    );

    return {
      minPrice,
      maxPrice,
    };
  }

  // under / below / less than / within
  const maxMatch = text.match(
    /(?:under|below|less than|within)\s*(?:₹|rs\.?|inr|rupees)?\s*([\d,]+(?:\.\d+)?)/i
  );

  if (maxMatch) {
    maxPrice = parseMoney(
      maxMatch[1]
    );

    return {
      minPrice: null,
      maxPrice,
    };
  }

  // ₹80,000
  const rupeeMatch = text.match(
    /₹\s*([\d,]+(?:\.\d+)?)/i
  );

  if (rupeeMatch) {
    maxPrice = parseMoney(
      rupeeMatch[1]
    );

    return {
      minPrice: null,
      maxPrice,
    };
  }

  // Rs 80,000 / INR 80,000 / rupees 80,000
  const currencyMatch = text.match(
    /(?:rs\.?|inr|rupees)\s*([\d,]+(?:\.\d+)?)/i
  );

  if (currencyMatch) {
    maxPrice = parseMoney(
      currencyMatch[1]
    );

    return {
      minPrice: null,
      maxPrice,
    };
  }

  return {
    minPrice: null,
    maxPrice: null,
  };
};

// ============================================================
// DETECT CART ACTION
// ============================================================

const detectCartAction = (text = "") => {
  const value =
    normalizeText(text);

  // ==========================================================
  // CLEAR CART
  // ==========================================================

  if (
    value === "clear cart" ||
    value === "clear my cart" ||
    value === "clear the cart" ||
    value === "clear the shopping cart" ||
    value === "empty cart" ||
    value === "empty my cart" ||
    value === "empty the cart" ||
    value === "delete cart" ||
    value === "delete my cart" ||
    value === "remove all from cart" ||
    value === "remove all from my cart" ||
    value ===
      "remove everything from cart" ||
    value ===
      "remove everything from my cart" ||
    value ===
      "delete everything from cart" ||
    value ===
      "delete everything from my cart"
  ) {
    return "clearCart";
  }

  // ==========================================================
  // REMOVE PRODUCT FROM CART
  // ==========================================================

  if (
    /^(remove|delete)\s+.+\s+from\s+(my\s+)?cart$/i.test(
      value
    )
  ) {
    return "removeCart";
  }

  if (
    /^(remove|delete)\s+.+\s+out\s+of\s+(my\s+)?cart$/i.test(
      value
    )
  ) {
    return "removeCart";
  }

  if (
    /^take\s+.+\s+out\s+of\s+(my\s+)?cart$/i.test(
      value
    )
  ) {
    return "removeCart";
  }

  // ==========================================================
  // UPDATE QUANTITY
  // ==========================================================

  if (
    /^set\s+.+\s+quantity\s+(to|=)\s*-?\d+$/i.test(
      value
    )
  ) {
    return "updateCart";
  }

  if (
    /^change\s+.+\s+quantity\s+(to|=)\s*-?\d+$/i.test(
      value
    )
  ) {
    return "updateCart";
  }

  if (
    /^update\s+.+\s+quantity\s+(to|=)\s*-?\d+$/i.test(
      value
    )
  ) {
    return "updateCart";
  }

  if (
    /^increase\s+.+\s+to\s+-?\d+$/i.test(
      value
    )
  ) {
    return "updateCart";
  }

  if (
    /^decrease\s+.+\s+to\s+-?\d+$/i.test(
      value
    )
  ) {
    return "updateCart";
  }

  // ==========================================================
  // ADD TO CART
  // ==========================================================
  // IMPORTANT:
  //
  // add OnePlus 13 to cart
  // add 2 OnePlus 13 to cart
  // please add OnePlus 13 to my cart
  // put Sony WH-1000XM6 in my cart
  //
  // The product name is between ADD and TO CART.
  // ==========================================================

  if (
    /^add\s+.+\s+to\s+(my\s+)?cart$/i.test(
      value
    )
  ) {
    return "cart";
  }

  if (
    /^please\s+add\s+.+\s+to\s+(my\s+)?cart$/i.test(
      value
    )
  ) {
    return "cart";
  }

  if (
    /^put\s+.+\s+(in|into)\s+(my\s+)?cart$/i.test(
      value
    )
  ) {
    return "cart";
  }

  // buy OnePlus 13
  if (
    /^buy\s+.+$/i.test(value)
  ) {
    return "cart";
  }

  // ==========================================================
  // VIEW CART
  // ==========================================================
  // IMPORTANT:
  // This must come LAST.
  // ==========================================================

  if (
    value === "cart" ||
    value === "my cart" ||
    value === "show cart" ||
    value === "show my cart" ||
    value === "show me cart" ||
    value === "show me my cart" ||
    value === "view cart" ||
    value === "view my cart" ||
    value === "open cart" ||
    value === "open my cart" ||
    value === "check cart" ||
    value === "check my cart" ||
    value === "what is in my cart" ||
    value === "what's in my cart" ||
    value === "whats in my cart" ||
    value === "what do i have in my cart"
  ) {
    return "viewCart";
  }

  return null;
};

// ============================================================
// EXTRACT QUANTITY
// ============================================================

const extractQuantity = (
  text = ""
) => {
  const patterns = [
    // add 2 OnePlus 13 to cart
    /\b(?:add|buy|purchase)\s+(\d+)\b/i,

    // quantity to 3
    /\bquantity\s+(?:to|of|is|=)?\s*(\d+)\b/i,

    // set OnePlus 13 quantity to 3
    /\b(?:set|change|update)\s+.+?\s+quantity\s+(?:to|=)\s*(\d+)\b/i,

    // increase OnePlus 13 to 3
    /\b(?:increase|decrease)\s+.+?\s+to\s+(\d+)\b/i,

    // 3 items
    /\b(\d+)\s*(?:items?|units?|pieces?)\b/i,
  ];

  for (
    const pattern of patterns
  ) {
    const match =
      text.match(pattern);

    if (!match) {
      continue;
    }

    const quantity =
      Number(match[1]);

    if (
      Number.isInteger(quantity) &&
      quantity > 0
    ) {
      return quantity;
    }
  }

  return 1;
};

// ============================================================
// PRODUCT NAMES
// ============================================================

const PRODUCT_NAMES = [
  // iPhone
  "iphone 16 pro",
  "iphone 16",
  "iphone 15",

  // Samsung
  "samsung galaxy s25 ultra",
  "galaxy s25 ultra",
  "samsung galaxy s25",
  "galaxy s25",
  "samsung galaxy s24",
  "galaxy s24",

  // OnePlus
  "oneplus 13",
  "oneplus 12",

  // Sony
  "sony wh-1000xm6",
  "sony wh-1000xm5",

  // Apple
  "airpods pro",

  // Google
  "google pixel 10",
  "pixel 10",

  // Dairy
  "amul gold full cream milk",
  "amul toned milk",

  // Beverages
  "tata tea premium",
  "nescafe gold",
  "red bull energy drink",

  // Electronics
  "samsung t9 ssd",
  "anker 100w charger",

  // Fashion
  "adidas hoodie",
  "puma sneakers",
  "sunglasses",

  // Home
  "prestige pressure cooker",
  "philips air fryer",
];

// ============================================================
// EXTRACT PRODUCT NAMES
// ============================================================

const extractProductNames = (
  text
) => {
  const names = [];

  for (
    const product of PRODUCT_NAMES
  ) {
    if (
      text.includes(
        product.toLowerCase()
      )
    ) {
      names.push(product);
    }
  }

  // Longest product name first
  names.sort(
    (a, b) =>
      b.length - a.length
  );

  return [
    ...new Set(names),
  ];
};

// ============================================================
// BRANDS
// ============================================================

const BRAND_NAMES = [
  "samsung",
  "apple",
  "iphone",
  "oneplus",
  "xiaomi",
  "redmi",
  "sony",
  "google",
  "pixel",
  "noise",
  "nike",
  "puma",
  "adidas",
  "amul",
  "tata tea",
  "tata",
  "bella vita",
  "philips",
  "fastrack",
  "anker",
  "prestige",
  "nescafe",
  "red bull",
];

// ============================================================
// EXTRACT BRANDS
// ============================================================

const extractBrands = (
  text
) => {
  const brands = [];

  for (
    const brand of BRAND_NAMES
  ) {
    if (
      text.includes(brand)
    ) {
      brands.push(brand);
    }
  }

  return [
    ...new Set(brands),
  ];
};

// ============================================================
// PRODUCT TYPE
// ============================================================

const extractProductType = (
  text
) => {
  const productTypeMap = [
    {
      keywords: [
        "smartphone",
        "smartphones",
        "phone",
        "phones",
        "mobile",
        "mobiles",
      ],
      type: "Mobile",
    },

    {
      keywords: [
        "headphone",
        "headphones",
        "earbuds",
        "earphones",
      ],
      type: "Headphones",
    },

    {
      keywords: [
        "smart watch",
        "smartwatch",
      ],
      type: "Smartwatch",
    },

    {
      keywords: [
        "watch",
      ],
      type: "Watch",
    },

    {
      keywords: [
        "milk",
      ],
      type: "Milk",
    },

    {
      keywords: [
        "tea",
      ],
      type: "Tea",
    },

    {
      keywords: [
        "coffee",
      ],
      type: "Coffee",
    },

    {
      keywords: [
        "perfume",
      ],
      type: "Perfume",
    },

    {
      keywords: [
        "lamp",
      ],
      type: "Lamp",
    },

    {
      keywords: [
        "shoes",
      ],
      type: "Shoes",
    },

    {
      keywords: [
        "sneakers",
      ],
      type: "Sneakers",
    },

    {
      keywords: [
        "sunglasses",
      ],
      type: "Sunglasses",
    },

    {
      keywords: [
        "charger",
      ],
      type: "Charger",
    },

    {
      keywords: [
        "ssd",
        "storage",
      ],
      type: "Storage",
    },

    {
      keywords: [
        "hoodie",
      ],
      type: "Hoodie",
    },

    {
      keywords: [
        "pressure cooker",
      ],
      type: "Pressure Cooker",
    },

    {
      keywords: [
        "air fryer",
      ],
      type: "Air Fryer",
    },

    {
      keywords: [
        "energy drink",
      ],
      type: "Energy Drink",
    },
  ];

  for (
    const item of productTypeMap
  ) {
    if (
      item.keywords.some(
        (keyword) =>
          text.includes(keyword)
      )
    ) {
      return item.type;
    }
  }

  return null;
};

// ============================================================
// CATEGORY
// ============================================================

const extractCategory = (
  text,
  productType
) => {
  const categoryKeywords = {
    electronics:
      "Electronics",

    electronic:
      "Electronics",

    fashion:
      "Fashion",

    beauty:
      "Beauty",

    home:
      "Home",

    beverage:
      "Beverages",

    beverages:
      "Beverages",

    dairy:
      "Dairy",

    groceries:
      "Groceries",
  };

  for (
    const [
      keyword,
      category,
    ] of Object.entries(
      categoryKeywords
    )
  ) {
    if (
      text.includes(keyword)
    ) {
      return category;
    }
  }

  if (
    [
      "Mobile",
      "Headphones",
      "Smartwatch",
      "Watch",
      "Storage",
      "Charger",
    ].includes(productType)
  ) {
    return "Electronics";
  }

  if (
    productType === "Milk"
  ) {
    return "Dairy";
  }

  if (
    [
      "Tea",
      "Coffee",
      "Energy Drink",
    ].includes(productType)
  ) {
    return "Beverages";
  }

  if (
    [
      "Shoes",
      "Sneakers",
      "Hoodie",
      "Sunglasses",
    ].includes(productType)
  ) {
    return "Fashion";
  }

  if (
    [
      "Pressure Cooker",
      "Air Fryer",
    ].includes(productType)
  ) {
    return "Home";
  }

  return null;
};

// ============================================================
// PREFERENCES
// ============================================================

const extractPreferences = (
  text
) => {
  const preferences = {
    ...DEFAULT_PREFERENCES,
  };

  const preferenceKeywords = {
    battery: [
      "battery",
      "battery life",
      "long battery",
      "long lasting battery",
    ],

    camera: [
      "camera",
      "photo",
      "photography",
      "selfie",
    ],

    gaming: [
      "gaming",
      "game",
      "games",
      "gamer",
    ],

    performance: [
      "performance",
      "fast",
      "faster",
      "speed",
      "powerful",
    ],

    display: [
      "display",
      "screen",
      "amoled",
      "oled",
      "120hz",
      "144hz",
    ],

    storage: [
      "storage",
      "128gb",
      "256gb",
      "512gb",
      "1tb",
      "2tb",
      "ssd",
    ],
  };

  for (
    const [
      key,
      keywords,
    ] of Object.entries(
      preferenceKeywords
    )
  ) {
    if (
      keywords.some(
        (keyword) =>
          text.includes(keyword)
      )
    ) {
      preferences[key] =
        true;
    }
  }

  // Gaming implies performance
  if (
    preferences.gaming
  ) {
    preferences.performance =
      true;
  }

  return preferences;
};

// ============================================================
// EXTRACT INTENT
// ============================================================

const extractIntent = (
  message
) => {
  const text =
    normalizeText(message);

  const intent = {
    intentType:
      "general",

    category:
      null,

    productType:
      null,

    brand:
      null,

    brands: [],

    productNames: [],

    maxPrice:
      null,

    minPrice:
      null,

    preferences: {
      ...DEFAULT_PREFERENCES,
    },

    originalMessage:
      message,
  };

  // ==========================================================
  // CART ACTION HAS HIGHEST PRIORITY
  // ==========================================================

  const cartAction =
    detectCartAction(text);

  if (cartAction) {
    intent.intentType =
      cartAction;
  }

  // ==========================================================
  // NORMAL INTENTS
  // ==========================================================

  else if (
    text.includes("compare") ||
    text.includes("comparison") ||
    text.includes("difference") ||
    text.includes(" vs ") ||
    text.endsWith(" vs")
  ) {
    intent.intentType =
      "comparison";
  }

  else if (
    text.includes("recommend") ||
    text.includes("recommendation") ||
    text.includes("suggest") ||
    text.includes("help me choose") ||
    text.includes("help me decide") ||
    text.includes("what should i buy") ||
    text.includes("what should i choose") ||
    text.includes("best phone") ||
    text.includes("best product") ||
    text.includes("best option")
  ) {
    intent.intentType =
      "recommendation";
  }

  else if (
    text.includes("wishlist") ||
    text.includes("save for later") ||
    text.includes("add to wishlist")
  ) {
    intent.intentType =
      "wishlist";
  }

  else if (
    text.includes("show") ||
    text.includes("find") ||
    text.includes("search") ||
    text.includes("need") ||
    text.includes("want") ||
    text.includes("looking") ||
    text.includes("phone") ||
    text.includes("phones") ||
    text.includes("headphone") ||
    text.includes("headphones") ||
    text.includes("watch") ||
    text.includes("shoes") ||
    text.includes("milk") ||
    text.includes("tea") ||
    text.includes("coffee") ||
    text.includes("product") ||
    text.includes("products")
  ) {
    intent.intentType =
      "search";
  }

  // ==========================================================
  // BUDGET
  // ==========================================================

  const budget =
    extractBudget(text);

  intent.maxPrice =
    budget.maxPrice;

  intent.minPrice =
    budget.minPrice;

  // ==========================================================
  // PRODUCT TYPE
  // ==========================================================

  intent.productType =
    extractProductType(text);

  // ==========================================================
  // BRANDS
  // ==========================================================

  intent.brands =
    extractBrands(text);

  if (
    intent.brands.length === 1
  ) {
    intent.brand =
      intent.brands[0];
  }

  // ==========================================================
  // PRODUCT NAMES
  // ==========================================================

  intent.productNames =
    extractProductNames(text);

  // ==========================================================
  // CATEGORY
  // ==========================================================

  intent.category =
    extractCategory(
      text,
      intent.productType
    );

  // ==========================================================
  // PREFERENCES
  // ==========================================================

  intent.preferences =
    extractPreferences(text);

  // ==========================================================
  // DEBUG
  // ==========================================================

  console.log(
    "🧠 Extracted Intent:",
    JSON.stringify(
      intent,
      null,
      2
    )
  );

  return intent;
};

// ============================================================
// EXPORT
// ============================================================

module.exports = {
  extractIntent,
  detectCartAction,
  extractQuantity,
};