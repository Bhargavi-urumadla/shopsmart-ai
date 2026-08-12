import { useEffect, useState } from "react";
import "./AddProductModal.css";
import { FiX } from "react-icons/fi";

import {
  addProduct,
  updateProduct,
} from "../../../services/productService";

import type { Product } from "../../../services/productService";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: Product | null;
}

const AddProductModal = ({
  open,
  onClose,
  onSuccess,
  product,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Mobile",
    productType: "",
    brand: "",
    price: 0,
    image: "",
    stock: 0,

    battery: "",
    camera: "",
    display: "",
    processor: "",
    ram: "",
    storage: "",
    color: "",
    weight: "",

    tags: "",

    isFeatured: false,
    isActive: true,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "Mobile",
        productType: product.productType || "",
        brand: product.brand || "",
        price: product.price || 0,
        image: product.image || "",
        stock: product.stock || 0,

        battery: (product as any).battery || "",
        camera: (product as any).camera || "",
        display: (product as any).display || "",
        processor: (product as any).processor || "",
        ram: (product as any).ram || "",
        storage: (product as any).storage || "",
        color: (product as any).color || "",
        weight: (product as any).weight || "",

        tags: Array.isArray((product as any).tags)
          ? (product as any).tags.join(", ")
          : "",

        isFeatured: product.isFeatured,
        isActive: product.isActive,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        category: "Mobile",
        productType: "",
        brand: "",
        price: 0,
        image: "",
        stock: 0,

        battery: "",
        camera: "",
        display: "",
        processor: "",
        ram: "",
        storage: "",
        color: "",
        weight: "",

        tags: "",

        isFeatured: false,
        isActive: true,
      });
    }
  }, [product, open]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      if (product) {
        await updateProduct(product._id, payload);
      } else {
        await addProduct(payload);
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="add-product-modal">
        <div className="modal-header">
          <h2>
            {product ? "Edit Product" : "Add New Product"}
          </h2>

          <button onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-grid">

            <div className="form-group">
              <label>Product Name</label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="iPhone 16 Pro"
              />
            </div>

            <div className="form-group">
              <label>Brand</label>

              <input
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Apple"
              />
            </div>

            <div className="form-group">
              <label>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option>Mobile</option>
                <option>Laptop</option>
                <option>Accessories</option>
                <option>TV</option>
                <option>Audio</option>
              </select>
            </div>

            <div className="form-group">
              <label>Product Type</label>

              <input
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                placeholder="Phone"
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>

              <textarea
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Price</label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Stock</label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Image URL</label>

              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

          </div>
        </div>

        <div className="modal-footer">
          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : product
              ? "Update Product"
              : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;