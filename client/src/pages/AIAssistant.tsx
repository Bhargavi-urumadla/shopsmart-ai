import { useState } from "react";
import "./AIAssistant.css";
import API from "../api/api";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
}

function AIAssistant() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: "Hi! 👋 I'm your ShopSmart AI Assistant. I can help you discover products, compare options, and make smarter shopping decisions.",
    },
  ]);

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input;

    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    try {
      console.log("Before Chat API");
  console.log("API URL:", import.meta.env.VITE_API_URL);
  console.log("Message:", text);
      const res = await API.post("/ai/chat", {
        message: text,
      });

      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: res.data.message,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: "❌ Sorry! Something went wrong. Please try again.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    }
  };

  const handleSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <div className="ai-assistant-page">
      {/* Header */}

      <div className="ai-page-header">
        <div>
          <span className="ai-subtitle">SMART SHOPPING</span>

          <h1>🤖 AI Shopping Assistant</h1>

          <p>
            Ask questions, compare products and discover the best products for
            your needs.
          </p>
        </div>

        <div className="ai-status">
          <span className="status-dot"></span>
          AI Assistant Online
        </div>
      </div>

      {/* Main Layout */}

      <div className="ai-layout">
        {/* Sidebar */}

        <div className="ai-sidebar">
          <h2>✨ Try asking</h2>

          <p className="sidebar-description">
            Choose a suggestion or ask your own shopping question.
          </p>

          <button
            onClick={() =>
              handleSuggestion("Recommend the best products for me")
            }
          >
            🎯 Recommend products for me
          </button>

          <button
            onClick={() => handleSuggestion("Compare Samsung and iPhone")}
          >
            ⚖️ Compare products
          </button>

          <button
            onClick={() =>
              handleSuggestion("Show me the best rated products")
            }
          >
            ⭐ Find highly rated products
          </button>

          <button
            onClick={() =>
              handleSuggestion("Suggest products under 5000")
            }
          >
            💰 Find products by budget
          </button>

          <div className="ai-tip">
            <span>💡</span>

            <div>
              <strong>Shopping Tip</strong>

              <p>
                Tell the AI your budget and what you're looking for to get
                better recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Chat */}

        <div className="ai-chat-container">
          <div className="chat-header">
            <div className="chat-avatar">🤖</div>

            <div>
              <h3>ShopSmart AI</h3>

              <span>● Online • Ready to help</span>
            </div>
          </div>

          {/* Messages */}

          <div className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-row ${
                  message.sender === "user" ? "user-row" : "ai-row"
                }`}
              >
                {message.sender === "ai" && (
                  <div className="message-avatar">🤖</div>
                )}

                <div
                  className={`message ${
                    message.sender === "user"
                      ? "user-message"
                      : "ai-message"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}

          <div className="chat-input-container">
            <input
              type="text"
              value={input}
              placeholder="Ask ShopSmart AI anything..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              onClick={() => sendMessage()}
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