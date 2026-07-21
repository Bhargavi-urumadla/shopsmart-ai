const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    lastMessage: {
      type: String,
      default: "",
      trim: true,
    },

    preferences: {
      battery: {
        type: Boolean,
        default: false,
      },

      camera: {
        type: Boolean,
        default: false,
      },

      gaming: {
        type: Boolean,
        default: false,
      },

      performance: {
        type: Boolean,
        default: false,
      },

      display: {
        type: Boolean,
        default: false,
      },

      storage: {
        type: Boolean,
        default: false,
      },
    },

    lastIntent: {
      intentType: {
        type: String,
        default: "",
      },

      category: {
        type: String,
        default: "",
      },

      productType: {
        type: String,
        default: "",
      },

      brands: [
        {
          type: String,
        },
      ],

      maxPrice: {
        type: Number,
        default: null,
      },
    },

    lastProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    chatHistory: [
      {
        role: {
          type: String,
          enum: ["user", "assistant"],
        },

        message: {
          type: String,
          trim: true,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Conversation",
  conversationSchema
);