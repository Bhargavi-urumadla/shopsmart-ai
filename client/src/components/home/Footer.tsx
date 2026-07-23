import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Company */}
        <div className="footer-column">
          <h2>🛍️ ShopSmart AI</h2>

          <p>
            Your AI-powered shopping companion that helps you discover,
            compare, and buy smarter with personalized recommendations.
          </p>

          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaGithub /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>

        {/* Categories */}
        <div className="footer-column">
          <h3>Categories</h3>

          <p>Mobiles</p>
          <p>Laptops</p>
          <p>Accessories</p>
          <p>Fashion</p>
          <p>Home Appliances</p>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h3>Contact</h3>

          <p><FaMapMarkerAlt /> Hyderabad, India</p>
          <p><FaPhoneAlt /> +91 9876543210</p>
          <p><FaEnvelope /> support@shopsmartai.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} ShopSmart AI.
        All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;