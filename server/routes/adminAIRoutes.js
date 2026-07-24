const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getDashboardInsights,
} = require("../controllers/adminAIController");

router.use(protect, adminOnly);

/**
 * @swagger
 * tags:
 *   name: Admin AI
 *   description: AI-powered analytics and dashboard insights for administrators.
 */

/**
 * @swagger
 * /api/admin/ai/dashboard:
 *   get:
 *     summary: Get AI dashboard insights
 *     description: Returns AI-generated business insights, recommendations, and analytics for the admin dashboard based on orders, sales, customers, and inventory.
 *     tags: [Admin AI]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: AI dashboard insights fetched successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               insights:
 *                 revenueTrend: "Revenue increased by 18% compared to last month."
 *                 topProduct: "iPhone 15 Pro"
 *                 lowStockAlert:
 *                   - "Samsung Galaxy S24"
 *                   - "OnePlus 13"
 *                 recommendation: "Restock Samsung Galaxy S24 to avoid stock shortages."
 *       401:
 *         description: Unauthorized - JWT token is missing or invalid.
 *       403:
 *         description: Forbidden - Admin access required.
 *       500:
 *         description: Internal server error.
 */
router.get("/dashboard", getDashboardInsights);

module.exports = router;