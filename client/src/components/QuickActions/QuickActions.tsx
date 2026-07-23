import "./QuickActions.css";
import {
  FiShoppingBag,
  FiHeart,
  FiPackage,
  FiUser,
  FiArrowUpRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Continue Shopping",
      subtitle: "Browse Products",
      icon: <FiShoppingBag />,
      path: "/products",
      color: "#14B8A6",
    },
    {
      title: "Wishlist",
      subtitle: "Saved Items",
      icon: <FiHeart />,
      path: "/wishlist",
      color: "#EC4899",
    },
    {
      title: "My Orders",
      subtitle: "Track Orders",
      icon: <FiPackage />,
      path: "/orders",
      color: "#F59E0B",
    },
    {
      title: "My Profile",
      subtitle: "Update Details",
      icon: <FiUser />,
      path: "/profile",
      color: "#6366F1",
    },
  ];

  return (
    <section className="quick-actions">
      <div className="quick-header">
        <h2>Quick Actions</h2>
        <p>Everything you need in one place</p>
      </div>

      <div className="quick-grid">
        {actions.map((item) => (
          <div
            key={item.title}
            className="quick-card"
            onClick={() => navigate(item.path)}
          >
            <div className="card-top">
              <div
                className="quick-icon"
                style={{
                  background: `${item.color}20`,
                  color: item.color,
                }}
              >
                {item.icon}
              </div>

              <FiArrowUpRight className="arrow-icon" />
            </div>

            <h3>{item.title}</h3>

            <p>{item.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;