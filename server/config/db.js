const mongoose = require("mongoose");
const User = require("../models/User");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log("========================================");
    console.log("Mongo Host :", conn.connection.host);
    console.log("Database   :", conn.connection.name);
    console.log("========================================");

    const users = await User.find({}, {
      name: 1,
      email: 1,
      role: 1,
    }).lean();

   
    

    const admin = await User.findOne({
      email: "admin@gmail.com",
    }).lean();

    
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;