import "./Sidebar.css";
import {
  FiHome,
  FiShoppingBag,
  FiHeart,
  FiShoppingCart,
  FiPackage,
  FiUser,
  FiMapPin,
  FiLock,
  FiLogOut,
  FiGift,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "Products", icon: <FiShoppingBag />, path: "/products" },
    { name: "Wishlist", icon: <FiHeart />, path: "/wishlist" },
    { name: "Cart", icon: <FiShoppingCart />, path: "/cart" },
    { name: "Orders", icon: <FiPackage />, path: "/orders" },
    { name: "Profile", icon: <FiUser />, path: "/profile" },
    { name: "Address", icon: <FiMapPin />, path: "/profile/address" },
    { name: "Change Password", icon: <FiLock />, path: "/profile/password" },
  ];

  return (
    <div className="sidebar">

      <div className="sidebar-logo">
        <div className="sidebar-logo">
  <h2>
    ShopSmart <span>AI</span>
  </h2>

  <small>Smart Shopping Platform</small>
</div>
      </div>

      <p className="sidebar-title">SHOP</p>

      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={
              location.pathname === item.path
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="offer-card">
        <FiGift size={28} />
        <h4>Exclusive Offers</h4>
        <p>Grab amazing deals just for you.</p>

        <button>Shop Now</button>
      </div>

      <button className="logout-btn">
        <FiLogOut />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;