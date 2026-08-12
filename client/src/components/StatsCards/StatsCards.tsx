import "./StatsCards.css";
import {
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiPackage,
  FiTrendingUp,
} from "react-icons/fi";

interface DashboardOverview {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  averageOrderValue?: number;
  activeProducts?: number;
}

interface StatsCardsProps {
  data: DashboardOverview | null;
}

function StatsCards({ data }: StatsCardsProps) {
  const stats = [
    {
      title: "Revenue",
      value: `₹${data?.totalRevenue?.toLocaleString() ?? 0}`,
      change: "+18%",
      icon: <FiDollarSign />,
      color: "#22c55e",
      gradient: "linear-gradient(135deg,#16a34a,#22c55e)",
    },
    {
      title: "Orders",
      value: data?.totalOrders?.toLocaleString() ?? "0",
      change: "+12%",
      icon: <FiShoppingCart />,
      color: "#3b82f6",
      gradient: "linear-gradient(135deg,#2563eb,#3b82f6)",
    },
    {
      title: "Customers",
      value: data?.totalCustomers?.toLocaleString() ?? "0",
      change: "+8%",
      icon: <FiUsers />,
      color: "#8b5cf6",
      gradient: "linear-gradient(135deg,#7c3aed,#8b5cf6)",
    },
    {
      title: "Products",
      value: data?.totalProducts?.toLocaleString() ?? "0",
      change: `Active: ${data?.activeProducts ?? 0}`,
      icon: <FiPackage />,
      color: "#f59e0b",
      gradient: "linear-gradient(135deg,#d97706,#f59e0b)",
    },
  ];

  return (
    <section className="stats-grid">
      {stats.map((item) => (
        <div
          className="stat-card"
          key={item.title}
          style={{ borderTop: `4px solid ${item.color}` }}
        >
          <div className="stat-header">
            <div
              className="stat-icon"
              style={{
                background: item.gradient,
              }}
            >
              {item.icon}
            </div>

            <span
              className="stat-growth"
              style={{
                background: `${item.color}20`,
                color: item.color,
              }}
            >
              <FiTrendingUp />
              {item.change}
            </span>
          </div>

          <h2>{item.value}</h2>

          <p>{item.title}</p>
        </div>
      ))}
    </section>
  );
}

export default StatsCards;