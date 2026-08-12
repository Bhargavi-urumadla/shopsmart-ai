import { useEffect, useState } from "react";
import "./UpdateStockModal.css";
import type { InventoryItem } from "../../../pages/admin/Inventory";

interface UpdateStockModalProps {
  product: InventoryItem;
  onClose: () => void;
  onSave: (quantity: number, note: string) => void;
}

const UpdateStockModal = ({
  product,
  onClose,
  onSave,
}: UpdateStockModalProps) => {
  const [quantity, setQuantity] = useState(product.stock);
  const [note, setNote] = useState("");

  useEffect(() => {
    setQuantity(product.stock);
  }, [product]);

  const handleSubmit = () => {
    if (quantity < 0) {
      alert("Stock cannot be negative.");
      return;
    }

    onSave(quantity, note);
  };

  return (
    <div
      className="inventory-modal-overlay"
      onClick={onClose}
    >
      <div
        className="inventory-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="inventory-modal-header">
          <h2>Update Stock</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="inventory-modal-body">

          <div className="product-info">
            <h3>{product.name}</h3>

            <p>
              <strong>Category:</strong> {product.category}
            </p>

            <p>
              <strong>Current Stock:</strong> {product.stock}
            </p>

            <p>
              <strong>Price:</strong> ₹
              {product.price.toLocaleString()}
            </p>
          </div>

          <div className="form-group">
            <label>New Stock Quantity</label>

            <input
              type="number"
              min={0}
              value={quantity}
              onChange={(e) =>
                setQuantity(Number(e.target.value))
              }
            />
          </div>

          <div className="form-group">
            <label>Note (Optional)</label>

            <textarea
              rows={4}
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
              placeholder="Reason for updating stock..."
            />
          </div>

        </div>

        <div className="inventory-modal-footer">
          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default UpdateStockModal;