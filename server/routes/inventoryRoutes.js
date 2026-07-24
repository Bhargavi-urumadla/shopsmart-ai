const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getInventory,
  getLowStock,
  getOutOfStock,
  updateStock,
  restockProduct,
  getInventoryHistory,
} = require("../controllers/inventoryController");

router.use(protect, adminOnly);

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Admin Inventory Management APIs
 */

/**
 * @swagger
 * /api/admin/inventory:
 *   get:
 *     summary: Get inventory
 *     description: Returns all products with their current stock information.
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inventory fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/", getInventory);

/**
 * @swagger
 * /api/admin/inventory/low-stock:
 *   get:
 *     summary: Get low stock products
 *     description: Returns all products whose stock is below the configured threshold.
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Low stock products fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/low-stock", getLowStock);

/**
 * @swagger
 * /api/admin/inventory/out-of-stock:
 *   get:
 *     summary: Get out of stock products
 *     description: Returns all products that are currently out of stock.
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Out of stock products fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/out-of-stock", getOutOfStock);

/**
 * @swagger
 * /api/admin/inventory/{id}:
 *   patch:
 *     summary: Update product stock
 *     description: Updates the stock quantity of a specific product.
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stock
 *             properties:
 *               stock:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       200:
 *         description: Stock updated successfully
 *       404:
 *         description: Product not found
 */
router.patch("/:id", updateStock);

/**
 * @swagger
 * /api/admin/inventory/restock:
 *   post:
 *     summary: Restock a product
 *     description: Adds stock to an existing product.
 *     tags: [Inventory]
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
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 686f123abc456def78901234
 *               quantity:
 *                 type: integer
 *                 example: 20
 *     responses:
 *       200:
 *         description: Product restocked successfully
 *       404:
 *         description: Product not found
 */
router.post("/restock", restockProduct);

/**
 * @swagger
 * /api/admin/inventory/history/{id}:
 *   get:
 *     summary: Get inventory history
 *     description: Returns stock movement history for a specific product.
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventory history fetched successfully
 *       404:
 *         description: Product not found
 */
router.get("/history/:id", getInventoryHistory);

module.exports = router;