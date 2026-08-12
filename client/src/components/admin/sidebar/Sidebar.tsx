import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiGrid,
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiLayers,
  FiBox,
  FiBarChart2,
  FiCpu,
  FiSettings,
  FiUser,
  FiLogOut,
  FiZap,
} from "react-icons/fi";

import "./Sidebar.css";

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <FiGrid />,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: <FiPackage />,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: <FiShoppingCart />,
  },
  {
    name: "Customers",
    path: "/admin/customers",
    icon: <FiUsers />,
  },
  {
    name: "Categories",
    path: "/admin/categories",
    icon: <FiLayers />,
  },
  {
    name: "Inventory",
    path: "/admin/inventory",
    icon: <FiBox />,
  },
  {
    name: "Analytics",
    path: "/admin/analytics",
    icon: <FiBarChart2 />,
  },
  {
    name: "AI Insights",
    path: "/admin/ai-insights",
    icon: <FiCpu />,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: <FiSettings />,
  },
  {
    name: "Profile",
    path: "/admin/profile",
    icon: <FiUser />,
  },
];

const Sidebar = () => {
  const handleLogout = () => {
    console.log("Logout clicked");
    // TODO:
    // Clear token
    // Navigate("/login")
  };

  return (
    <aside className="sidebar glass">
      <motion.div
        className="sidebar-logo"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="logo-circle">
          <FiZap />
        </div>

        <div>
          <h2>ShopSmart AI</h2>
          <span>Admin Dashboard</span>
        </div>
      </motion.div>

      <nav className="sidebar-menu">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.05,
            }}
          >
            <NavLink
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
              title={item.name}
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">B</div>

          <div>
            <h4>Bhargavi</h4>
            <p>Administrator</p>
          </div>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
          aria-label="Logout"
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;