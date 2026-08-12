import { useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaCreditCard,
  FaArrowRight,
} from "react-icons/fa";
import "./OrderCard.css";

interface Product {
  product: {
    name: string;
    image: string;
  };
  quantity: number;
}

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  products: Product[];
}

interface Props {
  order: Order;
}

function OrderCard({ order }: Props) {
  const navigate = useNavigate();

  const statusClass = order.status
    .toLowerCase()
    .replace(/\s+/g, "-");

  const formattedDate = new Date(
    order.createdAt
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="order-card">
      {/* Top section */}
      <div className="order-card-top">
        <div className="order-id-section">
          <div className="order-icon">
            <FaBoxOpen />
          </div>

          <div>
            <span className="order-label">
              ORDER
            </span>

            <h3>
              #{order._id.slice(-8).toUpperCase()}
            </h3>
          </div>
        </div>

        <span
          className={`order-status ${statusClass}`}
        >
          <span className="status-dot"></span>
          {order.status}
        </span>
      </div>

      {/* Divider */}
      <div className="order-divider"></div>

      {/* Order information */}
      <div className="order-info-grid">
        <div className="order-info-item">
          <div className="info-icon">
            <FaCalendarAlt />
          </div>

          <div>
            <span>Date</span>
            <strong>{formattedDate}</strong>
          </div>
        </div>

        <div className="order-info-item">
          <div className="info-icon">
            <FaCreditCard />
          </div>

          <div>
            <span>Payment</span>
            <strong>
              {order.paymentMethod}
            </strong>
          </div>
        </div>

        <div className="order-info-item">
          <div className="info-icon">
            <FaBoxOpen />
          </div>

          <div>
            <span>Products</span>
            <strong>
              {order.products.length}{" "}
              {order.products.length === 1
                ? "Item"
                : "Items"}
            </strong>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="order-card-bottom">
        <div className="order-total">
          <span>Total Amount</span>

          <strong>
            ₹{" "}
            {order.totalAmount.toLocaleString(
              "en-IN"
            )}
          </strong>
        </div>

        <button
          className="view-order-btn"
          onClick={() =>
            navigate(`/orders/${order._id}`)
          }
        >
          View Details
          <FaArrowRight />
        </button>
      </div>
    </article>
  );
}

export default OrderCard;