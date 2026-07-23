import {
  FaLaptop,
  FaAppleAlt,
  FaTshirt,
  FaHome,
  FaHeartbeat,
  FaGift,
} from "react-icons/fa";
import "./Categories.css";

const categories = [
  {
    title: "Electronics",
    icon: <FaLaptop />,
    color: "electronics",
  },
  {
    title: "Groceries",
    icon: <FaAppleAlt />,
    color: "groceries",
  },
  {
    title: "Fashion",
    icon: <FaTshirt />,
    color: "fashion",
  },
  {
    title: "Home",
    icon: <FaHome />,
    color: "home",
  },
  {
    title: "Healthcare",
    icon: <FaHeartbeat />,
    color: "health",
  },
  {
    title: "Gifts",
    icon: <FaGift />,
    color: "gift",
  },
];

function Categories() {
  return (
    <section className="categories-section">
      <div className="categories-header">
        <span className="categories-badge">
          📂 Shop by Category
        </span>

        <h2>Browse Categories</h2>

        <p>
          Explore products from your favourite categories.
        </p>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <div
            key={category.title}
            className={`category-card ${category.color}`}
          >
            <div className="category-icon">
              {category.icon}
            </div>

            <h3>{category.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;