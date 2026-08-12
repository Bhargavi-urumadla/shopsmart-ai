const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    console.log("\n========== AUTH MIDDLEWARE ==========");

    // Get Authorization header
    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    // Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Prevent "Bearer null" or "Bearer undefined"
    if (
      !token ||
      token === "null" ||
      token === "undefined"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token. Please login again.",
      });
    }

    console.log("Token Received:", token);

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded Token:", decoded);

    // Find user
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check blocked account
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked.",
      });
    }

    req.user = user;

    console.log("Authenticated User:", {
      id: user._id,
      email: user.email,
      role: user.role,
    });

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};

module.exports = {
  protect,
};