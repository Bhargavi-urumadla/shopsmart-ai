const { body } = require("express-validator");

const productValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be greater than or equal to 0"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock cannot be negative"),
];

module.exports = {
  productValidation,
};