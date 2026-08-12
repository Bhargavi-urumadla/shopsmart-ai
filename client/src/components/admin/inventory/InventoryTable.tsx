import "./InventoryTable.css";
import { FaBoxOpen, FaEdit } from "react-icons/fa";
import type { InventoryItem } from "../../../pages/admin/Inventory";

interface InventoryTableProps {
  inventory: InventoryItem[];
  loading: boolean;
  onUpdate: (product: InventoryItem) => void;
}

const InventoryTable = ({
  inventory,
  loading,
  onUpdate,
}: InventoryTableProps) => {
  if (loading) {
    return (
      <div className="inventory-loading">
        Loading inventory...
      </div>
    );
  }

  if (inventory.length === 0) {
    return (
      <div className="no-inventory">
        No inventory found.
      </div>
    );
  }

  return (
    <div className="inventory-table-container">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Inventory Value</th>
            <th>Status</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {inventory.map((item) => {
            const value = item.price * item.stock;

            let status = "In Stock";
            let statusClass = "instock";

            if (item.stock === 0) {
              status = "Out of Stock";
              statusClass = "out";
            } else if (item.stock < 10) {
              status = "Low Stock";
              statusClass = "low";
            }

            return (
              <tr key={item._id}>
                <td>
                  <div className="inventory-product">
                    <div className="inventory-avatar">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                        />
                      ) : (
                        <FaBoxOpen />
                      )}
                    </div>

                    <div>
                      <h4>{item.name}</h4>
                    </div>
                  </div>
                </td>

                <td>{item.category}</td>

                <td>₹{item.price.toLocaleString()}</td>

                <td>{item.stock}</td>

                <td>₹{value.toLocaleString()}</td>

                <td>
                  <span className={`stock-status ${statusClass}`}>
                    {status}
                  </span>
                </td>

                <td style={{ textAlign: "center" }}>
                  <button
                    className="update-stock-btn"
                    onClick={() => onUpdate(item)}
                  >
                    <FaEdit />
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;