import "./Hero.css";


function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <h1>
          Smart Shopping
          <br />
          Starts Here
        </h1>

        <p>
          Compare products using AI,
          discover pros and cons,
          and make smarter buying decisions.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Get Started
          </button>

          <button className="secondary-btn">
            Explore
          </button>
        </div>

      </div>

      <div className="hero-right">

        🤖

      </div>

    </section>
  );
}

export default Hero;