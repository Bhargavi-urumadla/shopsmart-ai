import "./StatsCards.css";
import {
  FiShoppingBag,
  FiHeart,
  FiShoppingCart,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";

function StatsCards() {
  const stats = [
    {
      title: "Total Orders",
      value: 12,
      change: "+3 This Month",
      icon: <FiShoppingBag />,
      color: "#4F46E5",
    },
    {
      title: "Wishlist",
      value: 8,
      change: "+2 Added",
      icon: <FiHeart />,
      color: "#EC4899",
    },
    {
      title: "Cart Items",
      value: 3,
      change: "Ready to Buy",
      icon: <FiShoppingCart />,
      color: "#F59E0B",
    },
    {
      title: "Amount Spent",
      value: "₹24,850",
      change: "+18% Saved",
      icon: <FiDollarSign />,
      color: "#10B981",
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((item) => (
        <div className="stat-card" key={item.title}>
          <div className="stat-top">
            <div
              className="stat-icon"
              style={{ background: `${item.color}20`, color: item.color }}
            >
              {item.icon}
            </div>

            <FiTrendingUp className="trend-icon" />
          </div>

          <div className="stat-content">
            <h2>{item.value}</h2>
            <p>{item.title}</p>

            <span className="stat-change">
              {item.change}
            </span>
          </div>

          <div className="progress">
            <div
              className="progress-fill"
              style={{ background: item.color }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;