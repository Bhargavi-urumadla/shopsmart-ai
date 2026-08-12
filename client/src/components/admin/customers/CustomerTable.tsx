import "./CustomerTable.css";

import {
  FaEye,
  FaBan,
  FaCheckCircle,
  FaTrash,
  FaUserCircle,
} from "react-icons/fa";

// interface Customer {
//   _id: string;
//   name: string;
//   email: string;
//   phone?: string;
//   isBlocked: boolean;
//   orders?: number;
//   totalSpent?: number;
// }
import type { Customer } from "../../../types/admin";

interface Props {
  customers: Customer[];
  loading: boolean;
  onView: (customer: Customer) => void;
  onBlock: (id: string) => void;
  onDelete: (id: string) => void;
}

const CustomerTable = ({
  customers,
  loading,
  onView,
  onBlock,
  onDelete,
}: Props) => {
  if (loading) {
    return (
      <div className="customer-loading">
        Loading customers...
      </div>
    );
  }

  return (
    <div className="customer-table-container">

      <table className="customer-table">

        <thead>
          <tr>
            <th>Customer</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Orders</th>
            <th>Total Spent</th>
            <th>Status</th>
            <th style={{ width: "180px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>

          {customers.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="no-customers"
              >
                No Customers Found
              </td>
            </tr>
          ) : (
            customers.map((customer) => (
              <tr key={customer._id}>

                <td>

                  <div className="customer-info">

                    <FaUserCircle className="avatar" />

                    <span>{customer.name}</span>

                  </div>

                </td>

                <td>{customer.email}</td>

                <td>{customer.phone || "-"}</td>

                <td>{customer.orders || 0}</td>

                <td>
                  ₹
                  {(customer.totalSpent || 0).toLocaleString()}
                </td>

                <td>

                  <span
                    className={
                      customer.isBlocked
                        ? "status blocked"
                        : "status active"
                    }
                  >
                    {customer.isBlocked
                      ? "Blocked"
                      : "Active"}
                  </span>

                </td>

                <td>

                  <button
                    className="action-btn view"
                    onClick={() => onView(customer)}
                    title="View Customer"
                  >
                    <FaEye />
                  </button>

                  <button
                    className={
                      customer.isBlocked
                        ? "action-btn unblock"
                        : "action-btn block"
                    }
                    onClick={() =>
                      onBlock(customer._id)
                    }
                    title={
                      customer.isBlocked
                        ? "Unblock"
                        : "Block"
                    }
                  >
                    {customer.isBlocked ? (
                      <FaCheckCircle />
                    ) : (
                      <FaBan />
                    )}
                  </button>

                  <button
                    className="action-btn delete"
                    onClick={() =>
                      onDelete(customer._id)
                    }
                    title="Delete Customer"
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

export default CustomerTable;