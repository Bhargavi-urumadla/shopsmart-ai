import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <section className="modern-hero">
      <div className="hero-background-shape hero-shape-one"></div>
      <div className="hero-background-shape hero-shape-two"></div>

      <div className="modern-hero-container">

        {/* ================= LEFT CONTENT ================= */}
        <div className="modern-hero-left">

          <div className="ai-powered-badge">
            <span>✨</span>
            AI-POWERED SHOPPING
          </div>

          <h1>
            Shop smarter
            <br />
            with <span>AI.</span>
          </h1>

          <p className="hero-description">
            Discover products you'll love with intelligent
            recommendations, personalized suggestions and a
            seamless shopping experience.
          </p>

          {/* Buttons */}
          <div className="hero-actions">

            <Link to="/products" className="hero-primary-link">
              <button className="hero-primary-btn">
                <span>🛍️</span>
                Explore Products
                <span className="arrow">→</span>
              </button>
            </Link>

            <Link to="/ai-assistant" className="hero-secondary-link">
              <button className="hero-secondary-btn">
                <span>🤖</span>
                Ask AI Assistant
              </button>
            </Link>

          </div>

          {/* Features */}
          <div className="hero-feature-row">

            <div className="hero-feature">
              <div className="feature-icon ai-icon">
                ✨
              </div>

              <div>
                <strong>AI Recommendations</strong>
                <span>Personalized for you</span>
              </div>
            </div>

            <div className="hero-feature">
              <div className="feature-icon heart-icon">
                ♥
              </div>

              <div>
                <strong>Smart Wishlist</strong>
                <span>Save your favorites</span>
              </div>
            </div>

            <div className="hero-feature">
              <div className="feature-icon secure-icon">
                🔒
              </div>

              <div>
                <strong>Secure Shopping</strong>
                <span>Shop with confidence</span>
              </div>
            </div>

          </div>
        </div>


        {/* ================= RIGHT CONTENT ================= */}
        <div className="modern-hero-right">

          {/* Main AI glow */}
          <div className="ai-glow"></div>

          {/* Decorative circle */}
          <div className="robot-orbit"></div>

          {/* Floating cart icon */}
          <div className="floating-card floating-cart">
            🛒
          </div>

          {/* Floating heart icon */}
          <div className="floating-card floating-heart">
            ❤️
          </div>

          {/* Floating star */}
          <div className="floating-card floating-star">
            ⭐
          </div>

          {/* Robot */}
          <div className="robot-container">

            <div className="robot-head">

              <div className="robot-antenna">
                <span></span>
              </div>

              <div className="robot-face">

                <div className="robot-eye"></div>
                <div className="robot-eye"></div>

                <div className="robot-mouth"></div>

              </div>

            </div>

            <div className="robot-body">

              <div className="robot-screen">
                AI
              </div>

              <div className="robot-body-highlight"></div>

            </div>

            <div className="robot-arm robot-arm-left">
              <div className="robot-hand">👋</div>
            </div>

            <div className="robot-arm robot-arm-right"></div>

          </div>


          {/* AI Match Card */}
          <div className="ai-match-card">

            <div className="match-title">
              <span>✨</span>
              AI Match
            </div>

            <div className="match-score">
              98%
            </div>

            <div className="match-progress">
              <div></div>
            </div>

            <p>Perfect match for you!</p>

          </div>

        </div>

      </div>


      {/* ================= TRUST SECTION ================= */}

      <div className="trust-section">

        <div className="trust-title">
          Trusted by smart shoppers
        </div>

        <div className="trust-stat">
          <strong>10K+</strong>
          <span>Happy Customers</span>
        </div>

        <div className="trust-divider"></div>

        <div className="trust-stat">
          <strong>25K+</strong>
          <span>Products</span>
        </div>

        <div className="trust-divider"></div>

        <div className="trust-stat">
          <strong>98%</strong>
          <span>Satisfaction</span>
        </div>

        <div className="trust-divider"></div>

        <div className="trust-stat">
          <strong>24/7</strong>
          <span>AI Support</span>
        </div>

      </div>

    </section>
  );
}

export default Hero;