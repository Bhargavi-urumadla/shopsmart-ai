import "./CustomerDetailsModal.css";

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  isBlocked: boolean;
  createdAt: string;
  orders?: number;
  totalSpent?: number;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
  };
}

interface Props {
  show: boolean;
  customer: Customer | null;
  onHide: () => void;
}

const CustomerDetailsModal = ({
  show,
  customer,
  onHide,
}: Props) => {
  if (!show || !customer) return null;

  return (
    <div className="customer-modal-overlay">
      <div className="customer-modal">

        <div className="customer-modal-header">
          <h2>Customer Details</h2>

          <button
            className="close-btn"
            onClick={onHide}
          >
            ✕
          </button>
        </div>

        <div className="customer-modal-body">

          <div className="details-grid">

            <div className="detail-card">
              <h4>Personal Information</h4>

              <p>
                <strong>Name:</strong>{" "}
                {customer.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {customer.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {customer.phone || "-"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    customer.isBlocked
                      ? "blocked-text"
                      : "active-text"
                  }
                >
                  {customer.isBlocked
                    ? "Blocked"
                    : "Active"}
                </span>
              </p>

            </div>

            <div className="detail-card">

              <h4>Statistics</h4>

              <p>
                <strong>Total Orders:</strong>{" "}
                {customer.orders || 0}
              </p>

              <p>
                <strong>Total Spent:</strong> ₹
                {(customer.totalSpent || 0).toLocaleString()}
              </p>

              <p>
                <strong>Joined:</strong>{" "}
                {new Date(
                  customer.createdAt
                ).toLocaleDateString()}
              </p>

            </div>

          </div>

          <div className="detail-card address-card">

            <h4>Address</h4>

            <p>
              {customer.address?.street || "-"}
            </p>

            <p>
              {customer.address?.city || "-"},{" "}
              {customer.address?.state || "-"}
            </p>

            <p>
              {customer.address?.country || "-"}{" "}
              {customer.address?.pincode || ""}
            </p>

          </div>

        </div>

        <div className="customer-modal-footer">

          <button
            className="close-button"
            onClick={onHide}
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
};

export default CustomerDetailsModal;