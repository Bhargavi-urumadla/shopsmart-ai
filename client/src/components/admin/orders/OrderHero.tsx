import "./OrderHero.css";

import {
  FaShoppingBag,
  FaClock,
  FaTruck,
  FaRupeeSign,
} from "react-icons/fa";

interface Order {
  _id: string;
  status: string;
  totalAmount: number;
}

interface Props {
  orders: Order[];
}

const OrderHero = ({ orders }: Props) => {
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const shippedOrders = orders.filter(
    (order) =>
      order.status === "Shipped" ||
      order.status === "Delivered"
  ).length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  const cards = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <FaShoppingBag />,
      color: "#2563eb",
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: <FaClock />,
      color: "#f59e0b",
    },
    {
      title: "Shipped",
      value: shippedOrders,
      icon: <FaTruck />,
      color: "#10b981",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: <FaRupeeSign />,
      color: "#7c3aed",
    },
  ];

  return (
    <div className="order-hero">

      <div className="row g-4">

        {cards.map((card, index) => (
          <div className="col-lg-3 col-md-6" key={index}>
            <div className="order-card">

              <div
                className="order-icon"
                style={{ background: card.color }}
              >
                {card.icon}
              </div>

              <div className="order-content">
                <h6>{card.title}</h6>
                <h3>{card.value}</h3>
              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default OrderHero;