const express = require("express");

const router = express.Router();

const {
  chatWithAI,
} = require("../controllers/aiController");

const {
  protect,
} = require("../middleware/authMiddleware");

// ============================================================
// AI CHAT
// ============================================================

router.post(
  "/chat",
  protect,
  chatWithAI
);

// ============================================================
// EXPORT ROUTER
// ============================================================

module.exports = router;