const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    let token;

    // Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token:", token);
console.log("JWT_SECRET:", process.env.JWT_SECRET);

      // Save user id in request
      req.user = decoded;

      next();
    } else {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = { protect };