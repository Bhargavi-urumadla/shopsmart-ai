import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-logo">
        <h2>🛍 ShopSmart AI</h2>

        <p>
          Smart shopping powered by AI.
        </p>
      </div>

      <div className="footer-links">

        <div>
          <h3>Quick Links</h3>

          <p>Home</p>
          <p>Features</p>
          <p>About</p>
        </div>

        <div>
          <h3>Contact</h3>

          <p>support@shopsmart.ai</p>

          <p>Hyderabad, India</p>
        </div>

      </div>

      <hr />

      <div className="copyright">
        © 2026 ShopSmart AI. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;