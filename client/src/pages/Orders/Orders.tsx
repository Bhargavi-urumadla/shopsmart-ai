import { useEffect, useState } from "react";
import "./Orders.css";
import { getMyOrders } from "../../services/orderService";
import Loader from "../../components/Loader/Loader";
import EmptyState from "../../components/EmptyState/EmptyState";
import OrderCard from "../../components/Orders/OrderCard";
import { notify } from "../../utils/notify";

interface Product {
  _id: string;
  name: string;
  image: string;
}

interface OrderProduct {
  product: Product;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  products: OrderProduct[];
}

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await getMyOrders();

      setOrders(res.orders || []);
    } catch (error) {
      console.error(error);
      notify.error("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Loader
        size="medium"
        text="Loading orders..."
      />
    );
  }

  return (
    <div className="orders-container">

      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <EmptyState
          icon="📦"
          title="No Orders Yet"
          message="You haven't placed any orders yet."
          buttonText="Start Shopping"
          buttonLink="/products"
        />
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Orders;