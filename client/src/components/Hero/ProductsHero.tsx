import "./ProductsHero.css";
import { FiShoppingBag } from "react-icons/fi";

function ProductsHero() {
  return (
    <section className="products-hero">

      <div className="hero-pattern"></div>

      <div className="hero-left">

        <div className="hero-icon">
          <FiShoppingBag />
        </div>

        <div>

          <span className="hero-tag">
            AI Powered Shopping
          </span>

          <h1>
            ShopSmart <span>Products</span>
          </h1>

          <p>
            Discover premium products with AI-powered
            recommendations, fast delivery and secure shopping.
          </p>

        </div>

      </div>

      <div className="hero-right">

        <div className="product-count">
          <span className="count-icon">✨</span>

          <div>
            <h3>20 Products</h3>
            <small>Total Available</small>
          </div>
        </div>

        <span className="star star1">✨</span>
        <span className="star star2">⭐</span>
        <span className="star star3">✨</span>

       

        <img
          src="/images/ai-shopping-bot.png"
          alt="AI Shopping Robot"
          className="hero-bot"
        />

      </div>

    </section>
  );
}

export default ProductsHero;