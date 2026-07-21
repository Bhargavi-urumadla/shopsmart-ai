const express = require("express");
const router = express.Router();

const {
  chatWithAI,
} = require("../controllers/aiController");

/**
 * @swagger
 * tags:
 *   name: AI Assistant
 *   description: AI-powered Shopping Assistant APIs
 */

/**
 * @swagger
 * /api/ai/chat:
 *   post:
 *     summary: Chat with ShopSmart AI
 *     description: >
 *       Interact with the AI shopping assistant to get product recommendations,
 *       compare products, ask shopping questions, or receive personalized suggestions.
 *     tags: [AI Assistant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 example: Suggest the best Samsung phone under ₹30,000
 *               sessionId:
 *                 type: string
 *                 example: user-session-123
 *     responses:
 *       200:
 *         description: AI response generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 response:
 *                   type: string
 *                   example: Samsung Galaxy A56 is one of the best options under ₹30,000.
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal Server Error
 */
router.post("/chat", chatWithAI);

module.exports = router;