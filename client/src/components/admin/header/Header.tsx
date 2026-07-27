import {
  FiSearch,
  FiBell,
  FiMessageSquare,
  FiChevronDown,
  FiCpu,
} from "react-icons/fi";
import { motion } from "framer-motion";
import "./Header.css";

const Header = () => {
  return (
    <motion.header
      className="admin-header"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="header-left">
        <h2>Dashboard</h2>

        <p>
          Welcome back 👋 <span>Manage your AI Commerce Platform</span>
        </p>
      </div>

      <div className="header-right">

        <div className="search-box">
          <FiSearch />

          <input
            type="text"
            placeholder="Search products, customers, orders..."
          />
        </div>

        <button className="icon-btn ai-btn">
          <FiCpu />
        </button>

        <button className="icon-btn">
          <FiMessageSquare />
        </button>

        <button className="icon-btn notification">
          <FiBell />
          <span className="notification-dot"></span>
        </button>

        <div className="status-pill">
          <span className="status-dot"></span>
          Live
        </div>

        <div className="admin-profile">
          <img
            src="https://ui-avatars.com/api/?name=Bhargavi&background=3b82f6&color=fff"
            alt="Admin"
          />

          <div className="profile-info">
            <h4>Bhargavi</h4>
            <span>Administrator</span>
          </div>

          <FiChevronDown />
        </div>

      </div>
    </motion.header>
  );
};

export default Header;