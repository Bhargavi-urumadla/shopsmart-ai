const { body } = require("express-validator");

// ==============================
// Order Validation
// ==============================
const orderValidation = [
  body("shippingAddress.fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required"),

  body("shippingAddress.phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),

  body("shippingAddress.address")
    .trim()
    .notEmpty()
    .withMessage("Address is required"),

  body("shippingAddress.city")
    .trim()
    .notEmpty()
    .withMessage("City is required"),

  body("shippingAddress.state")
    .trim()
    .notEmpty()
    .withMessage("State is required"),

  body("shippingAddress.pincode")
    .trim()
    .notEmpty()
    .withMessage("Pincode is required"),

  body("paymentMethod")
    .trim()
    .notEmpty()
    .withMessage("Payment method is required")
    .isIn(["COD", "UPI", "Card", "Net Banking"])
    .withMessage("Invalid payment method"),
];

module.exports = {
  orderValidation,
};