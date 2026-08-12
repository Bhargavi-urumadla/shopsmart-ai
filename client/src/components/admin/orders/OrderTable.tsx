import "./OrderTable.css";

import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

interface Order {
  _id: string;
  user?: {
    name?: string;
    email?: string;
  };
  shippingAddress?: {
    fullName?: string;
  };
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  createdAt: string;
}

interface Props {
  orders: Order[];
  loading: boolean;
  onView: (order: Order) => void;
  onStatus: (order: Order) => void;
  onDelete: (id: string) => void;
}

const OrderTable = ({
  orders,
  loading,
  onView,
  onStatus,
  onDelete,
}: Props) => {
  if (loading) {
    return (
      <div className="order-table-loading">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="order-table-container">

      <table className="order-table">

        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Payment Status</th>
            <th>Status</th>
            <th>Date</th>
            <th width="180">Actions</th>
          </tr>
        </thead>

        <tbody>

          {orders.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="no-orders"
              >
                No Orders Found
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>

                <td>
                  {order._id.slice(0, 10)}...
                </td>

                <td>
                  {order.shippingAddress?.fullName ||
                    order.user?.name ||
                    "N/A"}
                </td>

                <td>
                  ₹{order.totalAmount.toLocaleString()}
                </td>

                <td>{order.paymentMethod}</td>

                <td>
                  <span
                    className={`payment-badge ${order.paymentStatus.toLowerCase()}`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>

                <td>
                  <span
                    className={`status-badge ${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>

                  <button
                    className="action-btn view"
                    onClick={() => onView(order)}
                    title="View Order"
                  >
                    <FaEye />
                  </button>

                  <button
                    className="action-btn edit"
                    onClick={() => onStatus(order)}
                    title="Update Status"
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="action-btn delete"
                    onClick={() => onDelete(order._id)}
                    title="Delete Order"
                  >
                    <FaTrash />
                  </button>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
};

export default OrderTable;