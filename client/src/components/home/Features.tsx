import "./Features.css";

function Features() {
  return (
    <section className="features">

      <h2>Why ShopSmart AI?</h2>

      <div className="feature-grid">

        <div className="feature-card">
          🤖
          <h3>AI Recommendations</h3>
          <p>
            Get instant buying advice powered by AI.
          </p>
        </div>

        <div className="feature-card">
          📊
          <h3>Compare Products</h3>
          <p>
            Compare price, rating and specifications.
          </p>
        </div>

        <div className="feature-card">
          ❤️
          <h3>Wishlist</h3>
          <p>
            Save your favourite products.
          </p>
        </div>

        <div className="feature-card">
          ⚡
          <h3>Fast Decisions</h3>
          <p>
            Save hours of research.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Features;