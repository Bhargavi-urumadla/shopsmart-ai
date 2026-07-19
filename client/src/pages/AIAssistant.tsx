
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaCopy,
} from "react-icons/fa";
import {
  FaMoon,
  FaSun,
  FaMicrophone,
  FaMicrophoneSlash,
} from "react-icons/fa";;
import { FiRefreshCw } from "react-icons/fi";
import "./AIAssistant.css";
import API from "../api/api";
import { notify } from "../utils/notify";
import { FiSend } from "react-icons/fi";
interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  image: string;
}

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
  products?: Product[];
  feedback?: "like" | "dislike";
}
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

function AIAssistant() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
const [darkMode, setDarkMode] = useState(() => {
 
  return localStorage.getItem("theme") === "dark";
});
 const [isListening, setIsListening] = useState(false);
  const [lastPrompt, setLastPrompt] = useState("");
  
  const navigate = useNavigate();


  const inputRef = useRef<HTMLInputElement>(null);
const messagesEndRef = useRef<HTMLDivElement>(null);

  
const initialMessage: Message = {
  id: 1,
  sender: "ai",
  text: "Hi! 👋 I'm your ShopSmart AI Assistant. I can help you discover products, compare options, and make smarter shopping decisions.",
};

const [messages, setMessages] = useState<Message[]>(() => {
  const saved = localStorage.getItem("ai-chat-history");

  if (saved) {
    return JSON.parse(saved);
  }

  return [initialMessage];
});
  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, isLoading]);

useEffect(() => {
  if (!isLoading) {
    inputRef.current?.focus();
  }
}, [isLoading]);
useEffect(() => {
  localStorage.setItem(
    "ai-chat-history",
    JSON.stringify(messages)
  );
}, [messages]);
useEffect(() => {
  if (darkMode) {
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);
  const sendMessage = async (messageText?: string) => {
    const text = messageText ?? input;
   

    if (!text.trim()) return;
     setLastPrompt(text);

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setIsLoading(true);

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
  products: res.data.products || [],
};

      setMessages((prev) => [...prev, aiMessage]);
    } 
catch (error) {
      console.error(error);
      
      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: "❌ Sorry! Something went wrong. Please try again.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    }
    finally {
  setIsLoading(false);
}
  };

  const handleSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };
  const regenerateResponse = () => {

  console.log("Regenerate clicked");
  console.log("lastPrompt:", lastPrompt);    if (!lastPrompt) return;

  sendMessage(lastPrompt);
};
const handleFeedback = (
  id: number,
  feedback: "like" | "dislike"
) => {
  setMessages((prev) =>
    prev.map((msg) =>
      msg.id === id
        ? { ...msg, feedback }
        : msg
    )
  );

  notify.success(
    feedback === "like"
      ? "👍Thanks for your feedback!"
      : "👎Feedback received!"
  );
};
const startListening = () => {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    notify.error("Speech Recognition is not supported.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  setIsListening(true);
notify.success("🎤 Speak now...");
  

  recognition.start();

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;

    console.log("Voice:", transcript);

    setInput(transcript);

    recognition.stop();

    setIsListening(false);

    notify.success("✅ Voice captured!");

    inputRef.current?.focus();
  };

  recognition.onerror = (event: any) => {
    console.log("Speech Error:", event.error);

    notify.error(event.error);

    setIsListening(false);

    recognition.stop();
  };

  recognition.onend = () => {
    setIsListening(false);
  };
};
  const clearChat = () => {
  setMessages([initialMessage]);
  notify.success("Chat cleared!");
};
const addToCart = async (productId: string) => {
  try {
    const token = localStorage.getItem("token");

    await API.post(
      "/cart",
      {
        productId,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    notify.success("Product added to cart!");
  } catch (error) {
    console.error(error);
    notify.error("Failed to add product.");
  }
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
       
        <div className="header-right">

  <button
    className="theme-toggle"
    onClick={() => setDarkMode(!darkMode)}
    title={
      darkMode
        ? "Switch to Light Mode"
        : "Switch to Dark Mode"
    }
  >
    {darkMode ? <FaSun /> : <FaMoon />}
  </button>

  <div className="ai-status">
    <span className="status-dot"></span>
    AI Assistant Online
  </div>

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
  disabled={isLoading}
            onClick={() =>
              handleSuggestion("Recommend the best products for me")
            }
          >
            🎯 Recommend products for me
          </button>

          <button
            disabled={isLoading}
            onClick={() => handleSuggestion("Compare Samsung and iPhone")}
          >
            ⚖️ Compare products
          </button>

          <button
  disabled={isLoading}
            onClick={() =>
              handleSuggestion("Show me the best rated products")
            }
          >
            ⭐ Find highly rated products
          </button>

          <button
            disabled={isLoading}
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

  <button
    className="clear-chat-btn"
    onClick={clearChat}
  >
    🗑 Clear Chat
  </button>
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
  <p>{message.text}</p>
  {message.sender === "ai" && (
  <div className="message-actions">

   <button
  className={`action-btn ${
    message.feedback === "like" ? "active" : ""
  }`}
  onClick={() => handleFeedback(message.id, "like")}
>
  <FaThumbsUp />
</button>

<button
  className={`action-btn dislike ${
  message.feedback === "dislike" ? "active" : ""
}`}
  onClick={() => handleFeedback(message.id, "dislike")}
>
  <FaThumbsDown />
</button>

<button
  className="action-btn"
  onClick={() => {
    navigator.clipboard.writeText(message.text);
    notify.success("Copied!");
  }}
>
  <FaCopy />
</button>

<button
  className="action-btn"
  onClick={regenerateResponse}
  disabled={isLoading}
>
  <FiRefreshCw />
</button>

  </div>
)}

  {message.products && message.products.length > 0 && (
    <div className="ai-products">
      {message.products.map((product) => (
        <div
          key={product._id}
          className="ai-product-card"
        >
          <img
            src={product.image}
            alt={product.name}
            className="ai-product-image"
          />

          <h4>{product.name}</h4>

          <p>🏷️ {product.brand}</p>

          <p>⭐ {product.rating}</p>

          
          <div className="product-actions">
  <button
    className="view-details-btn"
    onClick={() => navigate(`/products/${product._id}`)}
    disabled={isLoading}
  >
    View Details
  </button>

  <button
    className="add-cart-btn"
    onClick={() => addToCart(product._id)}
  >
    🛒 Add to Cart
  </button>
</div>
        </div>
      ))}
    </div>
  )}
</div>
              </div>
            ))}
    {isLoading && (
              <div className="message-row ai-row">
                <div className="message-avatar">🤖</div>

                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
                <div ref={messagesEndRef}></div>   
          </div>

          {/* Input */}

       <div className="chat-input-container">

  <input
    ref={inputRef}
    type="text"
    value={input}
    disabled={isLoading}
    placeholder={
      isListening
        ? "🎤 Listening..."
        : isLoading
        ? "AI is thinking..."
        : "Ask ShopSmart AI anything..."
    }
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    }}
  />

  {/* Buttons */}
  <div className="chat-input-actions">
    <button
      className={`mic-btn ${isListening ? "listening" : ""}`}
      onClick={startListening}
      disabled={isLoading}
      title="Voice Input"
    >
      {isListening ? (
        <FaMicrophoneSlash size={18} />
      ) : (
        <FaMicrophone size={18} />
      )}
    </button>

    <button
      className="send-btn"
      onClick={() => sendMessage()}
      disabled={!input.trim() || isLoading}
    >
      {isLoading ? (
        <>
          <span className="spinner"></span>
          Thinking...
        </>
      ) : (
        <>
          Send <FiSend />
        </>
      )}
    </button>
  </div>

</div>
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;