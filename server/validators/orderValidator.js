const { body } = require("express-validator");

// ==============================
// Order Validation
// ==============================
const orderValidation = [
  // Products array
  body("products")
    .isArray({ min: 1 })
    .withMessage("At least one product is required"),

  // Validate each product ID
  body("products.*.product")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid Product ID"),

  // Validate each quantity
  body("products.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),

  // Shipping Address
  body("shippingAddress")
    .trim()
    .notEmpty()
    .withMessage("Shipping address is required"),

  // Payment Method
  body("paymentMethod")
    .trim()
    .notEmpty()
    .withMessage("Payment method is required"),
];

module.exports = {
  orderValidation,
};