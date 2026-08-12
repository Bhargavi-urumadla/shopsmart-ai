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
 *   description: AI-powered dashboard insights
 */

/**
 * @swagger
 * /api/admin-ai/dashboard:
 *   get:
 *     summary: Get AI dashboard insights
 *     tags: [Admin AI]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard insights generated successfully
 */
router.get("/dashboard", getDashboardInsights);

module.exports = router;