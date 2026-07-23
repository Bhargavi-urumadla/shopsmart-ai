const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

// Replace this with your actual DB connection file if needed
const connectDB = require("./config/db");

async function updateProducts() {
  try {
    await connectDB();

    const result = await Product.updateMany(
      { isActive: { $exists: false } },
      {
        $set: {
          isActive: true,
        },
      }
    );

    console.log("✅ Update completed");
    console.log(result);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

updateProducts();