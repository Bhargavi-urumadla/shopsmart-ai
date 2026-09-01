const Conversation = require("../models/Conversation");

// ============================================================
// SAVE CONVERSATION
// ============================================================

const saveConversation = async (
  sessionId,
  message,
  products = [],
  preferences = {},
  intent = {},
  aiResponse = ""
) => {
  try {
    if (!sessionId) {
      console.warn("⚠️ No sessionId. Conversation not saved.");
      return null;
    }

    const productIds = products
      .map((product) => product?._id)
      .filter(Boolean);

    let conversation = await Conversation.findOne({
      sessionId,
    });

    if (!conversation) {
      conversation = new Conversation({
        sessionId,
        chatHistory: [],
      });
    }

    // Latest state
    conversation.lastMessage = message;

    conversation.preferences = {
      ...(preferences || {}),
    };

    conversation.lastIntent = {
      ...(intent || {}),
    };

    conversation.lastProducts = productIds;

    // Add user message
    conversation.chatHistory.push({
      role: "user",
      message: String(message),
    });

    // Add AI response only if available
    if (aiResponse) {
      conversation.chatHistory.push({
        role: "assistant",
        message: String(aiResponse),
      });
    }

    // Keep only latest 20 messages
    if (conversation.chatHistory.length > 20) {
      conversation.chatHistory =
        conversation.chatHistory.slice(-20);
    }

    await conversation.save();

    return conversation;
  } catch (error) {
    // IMPORTANT:
    // Memory failure should NOT break shopping.
    console.error(
      "⚠️ Conversation save failed:",
      error.message
    );

    return null;
  }
};

// ============================================================
// GET CONVERSATION
// ============================================================

const getConversation = async (sessionId) => {
  try {
    if (!sessionId) {
      return null;
    }

    const conversation =
      await Conversation.findOne({
        sessionId,
      }).populate("lastProducts");

    return conversation;
  } catch (error) {
    // IMPORTANT:
    // If memory fails, start a fresh conversation.
    // Do NOT break the shopping request.
    console.error(
      "⚠️ Conversation load failed:",
      error.message
    );

    return null;
  }
};

// ============================================================
// EXPORT
// ============================================================

module.exports = {
  saveConversation,
  getConversation,
};