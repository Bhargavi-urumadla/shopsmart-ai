import {
  FiPlusCircle,
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiBarChart2,
  FiCpu,
} from "react-icons/fi";

import "./QuickActions.css";

const actions = [
  {
    icon: <FiPlusCircle />,
    title: "Add Product",
    subtitle: "Create new product",
  },
  {
    icon: <FiPackage />,
    title: "Inventory",
    subtitle: "Manage stock",
  },
  {
    icon: <FiShoppingBag />,
    title: "Orders",
    subtitle: "View all orders",
  },
  {
    icon: <FiUsers />,
    title: "Customers",
    subtitle: "Customer list",
  },
  {
    icon: <FiBarChart2 />,
    title: "Analytics",
    subtitle: "Sales reports",
  },
  {
    icon: <FiCpu />,
    title: "AI Insights",
    subtitle: "AI recommendations",
  },
];

function QuickActions() {
  return (
    <div className="quick-actions">

      <div className="quick-header">
        <h2>Quick Actions</h2>
        <p>Frequently used admin shortcuts</p>
      </div>

      <div className="quick-grid">
        {actions.map((item) => (
          <div className="quick-card" key={item.title}>

            <div className="quick-icon">
              {item.icon}
            </div>

            <h4>{item.title}</h4>

            <span>{item.subtitle}</span>

          </div>
        ))}
      </div>

    </div>
  );
}

export default QuickActions;