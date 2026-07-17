import { useEffect, useState } from "react";
import "./AIAssistant.css";
import API from "../api/api";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating?: number;
  brand?: string;
  stock?: number;
}

function AIAssistant() {
  const [input, setInput] = useState("");

  const [products, setProducts] = useState<Product[]>([]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: "Hi! 👋 I'm your ShopSmart AI Assistant. I can help you discover products, compare options, and make smarter shopping decisions.",
    },
  ]);

  // =========================
  // Fetch Products
  // =========================

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");

      setProducts(res.data);

      console.log(
        "AI Assistant Products:",
        res.data
      );
    } catch (error) {
      console.error(
        "Failed to load products:",
        error
      );
    }
  };

  // =========================
  // Generate Assistant Reply
  // =========================

  const generateAIResponse = (
    userInput: string
  ) => {
    const question =
      userInput.toLowerCase();

    // Highly Rated Products

    if (
      question.includes("rated") ||
      question.includes("rating")
    ) {
      const highlyRated = [...products]
        .filter(
          (product) =>
            (product.rating || 0) >= 4.5
        )
        .sort(
          (a, b) =>
            (b.rating || 0) -
            (a.rating || 0)
        )
        .slice(0, 5);

      if (highlyRated.length === 0) {
        return "I couldn't find any highly rated products right now.";
      }

      const productList = highlyRated
        .map(
          (product) =>
            `${product.name} ⭐ ${
              product.rating || "N/A"
            } - ₹${product.price}`
        )
        .join("\n");

      return `⭐ Here are some of the highest-rated products on ShopSmart:\n\n${productList}`;
    }

    // Budget Search

    if (
      question.includes("budget") ||
      question.includes("under") ||
      question.includes("below")
    ) {
      const numbers =
        userInput.match(/\d+/g);

      if (numbers) {
        const budget = Number(
          numbers[numbers.length - 1]
        );

        const budgetProducts = products
          .filter(
            (product) =>
              product.price <= budget
          )
          .sort(
            (a, b) =>
              b.rating! - a.rating!
          )
          .slice(0, 5);

        if (
          budgetProducts.length === 0
        ) {
          return `I couldn't find products within ₹${budget}. Try increasing your budget.`;
        }

        const productList =
          budgetProducts
            .map(
              (product) =>
                `${product.name} - ₹${product.price} ⭐ ${
                  product.rating || "N/A"
                }`
            )
            .join("\n");

        return `💰 Here are some products within your ₹${budget} budget:\n\n${productList}`;
      }

      return "💰 Sure! Tell me your budget. For example: Suggest products under ₹1000.";
    }

    // Compare Products

    if (
      question.includes("compare")
    ) {
      return "⚖️ I can compare products for you. Tell me the names of two products. For example: Compare Samsung Galaxy S24 and Casual Sneakers.";
    }

    // General Recommendations

    if (
      question.includes("recommend") ||
      question.includes("best")
    ) {
      const recommended = [
        ...products,
      ]
        .sort(
          (a, b) =>
            (b.rating || 0) -
            (a.rating || 0)
        )
        .slice(0, 5);

      if (recommended.length === 0) {
        return "I couldn't find products to recommend right now.";
      }

      const productList = recommended
        .map(
          (product) =>
            `${product.name} - ₹${product.price} ⭐ ${
              product.rating || "N/A"
            }`
        )
        .join("\n");

      return `🎯 Based on product ratings, here are my recommendations:\n\n${productList}`;
    }

    // Default Response

    return "🤖 I can help you find highly rated products, recommend products, compare products, or find products within your budget. Try asking: Show me products under ₹1000.";
  };

  // =========================
  // Send Message
  // =========================

  const sendMessage = (
    messageText?: string
  ) => {
    const text =
      messageText || input;

    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setInput("");

    // Temporary frontend AI logic
    // Later replace with real AI backend API

    setTimeout(() => {
      const response =
        generateAIResponse(text);

      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: response,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);
    }, 500);
  };

  // =========================
  // Suggestion Button
  // =========================

  const handleSuggestion = (
    suggestion: string
  ) => {
    sendMessage(suggestion);
  };

  return (
    <div className="ai-assistant-page">

      {/* Header */}

      <div className="ai-page-header">

        <div>
          <span className="ai-subtitle">
            SMART SHOPPING
          </span>

          <h1>
            🤖 AI Shopping Assistant
          </h1>

          <p>
            Ask questions, compare products and
            discover the best products for your needs.
          </p>
        </div>

        <div className="ai-status">
          <span className="status-dot"></span>
          AI Assistant Online
        </div>

      </div>

      {/* Main Layout */}

      <div className="ai-layout">

        {/* Suggestions */}

        <div className="ai-sidebar">

          <h2>✨ Try asking</h2>

          <p className="sidebar-description">
            Choose a suggestion or ask your own
            shopping question.
          </p>

          <button
            onClick={() =>
              handleSuggestion(
                "Recommend the best products for me"
              )
            }
          >
            🎯 Recommend products for me
          </button>

          <button
            onClick={() =>
              handleSuggestion(
                "Compare products"
              )
            }
          >
            ⚖️ Compare products
          </button>

          <button
            onClick={() =>
              handleSuggestion(
                "Show me the best rated products"
              )
            }
          >
            ⭐ Find highly rated products
          </button>

          <button
            onClick={() =>
              handleSuggestion(
                "Suggest products within my budget"
              )
            }
          >
            💰 Find products by budget
          </button>

          <div className="ai-tip">

            <span>💡</span>

            <div>
              <strong>
                Shopping Tip
              </strong>

              <p>
                Tell the AI your budget and what
                you're looking for to get better
                recommendations.
              </p>
            </div>

          </div>

        </div>

        {/* Chat */}

        <div className="ai-chat-container">

          {/* Chat Header */}

          <div className="chat-header">

            <div className="chat-avatar">
              🤖
            </div>

            <div>
              <h3>ShopSmart AI</h3>

              <span>
                ● Online • Ready to help
              </span>
            </div>

          </div>

          {/* Messages */}

          <div className="chat-messages">

            {messages.map(
              (message) => (

                <div
                  key={message.id}
                  className={`message-row ${
                    message.sender ===
                    "user"
                      ? "user-row"
                      : "ai-row"
                  }`}
                >

                  {message.sender ===
                    "ai" && (
                    <div className="message-avatar">
                      🤖
                    </div>
                  )}

                  <div
                    className={`message ${
                      message.sender ===
                      "user"
                        ? "user-message"
                        : "ai-message"
                    }`}
                  >
                    {message.text}
                  </div>

                </div>

              )
            )}

          </div>

          {/* Input */}

          <div className="chat-input-container">

            <input
              type="text"
              value={input}
              placeholder="Ask ShopSmart AI anything..."
              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter"
                ) {
                  sendMessage();
                }
              }}
            />

            <button
              onClick={() =>
                sendMessage()
              }
              disabled={!input.trim()}
            >
              Send ➤
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AIAssistant;