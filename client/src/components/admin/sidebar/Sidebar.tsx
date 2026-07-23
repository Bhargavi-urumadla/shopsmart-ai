import { NavLink } from "react-router-dom";
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
} from "react-icons/fi";
import "./Sidebar.css";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: <FiGrid /> },
  { name: "Products", path: "/admin/products", icon: <FiPackage /> },
  { name: "Orders", path: "/admin/orders", icon: <FiShoppingCart /> },
  { name: "Customers", path: "/admin/customers", icon: <FiUsers /> },
  { name: "Categories", path: "/admin/categories", icon: <FiLayers /> },
  { name: "Inventory", path: "/admin/inventory", icon: <FiBox /> },
  { name: "Analytics", path: "/admin/analytics", icon: <FiBarChart2 /> },
  { name: "AI Insights", path: "/admin/ai-insights", icon: <FiCpu /> },
  { name: "Settings", path: "/admin/settings", icon: <FiSettings /> },
  { name: "Profile", path: "/admin/profile", icon: <FiUser /> },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-circle">AI</div>

        <div>
          <h2>ShopSmart</h2>
          <span>Admin Panel</span>
        </div>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <span className="menu-icon">{item.icon}</span>

            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;