// ============================================================
// ShopSmart AI - AI Controller
// ============================================================

const {
  processShoppingConversation,
} = require("../services/aiOrchestratorService");

// ============================================================
// Chat With AI
// ============================================================

const chatWithAI = async (req, res) => {
  try {
    const {
      message,
      sessionId,
    } = req.body;

    // --------------------------------------------------------
    // Validate message
    // --------------------------------------------------------

    if (
      !message ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide a message.",
      });
    }

    // --------------------------------------------------------
    // Authenticated user
    // --------------------------------------------------------
    // protect middleware sets:
    // req.user = user
    // --------------------------------------------------------

    const userId =
      req.user?._id || null;

    // --------------------------------------------------------
    // Session ID
    // --------------------------------------------------------
    // Keep client sessionId when provided.
    // Fallback to user ID for logged-in users.
    // Fallback to IP for guest compatibility.
    // --------------------------------------------------------

    const activeSessionId =
      sessionId ||
      (userId
        ? `user-${userId}`
        : req.ip);

    console.log(
      "\n========================================"
    );

    console.log(
      "🤖 AI CHAT REQUEST"
    );

    console.log(
      "Message:",
      message
    );

    console.log(
      "Session ID:",
      activeSessionId
    );

    console.log(
      "User ID:",
      userId || "Guest"
    );

    // --------------------------------------------------------
    // Process conversation
    // --------------------------------------------------------

    const result =
      await processShoppingConversation({
        sessionId:
          activeSessionId,

        message:
          message.trim(),

        userId,
      });

    // --------------------------------------------------------
    // Success response
    // --------------------------------------------------------

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error(
      "\n❌ AI CONTROLLER ERROR"
    );

    console.error(
      "Message:",
      error.message
    );

    console.error(
      "Stack:",
      error.stack
    );

    return res.status(500).json({
      success: false,

      message:
        "Something went wrong while processing your request.",

      error:
        error.message,

      metadata: {
        generatedAt:
          new Date(),
      },
    });
  }
};

// ============================================================
// Export
// ============================================================

module.exports = {
  chatWithAI,
};