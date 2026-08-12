const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log("========================================");
    console.log("Mongo Host :", conn.connection.host);
    console.log("Database   :", conn.connection.name);
    console.log("========================================");

    return conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error(error.message);

    process.exit(1);
  }
};

module.exports = connectDB;