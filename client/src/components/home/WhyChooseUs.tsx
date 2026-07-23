import { FaStar } from "react-icons/fa";
import "./Testimonials.css";

const reviews = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    review:
      "The AI recommendations were incredibly accurate. I found the perfect laptop in minutes!",
  },
  {
    name: "Priya Reddy",
    role: "Designer",
    review:
      "Beautiful UI and a smooth shopping experience. Highly recommended!",
  },
  {
    name: "Arjun Kumar",
    role: "Student",
    review:
      "Loved the budget shopping suggestions. Saved both time and money.",
  },
];

function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="section-header">
        <h2>What Our Customers Say</h2>
        <p>
          Thousands of shoppers trust ShopSmart AI for smarter purchases.
        </p>
      </div>

      <div className="testimonial-grid">
        {reviews.map((review, index) => (
          <div className="testimonial-card" key={index}>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <p className="review-text">"{review.review}"</p>

            <h3>{review.name}</h3>
            <span>{review.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;