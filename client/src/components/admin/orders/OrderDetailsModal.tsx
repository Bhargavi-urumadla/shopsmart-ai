import "./OrderDetailsModal.css";
import { Modal, Button, Table } from "react-bootstrap";

interface Product {
  product?: {
    name?: string;
    image?: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  user?: {
    name?: string;
    email?: string;
  };
  products: Product[];
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  shippingAddress?: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  createdAt: string;
}

interface Props {
  show: boolean;
  onHide: () => void;
  order: Order | null;
}

const OrderDetailsModal = ({
  show,
  onHide,
  order,
}: Props) => {
  if (!order) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {/* Order Info */}

        <div className="details-grid">

          <div className="detail-card">
            <h5>Order Information</h5>

            <p>
              <strong>Order ID:</strong> {order._id}
            </p>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              {order.paymentMethod}
            </p>

            <p>
              <strong>Payment Status:</strong>{" "}
              {order.paymentStatus}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(
                order.createdAt
              ).toLocaleString()}
            </p>

          </div>

          {/* Customer */}

          <div className="detail-card">

            <h5>Customer</h5>

            <p>
              <strong>Name:</strong>{" "}
              {order.shippingAddress?.fullName ||
                order.user?.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {order.user?.email || "-"}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {order.shippingAddress?.phone}
            </p>

          </div>

        </div>

        {/* Address */}

        <div className="detail-card mt-4">

          <h5>Shipping Address</h5>

          <p>
            {order.shippingAddress?.address}
          </p>

          <p>
            {order.shippingAddress?.city},{" "}
            {order.shippingAddress?.state}
          </p>

          <p>
            {order.shippingAddress?.country} -{" "}
            {order.shippingAddress?.pincode}
          </p>

        </div>

        {/* Products */}

        <div className="mt-4">

          <h5>Products</h5>

          <Table
            bordered
            hover
            responsive
          >

            <thead>

              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>

            </thead>

            <tbody>

              {order.products.map((item, index) => (

                <tr key={index}>

                  <td>
                    {item.product?.name ||
                      "Product"}
                  </td>

                  <td>{item.quantity}</td>

                  <td>₹{item.price}</td>

                  <td>
                    ₹
                    {item.price *
                      item.quantity}
                  </td>

                </tr>

              ))}

            </tbody>

          </Table>

        </div>

        {/* Summary */}

        <div className="summary-box">

          <h4>
            Grand Total :
            ₹{order.totalAmount.toLocaleString()}
          </h4>

        </div>

      </Modal.Body>

      <Modal.Footer>

        <Button
          variant="secondary"
          onClick={onHide}
        >
          Close
        </Button>

      </Modal.Footer>

    </Modal>
  );
};

export default OrderDetailsModal;