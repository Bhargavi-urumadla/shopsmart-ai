import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import "./Newsletter.css";

function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    alert("🎉 Thanks for subscribing!");
    setEmail("");
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-content">
        <h2>Stay Updated</h2>

        <p>
          Subscribe to receive exclusive offers, product launches, and AI shopping tips.
        </p>

        <div className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={handleSubscribe}>
            <FaPaperPlane />
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;