// ============================================================
// ShopSmart AI - Advanced AI Orchestrator
// Fast Search + AI + Memory + Cart Management + General AI
// ============================================================

const Cart = require("../models/Cart");

const {
  getConversation,
  saveConversation,
} = require("./memoryService");

const {
  extractIntent,
} = require("./intentService");

const {
  searchProducts,
} = require("./productSearchService");

const {
  rankProducts,
} = require("./productRankingService");

const {
  generateAIResponse,
} = require("./aiService");

const {
  addProductToUserCart,
  getUserCart,
  updateCartItemByProduct,
  removeProductFromUserCart,
  clearUserCart,
} = require("./cartActionService");

// ============================================================
// FOLLOW-UP DETECTION
// ============================================================

const isFollowUpMessage = (message = "") => {
  const text = String(message)
    .toLowerCase()
    .trim();

  const patterns = [
    "which one",
    "which is better",
    "which one is better",

    "what about",
    "how about",

    "compare them",
    "compare these",
    "compare those",

    "cheaper",
    "cheaper one",
    "cheaper option",
    "less expensive",

    "more expensive",
    "most expensive",

    "better one",
    "best one",

    "another one",
    "another option",
    "another product",

    "show more",
    "show me more",
    "more options",
    "more products",

    "the first one",
    "the second one",
    "the third one",
    "the last one",

    "this one",
    "that one",

    "them",
    "these",
    "those",
  ];

  return patterns.some((pattern) =>
    text.includes(pattern)
  );
};

// ============================================================
// FOLLOW-UP TYPE
// ============================================================

const detectFollowUpType = (message = "") => {
  const text = String(message)
    .toLowerCase()
    .trim();

  if (
    text.includes("cheaper") ||
    text.includes("less expensive")
  ) {
    return "cheaper";
  }

  if (
    text.includes("more expensive") ||
    text.includes("most expensive") ||
    text.includes("expensive")
  ) {
    return "expensive";
  }

  if (
    text.includes("battery")
  ) {
    return "battery";
  }

  if (
    text.includes("camera") ||
    text.includes("photo") ||
    text.includes("photography") ||
    text.includes("selfie")
  ) {
    return "camera";
  }

  if (
    text.includes("gaming") ||
    text.includes("game") ||
    text.includes("gamer")
  ) {
    return "gaming";
  }

  if (
    text.includes("performance") ||
    text.includes("fast") ||
    text.includes("faster") ||
    text.includes("speed")
  ) {
    return "performance";
  }

  if (
    text.includes("display") ||
    text.includes("screen") ||
    text.includes("amoled") ||
    text.includes("oled")
  ) {
    return "display";
  }

  if (
    text.includes("storage") ||
    text.includes("gb") ||
    text.includes("tb")
  ) {
    return "storage";
  }

  if (
    text.includes("compare") ||
    text.includes("difference")
  ) {
    return "comparison";
  }

  if (
    text.includes("best") ||
    text.includes("better")
  ) {
    return "best";
  }

  return "general";
};

// ============================================================
// FOLLOW-UP PREFERENCE DETECTION
// ============================================================

const detectFollowUpPreference = (message = "") => {
  const text = String(message)
    .toLowerCase()
    .trim();

  return {
    battery:
      text.includes("battery") ||
      text.includes("battery life"),

    camera:
      text.includes("camera") ||
      text.includes("photo") ||
      text.includes("photography") ||
      text.includes("selfie"),

    gaming:
      text.includes("gaming") ||
      text.includes("game") ||
      text.includes("gamer"),

    performance:
      text.includes("performance") ||
      text.includes("fast") ||
      text.includes("faster") ||
      text.includes("speed"),

    display:
      text.includes("display") ||
      text.includes("screen") ||
      text.includes("amoled") ||
      text.includes("oled"),

    storage:
      text.includes("storage") ||
      text.includes("gb") ||
      text.includes("tb"),
  };
};

// ============================================================
// MERGE PREFERENCES
// ============================================================

const mergePreferences = (
  previous = {},
  current = {}
) => {
  return {
    battery:
      Boolean(previous.battery) ||
      Boolean(current.battery),

    camera:
      Boolean(previous.camera) ||
      Boolean(current.camera),

    gaming:
      Boolean(previous.gaming) ||
      Boolean(current.gaming),

    performance:
      Boolean(previous.performance) ||
      Boolean(current.performance),

    display:
      Boolean(previous.display) ||
      Boolean(current.display),

    storage:
      Boolean(previous.storage) ||
      Boolean(current.storage),
  };
};

// ============================================================
// BUILD INTENT WITH MEMORY
// ============================================================

const buildIntent = (
  currentIntent,
  previousConversation,
  message
) => {
  const followUp =
    isFollowUpMessage(message);

  if (!followUp) {
    return currentIntent;
  }

  const previousIntent =
    previousConversation?.lastIntent || {};

  const followUpPreferences =
    detectFollowUpPreference(
      message
    );

  return {
    ...currentIntent,

    category:
      currentIntent.category ||
      previousIntent.category ||
      null,

    productType:
      currentIntent.productType ||
      previousIntent.productType ||
      null,

    brand:
      currentIntent.brand ||
      previousIntent.brand ||
      null,

    brands:
      currentIntent.brands?.length
        ? currentIntent.brands
        : previousIntent.brands || [],

    productNames:
      currentIntent.productNames?.length
        ? currentIntent.productNames
        : previousIntent.productNames || [],

    maxPrice:
      currentIntent.maxPrice ??
      previousIntent.maxPrice ??
      null,

    minPrice:
      currentIntent.minPrice ??
      previousIntent.minPrice ??
      null,

    preferences:
      mergePreferences(
        previousIntent.preferences || {},
        followUpPreferences
      ),
  };
};

// ============================================================
// GET PREVIOUS PRODUCTS
// ============================================================

const getPreviousProducts = (
  previousConversation
) => {
  if (
    !previousConversation ||
    !Array.isArray(
      previousConversation.lastProducts
    )
  ) {
    return [];
  }

  return previousConversation.lastProducts;
};

// ============================================================
// NUMBER HELPER
// ============================================================

const getNumber = (value) => {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : 0;
};

// ============================================================
// BATTERY RESPONSE
// ============================================================

const buildBatteryResponse = (
  products = []
) => {
  const available =
    products.filter(
      (product) =>
        product?.battery &&
        String(product.battery).trim() !== ""
    );

  if (!available.length) {
    return null;
  }

  const batteryValue = (value) => {
    const match =
      String(value).match(
        /(\d+(?:\.\d+)?)/i
      );

    return match
      ? Number(match[1])
      : 0;
  };

  const sorted =
    [...available].sort(
      (a, b) =>
        batteryValue(b.battery) -
        batteryValue(a.battery)
    );

  const best = sorted[0];

  return (
    `🔋 **${best.name}** has the strongest battery among these options.\n\n` +
    `Battery: **${best.battery}**\n` +
    `Price: **₹${best.price}**\n` +
    `Rating: **⭐ ${best.rating || 0}**`
  );
};

// ============================================================
// CAMERA RESPONSE
// ============================================================

const buildCameraResponse = (
  products = []
) => {
  const available =
    products.filter(
      (product) =>
        product?.camera &&
        String(product.camera).trim() !== ""
    );

  if (!available.length) {
    return null;
  }

  const cameraValue = (value) => {
    const match =
      String(value).match(
        /(\d+(?:\.\d+)?)/i
      );

    return match
      ? Number(match[1])
      : 0;
  };

  const sorted =
    [...available].sort(
      (a, b) =>
        cameraValue(b.camera) -
        cameraValue(a.camera)
    );

  const best = sorted[0];

  return (
    `📷 **${best.name}** has the strongest camera specification among these options.\n\n` +
    `Camera: **${best.camera}**\n` +
    `Price: **₹${best.price}**\n` +
    `Rating: **⭐ ${best.rating || 0}**`
  );
};

// ============================================================
// GAMING RESPONSE
// ============================================================

const buildGamingResponse = (
  products = []
) => {
  if (!products.length) {
    return null;
  }

  const gamingProducts =
    products.filter((product) => {
      const tags =
        (product.tags || []).map(
          (tag) =>
            String(tag).toLowerCase()
        );

      return (
        tags.includes("gaming") ||
        tags.includes("performance") ||
        tags.includes("gamer")
      );
    });

  const candidates =
    gamingProducts.length
      ? gamingProducts
      : products;

  const sorted =
    [...candidates].sort(
      (a, b) => {
        const aTags =
          (a.tags || []).map(
            (tag) =>
              String(tag).toLowerCase()
          );

        const bTags =
          (b.tags || []).map(
            (tag) =>
              String(tag).toLowerCase()
          );

        const aScore =
          (aTags.includes("gaming")
            ? 20
            : 0) +
          (aTags.includes("performance")
            ? 15
            : 0) +
          getNumber(a.rating) * 2;

        const bScore =
          (bTags.includes("gaming")
            ? 20
            : 0) +
          (bTags.includes("performance")
            ? 15
            : 0) +
          getNumber(b.rating) * 2;

        return bScore - aScore;
      }
    );

  const best = sorted[0];

  let response =
    `🎮 **${best.name}** is the best gaming choice among these options.\n\n`;

  response +=
    `💰 Price: **₹${best.price}**\n`;

  response +=
    `⭐ Rating: **${best.rating || 0}**\n`;

  if (best.processor) {
    response +=
      `⚡ Processor: **${best.processor}**\n`;
  }

  if (best.ram) {
    response +=
      `🧠 RAM: **${best.ram}**\n`;
  }

  if (best.battery) {
    response +=
      `🔋 Battery: **${best.battery}**\n`;
  }

  if (best.display) {
    response +=
      `🖥️ Display: **${best.display}**\n`;
  }

  return response;
};

// ============================================================
// PERFORMANCE RESPONSE
// ============================================================

const buildPerformanceResponse = (
  products = []
) => {
  if (!products.length) {
    return null;
  }

  const sorted =
    [...products].sort(
      (a, b) => {
        const aTags =
          (a.tags || []).map(
            (tag) =>
              String(tag).toLowerCase()
          );

        const bTags =
          (b.tags || []).map(
            (tag) =>
              String(tag).toLowerCase()
          );

        const aScore =
          (aTags.includes("performance")
            ? 20
            : 0) +
          (aTags.includes("gaming")
            ? 10
            : 0) +
          getNumber(a.rating) * 2;

        const bScore =
          (bTags.includes("performance")
            ? 20
            : 0) +
          (bTags.includes("gaming")
            ? 10
            : 0) +
          getNumber(b.rating) * 2;

        return bScore - aScore;
      }
    );

  const best = sorted[0];

  let response =
    `⚡ **${best.name}** is the strongest performance choice among these options.\n\n`;

  response +=
    `💰 Price: **₹${best.price}**\n`;

  response +=
    `⭐ Rating: **${best.rating || 0}**\n`;

  if (best.processor) {
    response +=
      `⚡ Processor: **${best.processor}**\n`;
  }

  if (best.ram) {
    response +=
      `🧠 RAM: **${best.ram}**\n`;
  }

  return response;
};

// ============================================================
// DISPLAY RESPONSE
// ============================================================

const buildDisplayResponse = (
  products = []
) => {
  const available =
    products.filter(
      (product) =>
        product?.display &&
        String(product.display).trim() !== ""
    );

  if (!available.length) {
    return null;
  }

  const best =
    available[0];

  return (
    `🖥️ **${best.name}** has a great display among these options.\n\n` +
    `Display: **${best.display}**\n` +
    `Price: **₹${best.price}**\n` +
    `Rating: **⭐ ${best.rating || 0}**`
  );
};

// ============================================================
// STORAGE RESPONSE
// ============================================================

const buildStorageResponse = (
  products = []
) => {
  const available =
    products.filter(
      (product) =>
        product?.storage &&
        String(product.storage).trim() !== ""
    );

  if (!available.length) {
    return null;
  }

  const storageValue = (value) => {
    const text =
      String(value).toLowerCase();

    const tb =
      text.match(
        /(\d+(?:\.\d+)?)\s*tb/
      );

    if (tb) {
      return (
        Number(tb[1]) * 1024
      );
    }

    const gb =
      text.match(
        /(\d+(?:\.\d+)?)\s*gb/
      );

    return gb
      ? Number(gb[1])
      : 0;
  };

  const sorted =
    [...available].sort(
      (a, b) =>
        storageValue(b.storage) -
        storageValue(a.storage)
    );

  const best =
    sorted[0];

  return (
    `💾 **${best.name}** has the largest storage among these options.\n\n` +
    `Storage: **${best.storage}**\n` +
    `Price: **₹${best.price}**\n` +
    `Rating: **⭐ ${best.rating || 0}**`
  );
};

// ============================================================
// CHEAPER RESPONSE
// ============================================================

const buildCheaperResponse = (
  products = []
) => {
  if (products.length < 2) {
    return null;
  }

  const sorted =
    [...products].sort(
      (a, b) =>
        getNumber(a.price) -
        getNumber(b.price)
    );

  const cheapest =
    sorted[0];

  return (
    `💰 **${cheapest.name}** is the cheapest option among these products.\n\n` +
    `Price: **₹${cheapest.price}**\n` +
    `Rating: **⭐ ${cheapest.rating || 0}**`
  );
};

// ============================================================
// EXPENSIVE RESPONSE
// ============================================================

const buildExpensiveResponse = (
  products = []
) => {
  if (products.length < 2) {
    return null;
  }

  const sorted =
    [...products].sort(
      (a, b) =>
        getNumber(b.price) -
        getNumber(a.price)
    );

  const expensive =
    sorted[0];

  return (
    `💎 **${expensive.name}** is the most expensive option among these products.\n\n` +
    `Price: **₹${expensive.price}**\n` +
    `Rating: **⭐ ${expensive.rating || 0}**`
  );
};

// ============================================================
// COMPARISON RESPONSE
// ============================================================

const buildComparisonResponse = (
  products = []
) => {
  if (products.length < 2) {
    return null;
  }

  const first =
    products[0];

  const second =
    products[1];

  let response =
    `### 🔍 Product Comparison\n\n`;

  response +=
    `| Feature | ${first.name} | ${second.name} |\n`;

  response +=
    `|---|---|---|\n`;

  response +=
    `| Price | ₹${first.price} | ₹${second.price} |\n`;

  response +=
    `| Rating | ⭐ ${first.rating || 0} | ⭐ ${second.rating || 0} |\n`;

  response +=
    `| Brand | ${first.brand || "N/A"} | ${second.brand || "N/A"} |\n`;

  if (
    first.battery ||
    second.battery
  ) {
    response +=
      `| Battery | ${first.battery || "N/A"} | ${second.battery || "N/A"} |\n`;
  }

  if (
    first.camera ||
    second.camera
  ) {
    response +=
      `| Camera | ${first.camera || "N/A"} | ${second.camera || "N/A"} |\n`;
  }

  if (
    first.display ||
    second.display
  ) {
    response +=
      `| Display | ${first.display || "N/A"} | ${second.display || "N/A"} |\n`;
  }

  if (
    first.processor ||
    second.processor
  ) {
    response +=
      `| Processor | ${first.processor || "N/A"} | ${second.processor || "N/A"} |\n`;
  }

  if (
    first.ram ||
    second.ram
  ) {
    response +=
      `| RAM | ${first.ram || "N/A"} | ${second.ram || "N/A"} |\n`;
  }

  if (
    first.storage ||
    second.storage
  ) {
    response +=
      `| Storage | ${first.storage || "N/A"} | ${second.storage || "N/A"} |\n`;
  }

  return response;
};

// ============================================================
// FAST NORMAL RESPONSE
// ============================================================

const buildFastResponse = (
  products = []
) => {
  if (!products.length) {
    return "I couldn't find any matching products in our current catalog.";
  }

  const visible =
    products.slice(0, 8);

  let response =
    `I found ${visible.length} matching product${
      visible.length === 1
        ? ""
        : "s"
    }:\n\n`;

  visible.forEach(
    (product, index) => {
      response +=
        `${index + 1}. **${product.name}**\n`;

      response +=
        `💰 ₹${product.price}\n`;

      response +=
        `⭐ ${product.rating || 0}\n`;

      if (product.weight) {
        response +=
          `📦 ${product.weight}\n`;
      }

      response +=
        product.stock > 0
          ? "📦 In Stock\n\n"
          : "❌ Out of Stock\n\n";
    }
  );

  response +=
    "You can select a product to view more details.";

  return response;
};

// ============================================================
// AI FALLBACK
// ============================================================

const buildFallbackResponse = (
  products = [],
  intent = {}
) => {
  if (!products.length) {
    return "I couldn't find any matching products in our current catalog.";
  }

  const best =
    products[0];

  let response =
    `Based on your requirements, **${best.name}** is the best match.\n\n`;

  response +=
    `💰 Price: ₹${best.price}\n`;

  response +=
    `⭐ Rating: ${best.rating || 0}\n`;

  if (best.processor) {
    response +=
      `⚡ Processor: ${best.processor}\n`;
  }

  if (best.ram) {
    response +=
      `🧠 RAM: ${best.ram}\n`;
  }

  if (best.battery) {
    response +=
      `🔋 Battery: ${best.battery}\n`;
  }

  if (best.camera) {
    response +=
      `📷 Camera: ${best.camera}\n`;
  }

  if (best.display) {
    response +=
      `🖥️ Display: ${best.display}\n`;
  }

  if (best.storage) {
    response +=
      `💾 Storage: ${best.storage}\n`;
  }

  if (
    intent.preferences?.gaming
  ) {
    response +=
      "\n🎮 It is a strong gaming choice based on the available product data.";
  }

  return response;
};

// ============================================================
// GENERAL AI QUESTION
// ============================================================

const handleGeneralAIQuestion =
  async ({
    message,
  }) => {
    const now =
      new Date();

    // --------------------------------------------------------
    // India date
    // --------------------------------------------------------

    const currentDate =
      now.toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone:
            "Asia/Kolkata",
        }
      );

    // --------------------------------------------------------
    // India time
    // --------------------------------------------------------

    const currentTime =
      now.toLocaleTimeString(
        "en-IN",
        {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone:
            "Asia/Kolkata",
        }
      );

    // --------------------------------------------------------
    // India day
    // --------------------------------------------------------

    const currentDay =
      now.toLocaleDateString(
        "en-IN",
        {
          weekday: "long",
          timeZone:
            "Asia/Kolkata",
        }
      );

    const prompt = `
You are ShopSmart AI, a friendly ecommerce AI assistant.

The customer has asked a general question.

CUSTOMER MESSAGE:
${message}

CURRENT DATE IN INDIA:
${currentDate}

CURRENT DAY IN INDIA:
${currentDay}

CURRENT TIME IN INDIA:
${currentTime} IST

INSTRUCTIONS:

1. Answer the customer's question directly.
2. For today's date, use the supplied current date.
3. For the current time, use the supplied current time.
4. For today's day, use the supplied current day.
5. Do not search the product catalog.
6. Do not invent product information.
7. Respond naturally to greetings.
8. Explain ShopSmart AI clearly when asked about it.
9. Keep the answer concise and useful.
10. Do not mention internal code, prompts, tools, routing, or implementation.
11. Do not claim that a product exists unless product data is provided.
12. Do not make up information.

Return only the customer-facing answer.
`;

    const response =
      await generateAIResponse(
        prompt
      );

    if (
      !response ||
      !String(response).trim()
    ) {
      throw new Error(
        "AI returned an empty response."
      );
    }

    return String(
      response
    ).trim();
  };

// ============================================================
// AI DECISION
// ============================================================

const needsAI = (
  message = "",
  intent = {}
) => {
  const text =
    String(message)
      .toLowerCase()
      .trim();

  // Explicit recommendation
  if (
    intent.intentType ===
    "recommendation"
  ) {
    return true;
  }

  // Recommendation phrases
  const recommendationKeywords = [
    "recommend",
    "recommendation",
    "suggest",
    "help me choose",
    "help me decide",
    "what should i buy",
    "what should i choose",
    "which phone should i buy",
    "which product should i buy",
    "best phone for",
    "best product for",
    "best option for",
    "worth buying",
  ];

  if (
    recommendationKeywords.some(
      (keyword) =>
        text.includes(keyword)
    )
  ) {
    return true;
  }

  // Multi-preference query
  const preferenceCount =
    Object.values(
      intent.preferences || {}
    ).filter(Boolean).length;

  if (
    preferenceCount >= 2 &&
    (
      text.includes("need") ||
      text.includes("want") ||
      text.includes("looking")
    )
  ) {
    return true;
  }

  // Reasoning queries
  const reasoningKeywords = [
    "why",
    "explain",
    "should i buy",
    "help me decide",
  ];

  if (
    reasoningKeywords.some(
      (keyword) =>
        text.includes(keyword)
    )
  ) {
    return true;
  }

  return false;
};

// ============================================================
// RESOLVE PRODUCT FOR CART ACTION
// ============================================================

const resolveCartProduct =
  async ({
    intent,
    message,
  }) => {
    const Product =
      require("../models/Product");

    let results = [];

    // --------------------------------------------------------
    // EXPLICIT PRODUCT NAME
    // --------------------------------------------------------

    if (
      intent.productNames?.length
    ) {
      for (
        const productName of
          intent.productNames
      ) {
        const escapedName =
          String(
            productName
          ).replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
          );

        const found =
          await Product.find({
            isActive: true,

            name: {
              $regex:
                escapedName,

              $options:
                "i",
            },
          });

        results.push(
          ...found
        );
      }
    }

    // --------------------------------------------------------
    // IMPORTANT:
    // Do NOT make up a replacement product.
    //
    // Only use structured search when we did NOT receive
    // an explicit product name.
    // --------------------------------------------------------

    if (
      !results.length &&
      !intent.productNames?.length
    ) {
      results =
        await searchProducts({
          ...intent,

          intentType:
            "search",

          originalMessage:
            message,
        });
    }

    // --------------------------------------------------------
    // Remove duplicates
    // --------------------------------------------------------

    results = [
      ...new Map(
        results.map(
          (product) => [
            String(product._id),
            product,
          ]
        )
      ).values(),
    ];

    return results;
  };

// ============================================================
// SAVE MEMORY SAFELY
// ============================================================

const saveMemorySafely =
  async ({
    sessionId,
    message,
    products,
    intent,
    response,
  }) => {
    try {
      await saveConversation(
        sessionId,
        message,
        products || [],
        intent?.preferences || {},
        intent || {},
        response || ""
      );
    } catch (error) {
      console.warn(
        "⚠️ Memory save failed:",
        error.message
      );
    }
  };

// ============================================================
// MAIN ORCHESTRATOR
// ============================================================

const processShoppingConversation =
  async ({
    sessionId,
    message,
    userId = null,
  }) => {
    const startTime =
      Date.now();

    // ========================================================
    // VALIDATION
    // ========================================================

    if (!sessionId) {
      throw new Error(
        "Session ID is required."
      );
    }

    if (
      !message ||
      !String(message).trim()
    ) {
      throw new Error(
        "Message is required."
      );
    }

    const cleanMessage =
      String(message).trim();

    console.log(
      "\n========================================"
    );

    console.log(
      "🤖 ShopSmart AI Request:",
      cleanMessage
    );

    console.log(
      "👤 User ID:",
      userId || "Guest"
    );

    // ========================================================
    // MEMORY
    // ========================================================

    let previousConversation =
      null;

    try {
      previousConversation =
        await getConversation(
          sessionId
        );
    } catch (error) {
      console.warn(
        "⚠️ Memory unavailable:",
        error.message
      );
    }

    // ========================================================
    // INTENT
    // ========================================================

    const currentIntent =
      extractIntent(
        cleanMessage
      );

    const intent =
      buildIntent(
        currentIntent,
        previousConversation,
        cleanMessage
      );

    const followUp =
      isFollowUpMessage(
        cleanMessage
      );

    console.log(
      "🔄 Follow-up:",
      followUp
    );

    console.log(
      "🧠 Intent:",
      intent.intentType
    );

    console.log(
      "📂 Category:",
      intent.category
    );

    console.log(
      "📱 Product Type:",
      intent.productType
    );

    console.log(
      "🏷️ Brand:",
      intent.brand
    );

    console.log(
      "💰 Max Price:",
      intent.maxPrice
    );

    console.log(
      "🎯 Preferences:",
      intent.preferences
    );

    // ========================================================
    // VIEW CART
    // ========================================================

    if (
      intent.intentType ===
      "viewCart"
    ) {
      console.log(
        "🛒 VIEW CART REQUEST"
      );

      const cartResult =
        await getUserCart(
          userId
        );

      if (
        !cartResult.success
      ) {
        const totalTime =
          Date.now() -
          startTime;

        return {
          message:
            cartResult.message,

          intent: {
            type:
              "viewCart",
          },

          products: [],

          cart: null,

          metadata: {
            productCount: 0,
            hasResults: false,
            responseMode:
              "cart-login-required",
            responseTimeMs:
              totalTime,
            generatedAt:
              new Date(),
          },
        };
      }

      // ------------------------------------------------------
      // Empty
      // ------------------------------------------------------

      if (
        cartResult.items.length ===
        0
      ) {
        const response =
          "🛒 Your cart is currently empty.";

        await saveMemorySafely({
          sessionId,
          message:
            cleanMessage,
          products: [],
          intent,
          response,
        });

        const totalTime =
          Date.now() -
          startTime;

        return {
          message:
            response,

          intent: {
            type:
              "viewCart",
          },

          products: [],

          cart:
            cartResult,

          metadata: {
            productCount: 0,
            hasResults: false,
            responseMode:
              "cart-view",
            responseTimeMs:
              totalTime,
            generatedAt:
              new Date(),
          },
        };
      }

      let response =
        "🛒 **Your Cart**\n\n";

      cartResult.items.forEach(
        (item, index) => {
          response +=
            `${index + 1}. **${item.name}**\n`;

          response +=
            `💰 ₹${item.price}\n`;

          response +=
            `📦 Quantity: ${item.quantity}\n`;

          response +=
            `💵 Total: ₹${item.itemTotal}\n\n`;
        }
      );

      response +=
        `**Total Items:** ${cartResult.totalItems}\n`;

      response +=
        `**Cart Total:** ₹${cartResult.subtotal}`;

      await saveMemorySafely({
        sessionId,
        message:
          cleanMessage,
        products: [],
        intent,
        response,
      });

      const totalTime =
        Date.now() -
        startTime;

      console.log(
        `⚡ Cart view: ${totalTime}ms`
      );

      return {
        message:
          response,

        intent: {
          type:
            "viewCart",
        },

        products: [],

        cart:
          cartResult,

        metadata: {
          productCount:
            cartResult.items.length,

          hasResults:
            true,

          responseMode:
            "cart-view",

          responseTimeMs:
            totalTime,

          generatedAt:
            new Date(),
        },
      };
    }

    // ========================================================
    // CLEAR CART
    // ========================================================

    if (
      intent.intentType ===
      "clearCart"
    ) {
      console.log(
        "🧹 CLEAR CART REQUEST"
      );

      const result =
        await clearUserCart(
          userId
        );

      const response =
        result.success
          ? `✅ ${result.message}`
          : `❌ ${result.message}`;

      await saveMemorySafely({
        sessionId,
        message:
          cleanMessage,
        products: [],
        intent,
        response,
      });

      const totalTime =
        Date.now() -
        startTime;

      return {
        message:
          response,

        intent: {
          type:
            "clearCart",
        },

        products: [],

        cart: {
          totalItems:
            result.totalItems || 0,

          subtotal:
            result.subtotal || 0,
        },

        metadata: {
          productCount: 0,
          hasResults:
            result.success,
          responseMode:
            "cart-clear",
          responseTimeMs:
            totalTime,
          generatedAt:
            new Date(),
        },
      };
    }

    // ========================================================
    // REMOVE FROM CART
    // ========================================================

    if (
      intent.intentType ===
      "removeCart"
    ) {
      console.log(
        "🗑️ REMOVE CART REQUEST"
      );

      if (!userId) {
        return {
          message:
            "Please log in to modify your cart.",

          intent: {
            type:
              "removeCart",
          },

          products: [],

          metadata: {
            productCount: 0,
            hasResults: false,
            responseMode:
              "cart-login-required",
            responseTimeMs:
              Date.now() -
              startTime,
            generatedAt:
              new Date(),
          },
        };
      }

      const products =
        await resolveCartProduct({
          intent,
          message:
            cleanMessage,
        });

      if (
        !products.length
      ) {
        return {
          message:
            "I couldn't identify which product you want to remove.",

          intent: {
            type:
              "removeCart",
          },

          products: [],

          metadata: {
            productCount: 0,
            hasResults: false,
            responseMode:
              "cart-product-not-found",
            responseTimeMs:
              Date.now() -
              startTime,
            generatedAt:
              new Date(),
          },
        };
      }

      const selectedProduct =
        products[0];

      const result =
        await removeProductFromUserCart(
          userId,
          selectedProduct._id
        );

      const response =
        result.success
          ? `✅ **${selectedProduct.name}** has been removed from your cart.\n\nCart items: **${result.totalItems}**\nCart total: **₹${result.subtotal}**`
          : `❌ ${result.message}`;

      await saveMemorySafely({
        sessionId,
        message:
          cleanMessage,
        products: [
          selectedProduct,
        ],
        intent,
        response,
      });

      const totalTime =
        Date.now() -
        startTime;

      return {
        message:
          response,

        intent: {
          type:
            "removeCart",
        },

        products: [
          selectedProduct,
        ],

        cart: {
          totalItems:
            result.totalItems || 0,

          subtotal:
            result.subtotal || 0,
        },

        metadata: {
          productCount: 1,
          hasResults:
            result.success,
          responseMode:
            "cart-remove",
          responseTimeMs:
            totalTime,
          generatedAt:
            new Date(),
        },
      };
    }

    // ========================================================
    // UPDATE CART
    // ========================================================

    if (
      intent.intentType ===
      "updateCart"
    ) {
      console.log(
        "🔢 UPDATE CART REQUEST"
      );

      if (!userId) {
        return {
          message:
            "Please log in to modify your cart.",

          intent: {
            type:
              "updateCart",
          },

          products: [],

          metadata: {
            productCount: 0,
            hasResults: false,
            responseMode:
              "cart-login-required",
            responseTimeMs:
              Date.now() -
              startTime,
            generatedAt:
              new Date(),
          },
        };
      }

      // ------------------------------------------------------
      // Extract quantity
      // ------------------------------------------------------

      const quantityMatch =
        cleanMessage.match(
          /(?:quantity\s+(?:to|=|of)\s*|-?\s*to\s+|=\s*)(-?\d+)\b/i
        );

      let quantity =
        quantityMatch
          ? Number(
              quantityMatch[1]
            )
          : null;

      // Fallback for:
      // set X quantity to 3
      if (
        quantity === null
      ) {
        const fallbackMatch =
          cleanMessage.match(
            /\b(?:set|change|update)\b.*\bquantity\b.*\b(-?\d+)\b/i
          );

        if (fallbackMatch) {
          quantity =
            Number(
              fallbackMatch[1]
            );
        }
      }

      // ------------------------------------------------------
      // Invalid / zero / negative
      // ------------------------------------------------------

      if (
        quantity === null
      ) {
        return {
          message:
            "Please specify the quantity, for example: `set OnePlus 13 quantity to 3`.",

          intent: {
            type:
              "updateCart",
          },

          products: [],

          metadata: {
            productCount: 0,
            hasResults: false,
            responseMode:
              "cart-invalid-quantity",
            responseTimeMs:
              Date.now() -
              startTime,
            generatedAt:
              new Date(),
          },
        };
      }

      if (
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return {
          message:
            "❌ Quantity must be at least 1.",

          intent: {
            type:
              "updateCart",
          },

          products: [],

          metadata: {
            productCount: 0,
            hasResults: false,
            responseMode:
              "cart-invalid-quantity",
            responseTimeMs:
              Date.now() -
              startTime,
            generatedAt:
              new Date(),
          },
        };
      }

      // ------------------------------------------------------
      // Find product
      // ------------------------------------------------------

      const products =
        await resolveCartProduct({
          intent,
          message:
            cleanMessage,
        });

      if (
        !products.length
      ) {
        return {
          message:
            "I couldn't identify the product whose quantity you want to update.",

          intent: {
            type:
              "updateCart",
          },

          products: [],

          metadata: {
            productCount: 0,
            hasResults: false,
            responseMode:
              "cart-product-not-found",
            responseTimeMs:
              Date.now() -
              startTime,
            generatedAt:
              new Date(),
          },
        };
      }

      const selectedProduct =
        products[0];

      const result =
        await updateCartItemByProduct(
          userId,
          selectedProduct._id,
          quantity
        );

      const response =
        result.success
          ? `✅ **${selectedProduct.name}** quantity is now **${result.quantity}**.\n\nCart items: **${result.totalItems}**\nCart total: **₹${result.subtotal}**`
          : `❌ ${result.message}`;

      await saveMemorySafely({
        sessionId,
        message:
          cleanMessage,
        products: [
          selectedProduct,
        ],
        intent,
        response,
      });

      const totalTime =
        Date.now() -
        startTime;

      return {
        message:
          response,

        intent: {
          type:
            "updateCart",
        },

        products: [
          selectedProduct,
        ],

        cart: {
          totalItems:
            result.totalItems || 0,

          subtotal:
            result.subtotal || 0,
        },

        metadata: {
          productCount: 1,
          hasResults:
            result.success,
          responseMode:
            "cart-update",
          responseTimeMs:
            totalTime,
          generatedAt:
            new Date(),
        },
      };
    }

    // ========================================================
    // ADD TO CART
    // ========================================================

    if (
      intent.intentType ===
      "cart"
    ) {
      console.log(
        "🛒 CART INTENT DETECTED"
      );

      if (!userId) {
        return {
          message:
            "Please log in to add products to your cart.",

          intent: {
            type:
              "cart",

            category:
              intent.category,

            productType:
              intent.productType,

            brand:
              intent.brand,

            brands:
              intent.brands,

            maxPrice:
              intent.maxPrice,

            minPrice:
              intent.minPrice,
          },

          products: [],

          metadata: {
            productCount: 0,
            hasResults: false,
            responseMode:
              "cart-login-required",
            responseTimeMs:
              Date.now() -
              startTime,
            generatedAt:
              new Date(),
          },
        };
      }

      // ------------------------------------------------------
      // Quantity
      // ------------------------------------------------------

      let quantity = 1;

      const quantityMatch =
        cleanMessage.match(
          /\b(?:add|buy|purchase)\s+(\d+)\b/i
        );

      if (quantityMatch) {
        quantity =
          Number(
            quantityMatch[1]
          );
      }

      console.log(
        "🛒 Requested quantity:",
        quantity
      );

      // ------------------------------------------------------
      // Find product
      // ------------------------------------------------------

      const cartProducts =
        await resolveCartProduct({
          intent,
          message:
            cleanMessage,
        });

      console.log(
        "🛒 Cart products found:",
        cartProducts.length
      );

      // ------------------------------------------------------
      // Product not found
      // ------------------------------------------------------

      if (
        !cartProducts.length
      ) {
        return {
          message:
            "I couldn't find that product in our current catalog.",

          intent: {
            type:
              "cart",

            category:
              intent.category,

            productType:
              intent.productType,

            brand:
              intent.brand,

            brands:
              intent.brands,

            maxPrice:
              intent.maxPrice,

            minPrice:
              intent.minPrice,
          },

          products: [],

          metadata: {
            productCount: 0,
            hasResults: false,
            responseMode:
              "cart-product-not-found",
            responseTimeMs:
              Date.now() -
              startTime,
            generatedAt:
              new Date(),
          },
        };
      }

      // ------------------------------------------------------
      // Rank
      // ------------------------------------------------------

      const rankedProducts =
        rankProducts(
          cartProducts,
          intent
        );

      const selectedProduct =
        rankedProducts[0];

      console.log(
        "🛒 Selected product:",
        selectedProduct.name
      );

      console.log(
        "🆔 Product ID:",
        selectedProduct._id
      );

      // ------------------------------------------------------
      // Add
      // ------------------------------------------------------

      const cartResult =
        await addProductToUserCart(
          userId,
          selectedProduct._id,
          quantity
        );

      console.log(
        "🛒 Cart Result:",
        cartResult
      );

      if (
        !cartResult.success
      ) {
        const totalTime =
          Date.now() -
          startTime;

        return {
          message:
            `❌ ${cartResult.message}`,

          intent: {
            type:
              "cart",

            category:
              intent.category,

            productType:
              intent.productType,

            brand:
              intent.brand,

            brands:
              intent.brands,

            maxPrice:
              intent.maxPrice,

            minPrice:
              intent.minPrice,
          },

          preferences:
            intent.preferences,

          products: [
            selectedProduct,
          ],

          metadata: {
            productCount: 1,
            hasResults: true,
            responseMode:
              "cart-error",
            responseTimeMs:
              totalTime,
            generatedAt:
              new Date(),
          },
        };
      }

      const response =
        `✅ **${cartResult.product.name}** has been added to your cart.\n\n` +
        `Quantity: **${cartResult.quantity}**\n` +
        `Price: **₹${cartResult.product.price}**\n` +
        `Cart items: **${cartResult.totalItems}**\n` +
        `Cart total: **₹${cartResult.subtotal}**`;

      await saveMemorySafely({
        sessionId,
        message:
          cleanMessage,
        products: [
          selectedProduct,
        ],
        intent,
        response,
      });

      const totalTime =
        Date.now() -
        startTime;

      console.log(
        "✅ CART ACTION COMPLETED"
      );

      console.log(
        `⚡ Cart response: ${totalTime}ms`
      );

      return {
        message:
          response,

        intent: {
          type:
            "cart",

          category:
            intent.category,

          productType:
            intent.productType,

          brand:
            intent.brand,

          brands:
            intent.brands,

          maxPrice:
            intent.maxPrice,

          minPrice:
            intent.minPrice,
        },

        preferences:
          intent.preferences,

        products: [
          selectedProduct,
        ],

        cart: {
          quantity:
            cartResult.quantity,

          totalItems:
            cartResult.totalItems,

          subtotal:
            cartResult.subtotal,
        },

        metadata: {
          productCount: 1,

          hasResults: true,

          responseMode:
            "cart-action",

          responseTimeMs:
            totalTime,

          generatedAt:
            new Date(),
        },
      };
    }

    // ========================================================
    // GENERAL AI QUESTIONS
    // ========================================================
    // This block is deliberately AFTER explicit shopping
    // actions, but BEFORE product search.
    //
    // Examples:
    //
    // today's date
    // current date
    // current time
    // what time is it?
    // hello
    // who are you?
    // what can you do?
    //
    // These should NOT go to MongoDB.
    // ========================================================

    if (
      intent.intentType ===
      "general"
    ) {
      console.log(
        "💬 GENERAL AI QUESTION"
      );

      let response = "";

      let responseMode =
        "general-ai";

      try {
        response =
          await handleGeneralAIQuestion({
            message:
              cleanMessage,
          });
      } catch (error) {
        console.error(
          "❌ General AI Error:",
          error.message
        );

        response =
          "I'm sorry, I couldn't answer that right now.";

        responseMode =
          "general-ai-fallback";
      }

      await saveMemorySafely({
        sessionId,
        message:
          cleanMessage,
        products: [],
        intent,
        response,
      });

      const totalTime =
        Date.now() -
        startTime;

      console.log(
        `💬 General AI response: ${totalTime}ms`
      );

      return {
        message:
          response,

        intent: {
          type:
            "general",

          category:
            null,

          productType:
            null,

          brand:
            null,

          brands: [],

          maxPrice:
            null,

          minPrice:
            null,
        },

        preferences:
          intent.preferences,

        products: [],

        metadata: {
          productCount: 0,

          hasResults: false,

          responseMode,

          responseTimeMs:
            totalTime,

          generatedAt:
            new Date(),
        },
      };
    }

    // ========================================================
    // PREVIOUS PRODUCTS
    // ========================================================

    const previousProducts =
      getPreviousProducts(
        previousConversation
      );

    // ========================================================
    // PRODUCT SEARCH
    // ========================================================

    let products = [];

    if (
      followUp &&
      previousProducts.length
    ) {
      products =
        previousProducts;

      console.log(
        "🧠 Using previous products:",
        products.length
      );
    }

    if (
      !products.length
    ) {
      console.log(
        "🔎 Searching MongoDB..."
      );

      products =
        await searchProducts({
          ...intent,

          originalMessage:
            cleanMessage,
        });

      console.log(
        "📦 Products found:",
        products.length
      );
    }

    // ========================================================
    // RANK
    // ========================================================

    products =
      rankProducts(
        products,
        intent
      );

    console.log(
      "🏆 Products ranked:",
      products.length
    );

    if (products.length) {
      console.log(
        "🥇 Best product:",
        products[0].name
      );
    }

    // ========================================================
    // NO RESULTS
    // ========================================================

    if (
      !products.length
    ) {
      const response =
        "I couldn't find any matching products in our current catalog.";

      await saveMemorySafely({
        sessionId,
        message:
          cleanMessage,
        products: [],
        intent,
        response,
      });

      const totalTime =
        Date.now() -
        startTime;

      return {
        message:
          response,

        intent: {
          type:
            intent.intentType,

          category:
            intent.category,

          productType:
            intent.productType,

          brand:
            intent.brand,

          brands:
            intent.brands,

          maxPrice:
            intent.maxPrice,

          minPrice:
            intent.minPrice,
        },

        preferences:
          intent.preferences,

        products: [],

        metadata: {
          productCount: 0,

          hasResults:
            false,

          responseMode:
            "no-results",

          responseTimeMs:
            totalTime,

          generatedAt:
            new Date(),
        },
      };
    }

    // ========================================================
    // FAST FOLLOW-UP
    // ========================================================

    if (followUp) {
      const followUpType =
        detectFollowUpType(
          cleanMessage
        );

      let fastResponse =
        null;

      switch (
        followUpType
      ) {
        case "cheaper":
          fastResponse =
            buildCheaperResponse(
              products
            );
          break;

        case "expensive":
          fastResponse =
            buildExpensiveResponse(
              products
            );
          break;

        case "battery":
          fastResponse =
            buildBatteryResponse(
              products
            );
          break;

        case "camera":
          fastResponse =
            buildCameraResponse(
              products
            );
          break;

        case "gaming":
          fastResponse =
            buildGamingResponse(
              products
            );
          break;

        case "performance":
          fastResponse =
            buildPerformanceResponse(
              products
            );
          break;

        case "display":
          fastResponse =
            buildDisplayResponse(
              products
            );
          break;

        case "storage":
          fastResponse =
            buildStorageResponse(
              products
            );
          break;

        case "comparison":
          fastResponse =
            buildComparisonResponse(
              products
            );
          break;

        default:
          break;
      }

      if (fastResponse) {
        await saveMemorySafely({
          sessionId,
          message:
            cleanMessage,
          products,
          intent,
          response:
            fastResponse,
        });

        const totalTime =
          Date.now() -
          startTime;

        return {
          message:
            fastResponse,

          intent: {
            type:
              intent.intentType,

            category:
              intent.category,

            productType:
              intent.productType,

            brand:
              intent.brand,

            brands:
              intent.brands,

            maxPrice:
              intent.maxPrice,

            minPrice:
              intent.minPrice,
          },

          preferences:
            intent.preferences,

          products,

          metadata: {
            productCount:
              products.length,

            hasResults: true,

            responseMode:
              "fast-follow-up",

            responseTimeMs:
              totalTime,

            generatedAt:
              new Date(),
          },
        };
      }
    }

    // ========================================================
    // AI DECISION
    // ========================================================

    const useAI =
      needsAI(
        cleanMessage,
        intent
      );

    console.log(
      useAI
        ? "🧠 AI MODE"
        : "⚡ FAST MODE"
    );

    // ========================================================
    // FAST MODE
    // ========================================================

    if (!useAI) {
      const response =
        buildFastResponse(
          products
        );

      await saveMemorySafely({
        sessionId,
        message:
          cleanMessage,
        products,
        intent,
        response,
      });

      const totalTime =
        Date.now() -
        startTime;

      return {
        message:
          response,

        intent: {
          type:
            intent.intentType,

          category:
            intent.category,

          productType:
            intent.productType,

          brand:
            intent.brand,

          brands:
            intent.brands,

          maxPrice:
            intent.maxPrice,

          minPrice:
            intent.minPrice,
        },

        preferences:
          intent.preferences,

        products,

        metadata: {
          productCount:
            products.length,

          hasResults: true,

          responseMode:
            "fast",

          responseTimeMs:
            totalTime,

          generatedAt:
            new Date(),
        },
      };
    }

    // ========================================================
    // AI MODE
    // ========================================================

    let response = "";
    let responseMode =
      "ai";

    try {
      const prompt =
        buildPrompt({
          message:
            cleanMessage,

          intent,

          products,

          previousProducts,
        });

      response =
        await generateAIResponse(
          prompt
        );

      if (
        !response ||
        !String(response).trim()
      ) {
        throw new Error(
          "AI returned an empty response."
        );
      }

      response =
        String(response).trim();
    } catch (error) {
      console.error(
        "❌ AI Error:",
        error.message
      );

      response =
        buildFallbackResponse(
          products,
          intent
        );

      responseMode =
        "ai-fallback";
    }

    // ========================================================
    // SAVE AI MEMORY
    // ========================================================

    await saveMemorySafely({
      sessionId,
      message:
        cleanMessage,
      products,
      intent,
      response,
    });

    // ========================================================
    // RESPONSE TIME
    // ========================================================

    const totalTime =
      Date.now() -
      startTime;

    console.log(
      `⚡ Total response time: ${totalTime}ms`
    );

    console.log(
      "📤 Response mode:",
      responseMode
    );

    console.log(
      "========================================\n"
    );

    // ========================================================
    // RETURN
    // ========================================================

    return {
      message:
        response,

      intent: {
        type:
          intent.intentType,

        category:
          intent.category,

        productType:
          intent.productType,

        brand:
          intent.brand,

        brands:
          intent.brands,

        maxPrice:
          intent.maxPrice,

        minPrice:
          intent.minPrice,
      },

      preferences:
        intent.preferences,

      products,

      metadata: {
        productCount:
          products.length,

        hasResults:
          true,

        responseMode,

        responseTimeMs:
          totalTime,

        generatedAt:
          new Date(),
      },
    };
  };

// ============================================================
// EXPORTS
// ============================================================

module.exports = {
  processShoppingConversation,
  isFollowUpMessage,
  detectFollowUpType,
  detectFollowUpPreference,
  mergePreferences,
  buildIntent,
  needsAI,
  getUserCartForAI: getUserCart,
  handleGeneralAIQuestion,
};