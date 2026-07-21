const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");

const {
  addToCartValidation,
  updateCartValidation,
} = require("../validators/cartValidator");

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping Cart APIs
 */

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add product to cart
 *     description: Add a product to the authenticated user's cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 686f8d1c9f1234567890abcd
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Product added to cart
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  protect,
  addToCartValidation,
  validate,
  addToCart
);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get logged-in user's cart
 *     description: Returns all items in the authenticated user's cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
  protect,
  getCart
);

/**
 * @swagger
 * /api/cart/{id}:
 *   put:
 *     summary: Update cart quantity
 *     description: Update the quantity of a cart item.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 686f8d1c9f1234567890abcd
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       404:
 *         description: Cart item not found
 */
router.put(
  "/:id",
  protect,
  updateCartValidation,
  validate,
  updateCart
);

/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: Remove product from cart
 *     description: Remove a product from the authenticated user's cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 686f8d1c9f1234567890abcd
 *     responses:
 *       200:
 *         description: Product removed from cart
 *       404:
 *         description: Cart item not found
 */
router.delete(
  "/:id",
  protect,
  removeFromCart
);

module.exports = router;