import { useNavigate } from "react-router-dom";
import {
  FaRobot,
  FaSearch,
  FaBolt,
  FaBrain,
  FaShoppingBag,
} from "react-icons/fa";
import "./AISection.css";

function AISection() {
  const navigate = useNavigate();

  return (
    <section className="ai-section">

      <div className="ai-left">

        <span className="ai-badge">
          🤖 AI Powered Shopping
        </span>

        <h2>
          Shop Smarter with
          <span> Artificial Intelligence</span>
        </h2>

        <p>
          Discover products instantly using AI.
          Compare products, get personalized
          recommendations, and find the perfect
          product within your budget.
        </p>

        <div className="ai-search">

          <input
            type="text"
            placeholder="Ask AI anything..."
            readOnly
          />

          <button
            onClick={() =>
              navigate("/ai-assistant")
            }
          >
            <FaSearch />
            Ask AI
          </button>

        </div>

        <div className="trending">

          <p>🔥 Trending Searches</p>

          <div className="chips">

            <span>Best phone under ₹30000</span>

            <span>Laptop for coding</span>

            <span>Healthy groceries</span>

            <span>Gaming accessories</span>

          </div>

        </div>

      </div>

      <div className="ai-right">

        <div className="feature-card">
          <FaRobot />
          <h3>Smart Recommendations</h3>
        </div>

        <div className="feature-card">
          <FaBrain />
          <h3>AI Product Comparison</h3>
        </div>

        <div className="feature-card">
          <FaBolt />
          <h3>Instant Suggestions</h3>
        </div>

        <div className="feature-card">
          <FaShoppingBag />
          <h3>Budget Shopping</h3>
        </div>

      </div>

    </section>
  );
}

export default AISection;