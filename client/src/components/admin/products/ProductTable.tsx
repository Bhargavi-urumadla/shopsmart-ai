import "./ProductTable.css";
import {
  FiEdit2,
  FiTrash2,
  FiStar,
  FiTrash,
} from "react-icons/fi";

import type { Product } from "../../../services/productService";

import Loader from "../../Loader/Loader";
import ProductSkeleton from "../../Skeleton/ProductSkeleton";

interface Props {
  products: Product[];
  loading?: boolean;
  deletingId?: string | null;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
}

const ProductTable = ({
  products,
  loading = false,
  deletingId,
  onEdit,
  onDelete,
}: Props) => {
  if (loading) {
    return <ProductSkeleton count={6} />;
  }

  if (products.length === 0) {
    return (
      <div className="empty-products">
        <h2>No Products Found</h2>
        <p>Add your first product.</p>
      </div>
    );
  }

  return (
    <div className="product-table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Rating</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <div className="product-info">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/80x80?text=No+Image";
                    }}
                  />

                  <div>
                    <h4>{product.name}</h4>
                    <p>{product.productType}</p>
                  </div>
                </div>
              </td>

              <td>{product.category}</td>

              <td>{product.brand || "-"}</td>

              <td>₹{product.price}</td>

              <td>
                <span
                  className={`badge ${
                    product.stock > 50
                      ? "green"
                      : product.stock > 10
                      ? "orange"
                      : "red"
                  }`}
                >
                  {product.stock}
                </span>
              </td>

              <td>
                <div className="rating">
                  <FiStar />
                  {product.rating}
                </div>
              </td>

              <td>
                <span
                  className={`status ${
                    product.isActive
                      ? "active"
                      : "inactive"
                  }`}
                >
                  {product.isActive
                    ? "Active"
                    : "Inactive"}
                </span>
              </td>

              <td>
                <div className="actions">

                  <button
                    className="edit-btn"
                    onClick={() => onEdit?.(product)}
                  >
                    <FiEdit2 />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete?.(product._id)}
                    disabled={deletingId === product._id}
                  >
                    {deletingId === product._id ? (
                      <Loader
                        size="small"
                        text=""
                      />
                    ) : (
                      <FiTrash />
                    )}
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;