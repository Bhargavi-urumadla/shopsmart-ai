const express = require("express");
const router = express.Router();

const {
  chatWithAI,
} = require("../controllers/aiController");

// Chat with ShopSmart AI
router.post("/chat", chatWithAI);

module.exports = router;