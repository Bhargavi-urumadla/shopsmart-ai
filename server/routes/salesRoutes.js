const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getSalesOverview,
  getRevenue,
  getMonthlySales,
  getTopProducts,
  getTopCategories,
} = require("../controllers/salesController");

router.use(protect, adminOnly);

/**
 * @swagger
 * tags:
 *   name: Sales Analytics
 *   description: Admin Sales Analytics APIs
 */

/**
 * @swagger
 * /api/admin/sales/overview:
 *   get:
 *     summary: Get sales overview
 *     description: Returns an overview of total revenue, total orders, total products sold, and other sales statistics.
 *     tags: [Sales Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sales overview fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/overview", getSalesOverview);

/**
 * @swagger
 * /api/admin/sales/revenue:
 *   get:
 *     summary: Get total revenue
 *     description: Returns the total revenue generated from all completed orders.
 *     tags: [Sales Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Revenue data fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/revenue", getRevenue);

/**
 * @swagger
 * /api/admin/sales/monthly:
 *   get:
 *     summary: Get monthly sales report
 *     description: Returns month-wise sales and revenue statistics.
 *     tags: [Sales Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly sales fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/monthly", getMonthlySales);

/**
 * @swagger
 * /api/admin/sales/top-products:
 *   get:
 *     summary: Get top-selling products
 *     description: Returns the products with the highest sales.
 *     tags: [Sales Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Top-selling products fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/top-products", getTopProducts);

/**
 * @swagger
 * /api/admin/sales/top-categories:
 *   get:
 *     summary: Get top-selling categories
 *     description: Returns product categories ranked by sales.
 *     tags: [Sales Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Top-selling categories fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/top-categories", getTopCategories);

module.exports = router;