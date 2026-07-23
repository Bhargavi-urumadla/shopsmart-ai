import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OrderDetails.css";
import { getOrderById } from "../../services/orderService";
import Loader from "../../components/Loader/Loader";
import { notify } from "../../utils/notify";
import {
  cancelOrder,
} from "../../services/orderService";
function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const handleCancelOrder = async () => {
  try {
    await cancelOrder(id!);

    notify.success("Order cancelled successfully.");

    fetchOrder(); // Refresh the order details
  } catch (error: any) {
    notify.error(
      error?.response?.data?.message ||
      "Failed to cancel order."
    );
  }
};

  const fetchOrder = async () => {
    try {
      setLoading(true);

      const res = await getOrderById(id!);

      setOrder(res.order);
    } catch (error) {
      console.error(error);
      notify.error("Unable to load order.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Loader
        size="medium"
        text="Loading order..."
      />
    );
  }

  if (!order) {
    return <h2>Order not found.</h2>;
  }

  return (
    <div className="order-details-container">

      <h1>Order Details</h1>

      <div className="details-card">

        <h2>
  Status:
  <span className={`status ${order.status.toLowerCase()}`}>
    {order.status}
  </span>
</h2>

        <p>
          <strong>Payment:</strong>{" "}
          {order.paymentMethod}
        </p>

        <p>
          <strong>Total:</strong> 
          ₹ {order.totalAmount.toLocaleString("en-IN")}
        </p>

        <hr />

        <h3>Shipping Address</h3>

        <p>{order.shippingAddress.fullName}</p>
        <p>{order.shippingAddress.phone}</p>
        <p>{order.shippingAddress.address}</p>
        <p>
          {order.shippingAddress.city},{" "}
          {order.shippingAddress.state}
        </p>
        <p>{order.shippingAddress.pincode}</p>

        <hr />

        <h3>Products</h3>

        {order.products.map((item: any) => (
          <div
            key={item.product._id}
            className="product-row"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
            />

            <div>
              <h4>{item.product.name}</h4>

              <p>Qty: {item.quantity}</p>

              <p>₹ {item.price.toLocaleString("en-IN")}</p>
            </div>
          
          </div>
        ))}
{order.status !== "Delivered" &&
 order.status !== "Cancelled" && (
  <button
  className="cancel-btn"
  onClick={handleCancelOrder}
>
  Cancel Order
</button>
)}
      </div>

    </div>
  );
}

export default OrderDetails;