import { useNavigate } from "react-router-dom";
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
  return (
    <div className="order-card">
      <h3>📦 Order</h3>

      <p>
        <strong>Date:</strong>{" "}
        {new Date(order.createdAt).toLocaleDateString()}
      </p>

      <p>
        <strong>Status:</strong> {order.status}
      </p>

      <p>
        <strong>Payment:</strong> {order.paymentMethod}
      </p>

      <p>
        <strong>Products:</strong> {order.products.length}
      </p>

     ₹ {order.totalAmount.toLocaleString("en-IN")}

      <button
  onClick={() => navigate(`/orders/${order._id}`)}
>
  View Details
</button>
    </div>
  );
}

export default OrderCard;