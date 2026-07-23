import "./RecentOrders.css";

const orders = [
  {
    id: "#ORD-1001",
    customer: "Bhargavi",
    product: "Apple Watch",
    amount: "₹24,999",
    status: "Delivered",
    date: "Today",
  },
  {
    id: "#ORD-1002",
    customer: "Rahul",
    product: "Sony Headphones",
    amount: "₹8,499",
    status: "Processing",
    date: "Today",
  },
  {
    id: "#ORD-1003",
    customer: "Sneha",
    product: "Nike Shoes",
    amount: "₹5,999",
    status: "Shipped",
    date: "Yesterday",
  },
  {
    id: "#ORD-1004",
    customer: "Kiran",
    product: "Laptop Bag",
    amount: "₹2,199",
    status: "Cancelled",
    date: "Yesterday",
  },
];

const RecentOrders = () => {
  return (
    <div className="orders-card">

      <div className="orders-header">
        <h2>Recent Orders</h2>

        <button>View All</button>
      </div>

      <table className="orders-table">

        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((order) => (
            <tr key={order.id}>

              <td>{order.id}</td>

              <td>{order.customer}</td>

              <td>{order.product}</td>

              <td>{order.amount}</td>

              <td>
                <span
                  className={`status ${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>
              </td>

              <td>{order.date}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default RecentOrders;