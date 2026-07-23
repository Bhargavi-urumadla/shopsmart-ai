import { useState } from "react";
import {
  NavLink,
  Link,
  useNavigate,
} from "react-router-dom";

import "./Navbar.css";
import { notify } from "../../utils/notify";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    notify.success(
      "Logged out successfully."
    );

    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      {/* Logo */}

      <div className="logo">
  <Link to="/" onClick={closeMenu}>
    <img
    src="/logo.png"
      alt="ShopSmart AI"
      className="logo-image"
    />
  </Link>
</div>


      {/* Mobile Menu Button */}

      <button
        className="mobile-menu-btn"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>


      {/* Navigation */}

      <div
        className={
          menuOpen
            ? "navbar-content active"
            : "navbar-content"
        }
      >

        <ul className="nav-links">

          <li>
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/products"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Products
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/wishlist"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <span>
                ❤️ Wishlist
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/cart"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <span>
                🛒 Cart
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/orders"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Orders
            </NavLink>
          </li>
         <li>
  <NavLink
    to="/ai-assistant"
    onClick={closeMenu}
    className={({ isActive }) =>
      isActive
        ? "nav-link ai-link active"
        : "nav-link ai-link"
    }
  >
    🤖 AI Assistant
  </NavLink>
</li>

        </ul>


        {/* Right Side */}

        <div className="nav-right">

          <div className="user-info">

            <div className="user-avatar">
              {user?.name
                ?.charAt(0)
                ?.toUpperCase() || "U"}
            </div>

            <div className="user-details">

              <span className="welcome-text">
                Welcome
              </span>

              <span className="username">
                {user?.name || "Shopper"}
              </span>

            </div>

          </div>


          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;