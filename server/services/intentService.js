const extractIntent = (message) => {
  const text = message.toLowerCase();

  const intent = {
    category: null,
    productType: null,
    brand: null,
    maxPrice: null,
  };

  // -----------------------------
  // Extract Budget
  // -----------------------------
  const priceMatch = text.match(/\d+/);

  if (priceMatch) {
    intent.maxPrice = Number(priceMatch[0]);
  }

  // -----------------------------
  // Product Types
  // -----------------------------
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
    "sunglasses"
  ];

  for (const type of productTypes) {
    if (text.includes(type)) {
      intent.productType = type;
      break;
    }
  }

  // -----------------------------
  // Brands
  // -----------------------------
  const brands = [
    "samsung",
    "sony",
    "nike",
    "puma",
    "noise",
    "amul",
    "tata tea",
    "bella vita",
    "philips",
    "fastrack"
  ];

  for (const brand of brands) {
    if (text.includes(brand)) {
      intent.brand = brand;
      break;
    }
  }

  // -----------------------------
  // Categories
  // -----------------------------
  const categories = [
    "electronics",
    "fashion",
    "beauty",
    "home",
    "beverages",
    "dairy"
  ];

  for (const category of categories) {
    if (text.includes(category)) {
      intent.category = category;
      break;
    }
  }

  return intent;
};

module.exports = {
  extractIntent,
};