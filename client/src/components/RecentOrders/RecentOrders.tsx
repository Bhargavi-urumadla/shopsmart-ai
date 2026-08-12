import "./RecentOrders.css";
import {
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiArrowRight,
} from "react-icons/fi";

interface Product {
  product: {
    name: string;
    brand?: string;
    image?: string;
  };
}

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  user?: {
    name: string;
    email: string;
  };
  products: Product[];
}

interface RecentOrdersProps {
  orders: Order[];
}

const RecentOrders = ({ orders }: RecentOrdersProps) => {
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
          <p>Latest customer orders</p>
        </div>

        <button className="view-all-btn">
          View All
        </button>
      </div>

      {orders.map((order) => {
        const firstProduct = order.products?.[0];

        return (
          <div
            className="order-item"
            key={order._id}
          >
            <img
              src={
                firstProduct?.product?.image ||
                "/images/no-image.png"
              }
              alt={firstProduct?.product?.name || "Product"}
              className="order-image"
            />

            <div className="order-details">
              <h4>
                {firstProduct?.product?.name || "Product"}
              </h4>

              <p>{order.user?.name}</p>

              <small>
                {new Date(order.createdAt).toLocaleDateString()}
              </small>
            </div>

            <div className="order-price">
              ₹{order.totalAmount.toLocaleString()}
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
        );
      })}
    </div>
  );
};

export default RecentOrders;