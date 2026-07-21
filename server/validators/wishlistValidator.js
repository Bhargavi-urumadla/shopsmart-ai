const { body } = require("express-validator");

// ==============================
// Wishlist Validation
// ==============================
const wishlistValidation = [
  body("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid Product ID"),
];

module.exports = {
  wishlistValidation,
};