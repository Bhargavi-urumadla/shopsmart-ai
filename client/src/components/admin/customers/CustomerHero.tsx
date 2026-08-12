import "./CustomerHero.css";

import {
  FaUsers,
  FaUserCheck,
  FaUserSlash,
  FaRupeeSign,
} from "react-icons/fa";

interface Customer {
  _id: string;
  isBlocked: boolean;
  totalSpent?: number;
}

interface Props {
  customers: Customer[];
}

const CustomerHero = ({ customers }: Props) => {
  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => !customer.isBlocked
  ).length;

  const blockedCustomers = customers.filter(
    (customer) => customer.isBlocked
  ).length;

  const totalRevenue = customers.reduce(
    (sum, customer) => sum + (customer.totalSpent || 0),
    0
  );

  const cards = [
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: <FaUsers />,
      color: "#2563eb",
    },
    {
      title: "Active",
      value: activeCustomers,
      icon: <FaUserCheck />,
      color: "#10b981",
    },
    {
      title: "Blocked",
      value: blockedCustomers,
      icon: <FaUserSlash />,
      color: "#ef4444",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: <FaRupeeSign />,
      color: "#7c3aed",
    },
  ];

  return (
    <div className="customer-hero">
      <div className="row g-4">
        {cards.map((card, index) => (
          <div className="col-lg-3 col-md-6" key={index}>
            <div className="customer-card">
              <div
                className="customer-icon"
                style={{ background: card.color }}
              >
                {card.icon}
              </div>

              <div className="customer-content">
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

export default CustomerHero;