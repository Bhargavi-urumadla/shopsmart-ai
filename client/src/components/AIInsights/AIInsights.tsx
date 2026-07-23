import "./AIInsights.css";
import {
  FiTrendingUp,
  FiAlertTriangle,
  FiBarChart2,
} from "react-icons/fi";

const insights = [
  {
    icon: <FiTrendingUp />,
    title: "Trending Product",
    message: "Electronics sales increased by 22%",
    action: "View Details",
    type: "success",
  },
  {
    icon: <FiAlertTriangle />,
    title: "Low Stock Alert",
    message: "Bluetooth Headphones only 8 left",
    action: "Restock",
    type: "warning",
  },
  {
    icon: <FiBarChart2 />,
    title: "Sales Prediction",
    message: "Weekend sales expected to grow by 18%",
    action: "View Report",
    type: "info",
  },
];

const AIInsights = () => {
  return (
    <div className="ai-insights">
      <div className="ai-header">
        <span>🤖</span>
        <h2>AI Business Insights</h2>
      </div>

      {insights.map((item, index) => (
        <div className={`insight-card ${item.type}`} key={index}>
          <div className="insight-icon">{item.icon}</div>

          <div className="insight-content">
            <h4>{item.title}</h4>
            <p>{item.message}</p>

            <button>{item.action}</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AIInsights;