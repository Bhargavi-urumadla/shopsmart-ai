const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");

const {
  wishlistValidation,
} = require("../validators/wishlistValidator");

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist Management APIs
 */

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     summary: Add product to wishlist
 *     description: Adds a product to the authenticated user's wishlist.
 *     tags: [Wishlist]
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
 *     responses:
 *       201:
 *         description: Product added to wishlist successfully
 *       400:
 *         description: Validation error or product already exists
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.post(
  "/",
  protect,
  wishlistValidation,
  validate,
  addToWishlist
);

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Get logged-in user's wishlist
 *     description: Returns all wishlist items of the authenticated user.
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
  protect,
  getWishlist
);

/**
 * @swagger
 * /api/wishlist/{id}:
 *   delete:
 *     summary: Remove product from wishlist
 *     description: Removes a wishlist item by its ID.
 *     tags: [Wishlist]
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
 *         description: Product removed from wishlist successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Wishlist item not found
 */
router.delete(
  "/:id",
  protect,
  removeFromWishlist
);

module.exports = router;