import "./Hero.css";
import { FaGift } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";

function Hero() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="hero">
      <div className="hero-left">
        <p className="hero-date">{today}</p>

        <h1>
          Welcome back,
          <span> {user?.name}</span> 👋
        </h1>

        <p className="hero-text">
          Ready to explore amazing products? Continue shopping and
          enjoy exclusive offers curated just for you.
        </p>

        <button className="hero-btn">
          <IoBagHandle />
          Continue Shopping
        </button>
      </div>

      <div className="hero-right">

        <img
          src="/images/shopping girl.png"
          alt="Shopping Girl"
          className="shopping-girl"
        />

        <div className="sale-badge">
  <FaGift className="sale-icon" />

  <span>Flat 30% OFF</span>
</div>

      </div>
    </section>
  );
}

export default Hero;