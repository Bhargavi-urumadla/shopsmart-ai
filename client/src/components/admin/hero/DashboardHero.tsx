import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiShoppingCart,
  FiUsers,
  FiCpu,
} from "react-icons/fi";

import "./DashboardHero.css";

const DashboardHero = () => {
  return (
    <motion.section
      className="dashboard-hero"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="hero-content">

        <span className="hero-chip">
          🤖 AI Commerce Dashboard
        </span>

        <h1>
          Welcome back,
          <br />
          <span>Bhargavi 👋</span>
        </h1>

        <p>
          Your AI engine analysed today's sales.
          Revenue is <strong>18%</strong> higher than yesterday and
          your store health score is <strong>96%</strong>.
        </p>

        <div className="hero-actions">
          <button className="primary-btn">
            View Analytics
          </button>

          <button className="secondary-btn">
            Generate Report
          </button>
        </div>

      </div>

      <div className="hero-stats">

        <div className="stat-box">
          <FiTrendingUp />
          <h3>₹42,540</h3>
          <span>Revenue Today</span>
        </div>

        <div className="stat-box">
          <FiShoppingCart />
          <h3>48</h3>
          <span>Orders Today</span>
        </div>

        <div className="stat-box">
          <FiUsers />
          <h3>124</h3>
          <span>Visitors</span>
        </div>

        <div className="stat-box">
          <FiCpu />
          <h3>96%</h3>
          <span>AI Score</span>
        </div>

      </div>
    </motion.section>
  );
};

export default DashboardHero;