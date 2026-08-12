import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./UpdateStatusModal.css";

import { updateOrderStatus } from "../../../services/adminOrderService";

interface Order {
  _id: string;
  status: string;
}

interface Props {
  show: boolean;
  onHide: () => void;
  order: Order | null;
  onSuccess: () => void;
}

const UpdateStatusModal = ({
  show,
  onHide,
  order,
  onSuccess,
}: Props) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  const handleUpdate = async () => {
    if (!order) return;

    try {
      await updateOrderStatus(order._id, status);

      onSuccess();
      onHide();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Order Status</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Form.Group>

          <Form.Label>
            Select Status
          </Form.Label>

          <Form.Select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option value="Pending">
              Pending
            </option>

            <option value="Processing">
              Processing
            </option>

            <option value="Shipped">
              Shipped
            </option>

            <option value="Delivered">
              Delivered
            </option>

            <option value="Cancelled">
              Cancelled
            </option>

          </Form.Select>

        </Form.Group>

      </Modal.Body>

      <Modal.Footer>

        <Button
          variant="secondary"
          onClick={onHide}
        >
          Cancel
        </Button>

        <Button
          variant="primary"
          onClick={handleUpdate}
        >
          Update Status
        </Button>

      </Modal.Footer>
    </Modal>
  );
};

export default UpdateStatusModal;