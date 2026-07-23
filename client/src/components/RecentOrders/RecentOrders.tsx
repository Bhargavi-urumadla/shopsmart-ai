import "./RecentOrders.css";
import { recentOrders } from "../../data/admin/orders";
import {
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiArrowRight,
} from "react-icons/fi";

const RecentOrders = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <FiCheckCircle />;

      case "Processing":
        return <FiClock />;

      case "Cancelled":
        return <FiXCircle />;

      default:
        return <FiClock />;
    }
  };

  return (
    <div className="recent-orders">
      <div className="orders-header">
        <div>
          <h2>Recent Orders</h2>
          <p>Your latest purchases</p>
        </div>

        <button className="view-all-btn">
          View All
        </button>
      </div>

      {recentOrders.map((order) => (
        <div
          className="order-item"
          key={order.id}
        >
          <img
            src={order.image}
            alt={order.product}
            className="order-image"
          />

          <div className="order-details">
            <h4>{order.product}</h4>

            <p>{order.id}</p>

            <small>{order.date}</small>
          </div>

          <div className="order-price">
            {order.price}
          </div>

          <span
            className={`status ${order.status.toLowerCase()}`}
          >
            {getStatusIcon(order.status)}
            {order.status}
          </span>

          <button className="details-btn">
            View
            <FiArrowRight />
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecentOrders;