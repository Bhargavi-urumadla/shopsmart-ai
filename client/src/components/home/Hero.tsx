import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <section
      className="hero"
      data-aos="zoom-in"
      data-aos-duration="1500"
    >
      <div className="hero-content">
        {/* Left Side */}
        <div className="hero-left">
          <div className="hero-tags">
            <span className="welcome-tag">👋 Welcome Back</span>

            <span className="ai-badge">
              ✨ AI Powered Shopping
            </span>
          </div>

          <h1>
            Shop Smarter with <span>AI</span>
          </h1>

          <h2>
            Welcome back, {user?.name || "Shopper"} 👋
          </h2>

          <p>
            Discover products faster with intelligent recommendations,
            save your favourites, compare prices instantly,
            and enjoy a seamless shopping experience.
          </p>

          <div className="hero-features">
            <span>🤖 AI Recommendations</span>
            <span>❤️ Smart Wishlist</span>
            <span>🛒 Fast Checkout</span>
            <span>🔒 Secure Shopping</span>
          </div>

          <div className="hero-buttons">
            <Link to="/products">
              <button className="primary-btn">
                Explore Products
              </button>
            </Link>

            <Link to="/ai-assistant">
              <button className="secondary-btn">
                Ask AI
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="hero-right">
          <div className="hero-circle">
            🤖
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;