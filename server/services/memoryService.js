const Conversation = require("../models/Conversation");

const saveConversation = async (
  sessionId,
  message,
  products = [],
  preferences = {},
  intent = {},
  aiResponse = ""
) => {
  try {
    const productIds = products.map((product) => product._id);

    // Get existing conversation
    let conversation = await Conversation.findOne({ sessionId });

    if (!conversation) {
      conversation = new Conversation({
        sessionId,
      });
    }

    // Update latest conversation state
    conversation.lastMessage = message;
    conversation.preferences = preferences;
    conversation.lastIntent = intent;
    conversation.lastProducts = productIds;

    // Save chat history (keep last 20 messages)
    conversation.chatHistory.push(
      {
        role: "user",
        message,
      },
      {
        role: "assistant",
        message: aiResponse,
      }
    );

    if (conversation.chatHistory.length > 20) {
      conversation.chatHistory =
        conversation.chatHistory.slice(-20);
    }

    await conversation.save();

    return conversation;
  } catch (error) {
    console.error("Error saving conversation:", error);
    throw error;
  }
};

const getConversation = async (sessionId) => {
  try {
    return await Conversation.findOne({ sessionId })
      .populate("lastProducts");
  } catch (error) {
    console.error("Error loading conversation:", error);
    throw error;
  }
};

module.exports = {
  saveConversation,
  getConversation,
};