import "./Testimonials.css";

function Testimonials() {
  return (
    <section className="testimonials">

      <h2>What Our Users Say</h2>

      <div className="testimonial-grid">

        <div className="testimonial-card">
          <div className="stars">★★★★★</div>

          <p>
            "ShopSmart AI saved me hours of research before buying my laptop.
            The AI recommendation was accurate and easy to understand."
          </p>

          <h4>Rahul Sharma</h4>
          <span>Software Engineer</span>
        </div>

        <div className="testimonial-card">
          <div className="stars">★★★★★</div>

          <p>
            "I compared three phones in just a few minutes.
            This is much easier than watching dozens of review videos."
          </p>

          <h4>Priya Reddy</h4>
          <span>College Student</span>
        </div>

        <div className="testimonial-card">
          <div className="stars">★★★★★</div>

          <p>
            "Wishlist and AI suggestions are my favorite features.
            I use ShopSmart AI before every online purchase."
          </p>

          <h4>Arjun Kumar</h4>
          <span>Digital Creator</span>
        </div>

      </div>

    </section>
  );
}

export default Testimonials;