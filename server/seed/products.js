const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("../models/Product");

// ======================================================
// SHOPSMART AI - PRODUCT SEED
// ======================================================

const products = [
  // ====================================================
  // DAIRY / BEVERAGES
  // ====================================================

  {
    name: "Amul Toned Milk",
    description:
      "Fresh and nutritious Amul toned milk, rich in calcium and protein. Ideal for tea, coffee, cooking, and everyday consumption.",
    category: "Dairy",
    productType: "Milk",
    brand: "Amul",
    price: 32,
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600",
    stock: 100,
    rating: 4.5,
    numReviews: 0,
    isFeatured: false,
    isActive: true,
    battery: "",
    camera: "",
    display: "",
    processor: "",
    ram: "",
    storage: "",
    color: "White",
    weight: "500 ml",
    tags: [
      "milk",
      "amul",
      "dairy",
      "fresh",
      "protein",
      "calcium",
      "healthy",
      "breakfast",
      "beverage",
      "cooking",
      "tea",
      "coffee",
      "toned milk",
    ],
  },

  {
    name: "Amul Gold Full Cream Milk",
    description:
      "Amul Gold Full Cream Milk is rich in protein and calcium, offering a creamy taste and essential nutrients. Ideal for drinking, tea, coffee, desserts, and everyday cooking.",
    category: "Dairy",
    productType: "Milk",
    brand: "Amul",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600",
    stock: 50,
    rating: 4.8,
    numReviews: 0,
    isFeatured: false,
    isActive: true,
    battery: "",
    camera: "",
    display: "",
    processor: "",
    ram: "",
    storage: "",
    color: "White",
    weight: "500 ml",
    tags: [
      "milk",
      "amul",
      "gold milk",
      "full cream milk",
      "dairy",
      "protein",
      "calcium",
      "healthy",
      "fresh",
      "breakfast",
      "tea",
      "coffee",
      "cooking",
      "nutrition",
    ],
  },

  {
    name: "Tata Tea Premium",
    description: "Premium tea powder",
    category: "Beverages",
    productType: "Tea",
    brand: "Tata",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
    stock: 60,
    rating: 4.6,
    numReviews: 0,
    isFeatured: false,
    isActive: true,
    battery: "",
    camera: "",
    display: "",
    processor: "",
    ram: "",
    storage: "",
    color: "",
    weight: "500 g",
    tags: ["tea", "tata", "beverage", "breakfast"],
  },

  {
    name: "Nescafe Gold",
    description: "Premium instant coffee",
    category: "Beverages",
    productType: "Coffee",
    brand: "Nescafe",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
    stock: 50,
    rating: 4.7,
    numReviews: 0,
    isFeatured: false,
    isActive: true,
    battery: "",
    camera: "",
    display: "",
    processor: "",
    ram: "",
    storage: "",
    color: "",
    weight: "200 g",
    tags: ["coffee", "nescafe", "beverage", "breakfast"],
  },

  {
    name: "Red Bull Energy Drink",
    description: "Energy drink can",
    category: "Beverages",
    productType: "Drink",
    brand: "Red Bull",
    price: 125,
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600",
    stock: 100,
    rating: 4.5,
    numReviews: 0,
    isFeatured: false,
    isActive: true,
    battery: "",
    camera: "",
    display: "",
    processor: "",
    ram: "",
    storage: "",
    color: "",
    weight: "250 ml",
    tags: ["energy drink", "drink", "beverage"],
  },

  // ====================================================
  // HOME
  // ====================================================

  {
    name: "Dyson Vacuum Cleaner",
    description: "Cordless vacuum cleaner",
    category: "Home",
    productType: "Cleaning",
    brand: "Dyson",
    price: 45999,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600",
    stock: 18,
    rating: 4.9,
    numReviews: 0,
    isFeatured: false,
    isActive: true,
    battery: "",
    camera: "",
    display: "",
    processor: "",
    ram: "",
    storage: "",
    color: "",
    weight: "",
    tags: ["vacuum", "cleaning", "home", "dyson"],
  },

  {
    name: "Prestige Pressure Cooker",
    description: "5L pressure cooker",
    category: "Home",
    productType: "Kitchen",
    brand: "Prestige",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600",
    stock: 30,
    rating: 4.5,
    numReviews: 0,
    isFeatured: false,
    isActive: true,
    battery: "",
    camera: "",
    display: "",
    processor: "",
    ram: "",
    storage: "",
    color: "Silver",
    weight: "5 L",
    tags: ["pressure cooker", "kitchen", "home", "prestige"],
  },

  {
    name: "Philips Air Fryer",
    description: "Healthy cooking appliance",
    category: "Home",
    productType: "Kitchen",
    brand: "Philips",
    price: 9999,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600",
    stock: 12,
    rating: 4.8,
    numReviews: 0,
    isFeatured: false,
    isActive: true,
    battery: "",
    camera: "",
    display: "",
    processor: "",
    ram: "",
    storage: "",
    color: "Black",
    weight: "",
    tags: ["air fryer", "kitchen", "cooking", "philips"],
  },

  // ====================================================
  // FASHION
  // ====================================================

  {
    name: "Puma Sneakers",
    description: "Stylish sneakers",
    category: "Fashion",
    productType: "Shoes",
    brand: "Puma",
    price: 4999,
    image:
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=600",
    stock: 20,
    rating: 4.5,
    numReviews: 0,
    isFeatured: false,
    isActive: true,
    battery: "",
    camera: "",
    display: "",
    processor: "",
    ram: "",
    storage: "",
    color: "White",
    weight: "",
    tags: ["puma", "shoes", "sneakers", "fashion"],
  },

  {
    name: "Adidas Hoodie",
    description: "Comfortable cotton hoodie",
    category: "Fashion",
    productType: "Clothing",
    brand: "Adidas",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
    stock: 30,
    rating: 4.5,
    numReviews: 0,
    isFeatured: false,
    isActive: true,
    battery: "",
    camera: "",
    display: "",
    processor: "",
    ram: "",
    storage: "",
    color: "Black",
    weight: "",
    tags: ["adidas", "hoodie", "clothing", "fashion"],
  },

  {
    name: "Nike Air Max",
    description: "Running shoes",
    category: "Fashion",
    productType: "Shoes",
    brand: "Nike",
    price: 8999,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    stock: 22,
    rating: 4.7,
    numReviews: 0,
    isFeatured: false,
    isActive: true,
    battery: "",
    camera: "",
    display: "",
    processor: "",
    ram: "",
    storage: "",
    color: "Red",
    weight: "",
    tags: ["nike", "shoes", "running", "fashion"],
  },

  // ====================================================
  // ACCESSORIES
  // ====================================================

  {
    name: "Anker 100W Charger",
    description: "Fast GaN charger",
    category: "Accessories",
    productType: "Charger",
    brand: "Anker",
    price: 4999,
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600",
    stock: 40,
    rating: 4.6,
    numReviews: 0,
    isFeatured: false,
    isActive: true,
    battery: "",
    camera: "",
    display: "",
    processor: "",
    ram: "",
    storage: "",
    color: "White",
    weight: "",
    tags: ["charger", "anker", "gan", "accessories"],
  },

  {
    name: "Samsung T9 SSD",
    description: "Portable SSD 1TB",
    category: "Accessories",
    productType: "Storage",
    brand: "Samsung",
    price: 12999,
    image:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600",
    stock: 30,
    rating: 4.8,
    numReviews: 0,
    isFeatured: false,
    isActive: true,
    battery: "",
    camera: "",
    display: "",
    processor: "",
    ram: "",
    storage: "1TB",
    color: "Black",
    weight: "",
    tags: ["ssd", "storage", "samsung", "1tb"],
  },

  {
    name: "Apple Magic Keyboard",
    description: "Wireless keyboard",
    category: "Accessories",
    productType: "Keyboard",
    brand: "Apple",
    price: 10999,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600",
    stock: 25,
    rating: 4.7,
    numReviews: 0,
    isFeatured: false,
    isActive: true,
    battery: "",
    camera: "",
    display: "",
    processor: "",
    ram: "",
    storage: "",
    color: "White",
    weight: "",
    tags: ["keyboard", "apple", "wireless", "accessories"],
  },

  {
    name: "Logitech MX Master 3S",
    description: "Wireless productivity mouse",
    category: "Accessories",
    productType: "Mouse",
    brand: "Logitech",
    price: 9999,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600",
    stock: 35,
    rating: 4.9,
    numReviews: 0,
    isFeatured: false,
    isActive: true,
    battery: "",
    camera: "",
    display: "",
    processor: "",
    ram: "",
    storage: "",
    color: "Black",
    weight: "",
    tags: ["mouse", "logitech", "wireless", "accessories"],
  },

  // ====================================================
  // ELECTRONICS / MOBILE
  // ====================================================

  {
    name: "Samsung Galaxy S25 Ultra",
    description: "Premium Android flagship smartphone",
    category: "Electronics",
    productType: "Mobile",
    brand: "Samsung",
    price: 124999,
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600",
    stock: 18,
    rating: 4.8,
    numReviews: 0,
    isFeatured: true,
    isActive: true,
    battery: "5000 mAh",
    camera: "200 MP",
    display: "6.9 inch AMOLED",
    processor: "Snapdragon",
    ram: "12 GB",
    storage: "256 GB",
    color: "Titanium",
    weight: "218 g",
    tags: [
      "samsung",
      "phone",
      "smartphone",
      "android",
      "camera",
      "flagship",
      "gaming",
      "premium",
    ],
  },

  {
    name: "iPhone 16 Pro",
    description:
      "Apple iPhone 16 Pro with A18 Pro chip and Super Retina XDR display",
    category: "Electronics",
    productType: "Mobile",
    brand: "Apple",
    price: 129999,
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600",
    stock: 15,
    rating: 4.8,
    numReviews: 0,
    isFeatured: true,
    isActive: true,
    battery: "3582 mAh",
    camera: "48 MP",
    display: "6.3 inch OLED",
    processor: "A18 Pro",
    ram: "8 GB",
    storage: "128 GB",
    color: "Titanium",
    weight: "199 g",
    tags: [
      "apple",
      "iphone",
      "smartphone",
      "ios",
      "camera",
      "premium",
    ],
  },

  {
    name: "Google Pixel 10",
    description: "AI powered Android phone",
    category: "Electronics",
    productType: "Mobile",
    brand: "Google",
    price: 89999,
    image:
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600",
    stock: 10,
    rating: 4.8,
    numReviews: 0,
    isFeatured: false,
    isActive: true,
    battery: "5000 mAh",
    camera: "50 MP",
    display: "6.3 inch OLED",
    processor: "Google Tensor",
    ram: "12 GB",
    storage: "256 GB",
    color: "Obsidian",
    weight: "190 g",
    tags: [
      "google",
      "pixel",
      "phone",
      "smartphone",
      "android",
      "ai",
      "camera",
    ],
  },

  {
    name: "OnePlus 13",
    description: "Fast and smooth flagship smartphone",
    category: "Electronics",
    productType: "Mobile",
    brand: "OnePlus",
    price: 74999,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
    stock: 20,
    rating: 4.7,
    numReviews: 0,
    isFeatured: false,
    isActive: true,
    battery: "6000 mAh",
    camera: "50 MP",
    display: "6.82 inch AMOLED",
    processor: "Snapdragon",
    ram: "12 GB",
    storage: "256 GB",
    color: "Black",
    weight: "210 g",
    tags: [
      "oneplus",
      "phone",
      "smartphone",
      "android",
      "gaming",
      "performance",
      "battery",
    ],
  },

  {
    name: "Apple Watch Series 11",
    description: "Premium smartwatch",
    category: "Electronics",
    productType: "Smartwatch",
    brand: "Apple",
    price: 49999,
    image:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600",
    stock: 18,
    rating: 4.8,
    numReviews: 0,
    isFeatured: false,
    isActive: true,
    battery: "18 hours",
    camera: "",
    display: "Retina",
    processor: "",
    ram: "",
    storage: "64 GB",
    color: "Black",
    weight: "",
    tags: ["apple", "watch", "smartwatch", "wearable"],
  },

  {
    name: "Sony WH-1000XM6",
    description: "Noise cancelling wireless headphones",
    category: "Electronics",
    productType: "Headphones",
    brand: "Sony",
    price: 32999,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    stock: 25,
    rating: 4.9,
    numReviews: 0,
    isFeatured: false,
    isActive: true,
    battery: "30 hours",
    camera: "",
    display: "",
    processor: "",
    ram: "",
    storage: "",
    color: "Black",
    weight: "",
    tags: [
      "sony",
      "headphones",
      "wireless",
      "noise cancelling",
      "audio",
    ],
  },
];

// ======================================================
// SEED DATABASE
// ======================================================

const seedProducts = async () => {
  try {
    console.log("========================================");
    console.log("🌱 ShopSmart AI Product Seeder");
    console.log("========================================");

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in server/.env");
    }

    console.log("🔌 Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB connected");
    console.log(`📦 Products to insert: ${products.length}`);

    // --------------------------------------------------
    // CLEAR ONLY PRODUCTS
    // --------------------------------------------------

    const deleted = await Product.deleteMany({});

    console.log(
      `🗑️ Deleted old products: ${deleted.deletedCount}`
    );

    // --------------------------------------------------
    // INSERT CLEAN PRODUCTS
    // --------------------------------------------------

    const insertedProducts = await Product.insertMany(products);

    console.log(
      `✅ Inserted products: ${insertedProducts.length}`
    );

    // --------------------------------------------------
    // VERIFY
    // --------------------------------------------------

    const total = await Product.countDocuments();

    const active = await Product.countDocuments({
      isActive: true,
    });

    const inactive = await Product.countDocuments({
      isActive: false,
    });

    console.log("----------------------------------------");
    console.log("📊 PRODUCT DATABASE STATUS");
    console.log("----------------------------------------");
    console.log(`Total products   : ${total}`);
    console.log(`Active products  : ${active}`);
    console.log(`Inactive products: ${inactive}`);
    console.log("----------------------------------------");

    if (total === active && inactive === 0) {
      console.log("🎉 ALL PRODUCTS ARE ACTIVE");
    }

    console.log("========================================");
    console.log("✅ PRODUCT SEED COMPLETED");
    console.log("========================================");

    await mongoose.disconnect();

    console.log("🔌 MongoDB disconnected");
    process.exit(0);
  } catch (error) {
    console.error("========================================");
    console.error("❌ SEED FAILED");
    console.error("========================================");
    console.error(error);

    await mongoose.disconnect().catch(() => {});

    process.exit(1);
  }
};

seedProducts();