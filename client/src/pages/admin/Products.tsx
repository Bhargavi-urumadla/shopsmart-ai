import { useEffect, useState } from "react";

import "./Products.css";

import ProductHero from "../../components/admin/products/ProductHero";
import ProductToolbar from "../../components/admin/products/ProductToolbar";
import ProductTable from "../../components/admin/products/ProductTable";
import AddProductModal from "../../components/admin/products/AddProductModal";

import {
  getProducts,
  deleteProduct,
} from "../../services/productService";

import type { Product } from "../../services/productService";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [openModal, setOpenModal] = useState(false);

  // Selected product for editing
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  // ===========================
  // Load Products
  // ===========================

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts(
        1,
        search,
        category
      );

      setProducts(response.products);
      setTotalProducts(
        response.pagination.totalProducts
      );
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  // ===========================
  // Delete Product
  // ===========================

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await deleteProduct(id);

      await loadProducts();
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setDeletingId(null);
    }
  };

  // ===========================
  // Edit Product
  // ===========================

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  // ===========================
  // Add Product
  // ===========================

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setOpenModal(true);
  };

  return (
    <div className="products-page">

      <ProductHero
        totalProducts={totalProducts}
      />

      <ProductToolbar
        search={search}
        category={category}
        onSearch={setSearch}
        onCategory={setCategory}
        onAdd={handleAddProduct}
      />

      <ProductTable
        products={products}
        loading={loading}
        deletingId={deletingId}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <AddProductModal
  open={openModal}
  product={selectedProduct}
  onClose={() => {
    setOpenModal(false);
    setSelectedProduct(null);
  }}
  onSuccess={() => {
    loadProducts();
    setOpenModal(false);
    setSelectedProduct(null);
  }}
/>

    </div>
  );
};

export default Products;