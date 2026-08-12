import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiShoppingCart,
  FiUsers,
  FiCpu,
} from "react-icons/fi";

import "./DashboardHero.css";

const stats = [
  {
    icon: <FiTrendingUp />,
    value: "₹42,540",
    label: "Today's Revenue",
  },
  {
    icon: <FiShoppingCart />,
    value: "48",
    label: "Orders",
  },
  {
    icon: <FiUsers />,
    value: "124",
    label: "Customers",
  },
  {
    icon: <FiCpu />,
    value: "96%",
    label: "AI Score",
  },
];

const DashboardHero = () => {
  return (
    <motion.section
      className="dashboard-hero"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="hero-left">
        <span className="hero-chip">
          🤖 ShopSmart AI Dashboard
        </span>

        <h1>Welcome back, Bhargavi 👋</h1>

        <p>
          Here's a quick overview of today's performance.
        </p>
      </div>

      <div className="hero-right">
        {stats.map((item) => (
          <div
            key={item.label}
            className="hero-card"
          >
            <div className="hero-icon">
              {item.icon}
            </div>

            <h3>{item.value}</h3>

            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default DashboardHero;