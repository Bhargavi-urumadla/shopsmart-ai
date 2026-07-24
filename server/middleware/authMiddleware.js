const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    console.log("\n========== AUTH MIDDLEWARE ==========");

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("Token Received:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token:", decoded);

    const user = await User.findById(decoded.id);

    console.log("User From DB:", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    req.user = user;

   

    next();
  } catch (error) {
    console.log("AUTH ERROR:");
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
      error: error.message,
    });
  }
};

module.exports = { protect };