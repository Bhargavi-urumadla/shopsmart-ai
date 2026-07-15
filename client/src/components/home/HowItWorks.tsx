import "./HowItWorks.css";

function HowItWorks() {
  return (
    <section className="how-it-works">
      <h2>How ShopSmart AI Works</h2>

      <div className="steps">

        <div className="step-card">
          <div className="step-number">1</div>
          <div className="step-icon">🔍</div>
          <h3>Search Product</h3>
          <p>Search for any product you want to buy.</p>
        </div>

        <div className="step-card">
          <div className="step-number">2</div>
          <div className="step-icon">🤖</div>
          <h3>Ask AI</h3>
          <p>Ask AI if the product is worth buying.</p>
        </div>

        <div className="step-card">
          <div className="step-number">3</div>
          <div className="step-icon">⚖️</div>
          <h3>Compare</h3>
          <p>Compare ratings, price and specifications.</p>
        </div>

        <div className="step-card">
          <div className="step-number">4</div>
          <div className="step-icon">❤️</div>
          <h3>Wishlist</h3>
          <p>Save products to your personal wishlist.</p>
        </div>

        <div className="step-card">
          <div className="step-number">5</div>
          <div className="step-icon">🛒</div>
          <h3>Buy Smartly</h3>
          <p>Purchase confidently with AI guidance.</p>
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;