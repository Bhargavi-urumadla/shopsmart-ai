import "./InventoryHero.css";
import {
  FaBoxes,
  FaExclamationTriangle,
  FaTimesCircle,
  FaRupeeSign,
} from "react-icons/fa";

interface InventoryHeroProps {
  stats: {
    totalProducts: number;
    lowStock: number;
    outOfStock: number;
    inventoryValue: number;
  };
}

const InventoryHero = ({ stats }: InventoryHeroProps) => {
  const cards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: <FaBoxes />,
      color: "#2563eb",
    },
    {
      title: "Low Stock",
      value: stats.lowStock,
      icon: <FaExclamationTriangle />,
      color: "#f59e0b",
    },
    {
      title: "Out of Stock",
      value: stats.outOfStock,
      icon: <FaTimesCircle />,
      color: "#ef4444",
    },
    {
      title: "Inventory Value",
      value: `₹${stats.inventoryValue.toLocaleString()}`,
      icon: <FaRupeeSign />,
      color: "#10b981",
    },
  ];

  return (
    <div className="inventory-hero">
      {cards.map((card, index) => (
        <div className="inventory-card" key={index}>
          <div
            className="inventory-icon"
            style={{ background: card.color }}
          >
            {card.icon}
          </div>

          <div className="inventory-content">
            <h4>{card.title}</h4>
            <h2>{card.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryHero;