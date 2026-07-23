import {
  FiSearch,
  FiBell,
  FiMessageSquare,
  FiChevronDown,
} from "react-icons/fi";
import "./Header.css";

const Header = () => {
  return (
    <header className="admin-header">

      <div className="header-left">
        <h2>Dashboard</h2>
        <p>Welcome back 👋 Manage your store efficiently.</p>
      </div>

      <div className="header-right">

        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search products, orders..."
          />
        </div>

        <button className="icon-btn">
          <FiMessageSquare />
        </button>

        <button className="icon-btn notification">
          <FiBell />
          <span className="notification-dot"></span>
        </button>

        <div className="admin-profile">

          <img
            src="https://ui-avatars.com/api/?name=Admin&background=14b8a6&color=fff"
            alt="Admin"
          />

          <div className="profile-info">
            <h4>Admin</h4>
            <span>Super Admin</span>
          </div>

          <FiChevronDown />

        </div>

      </div>

    </header>
  );
};

export default Header;