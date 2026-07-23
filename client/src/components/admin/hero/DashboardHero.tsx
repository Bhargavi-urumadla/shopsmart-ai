import {
  FiTrendingUp,
  FiShoppingCart,
  FiUsers,
  FiAward,
} from "react-icons/fi";
import { motion } from "framer-motion";
import "./DashboardHero.css";

const DashboardHero = () => {
  return (
    <motion.div
      className="dashboard-hero-new"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="hero-left">

        <span className="hero-badge">
          🤖 AI Commerce Dashboard
        </span>

        <h1>
          Good Evening,
          <br />
          Bhargavi 👋
        </h1>

        <p>
          Your AI Store Score increased to
          <strong> 96%</strong>.
          Revenue is growing faster than last week.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            View Analytics
          </button>

          <button className="secondary-btn">
            Generate Report
          </button>
        </div>
      </div>

      <div className="hero-right">

        <div className="hero-card">
          <FiTrendingUp />
          <h2>₹42,540</h2>
          <span>Revenue Today</span>
        </div>

        <div className="hero-card">
          <FiShoppingCart />
          <h2>48</h2>
          <span>Orders Today</span>
        </div>

        <div className="hero-card">
          <FiUsers />
          <h2>124</h2>
          <span>Visitors Online</span>
        </div>

        <div className="hero-card">
          <FiAward />
          <h2>96%</h2>
          <span>AI Score</span>
        </div>

      </div>
    </motion.div>
  );
};

export default DashboardHero;