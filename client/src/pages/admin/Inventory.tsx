import { useEffect, useMemo, useState } from "react";
import "./Inventory.css";

import InventoryHero from "../../components/admin/inventory/InventoryHero";
import InventoryToolbar from "../../components/admin/inventory/InventoryToolbar";
import InventoryTable from "../../components/admin/inventory/InventoryTable";
import UpdateStockModal from "../../components/admin/inventory/UpdateStockModal";

import {
  getInventory,
  updateStock,
} from "../../services/inventoryService";

export interface InventoryItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
}

const Inventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [selectedProduct, setSelectedProduct] =
    useState<InventoryItem | null>(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      setLoading(true);
      const data = await getInventory();
      setInventory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "low"
          ? item.stock > 0 && item.stock < 10
          : filter === "out"
          ? item.stock === 0
          : item.stock >= 10;

      return matchesSearch && matchesFilter;
    });
  }, [inventory, search, filter]);

  const stats = useMemo(() => {
    const totalProducts = inventory.length;

    const lowStock = inventory.filter(
      (item) => item.stock > 0 && item.stock < 10
    ).length;

    const outOfStock = inventory.filter(
      (item) => item.stock === 0
    ).length;

    const inventoryValue = inventory.reduce(
      (sum, item) => sum + item.price * item.stock,
      0
    );

    return {
      totalProducts,
      lowStock,
      outOfStock,
      inventoryValue,
    };
  }, [inventory]);

  const handleUpdateClick = (product: InventoryItem) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleSaveStock = async (
    quantity: number,
    note: string
  ) => {
    if (!selectedProduct) return;

    await updateStock(
      selectedProduct._id,
      quantity,
      note
    );

    setShowModal(false);

    loadInventory();
  };

  return (
    <div className="inventory-page">
      <InventoryHero stats={stats} />

      <InventoryToolbar
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      <InventoryTable
        loading={loading}
        inventory={filteredInventory}
        onUpdate={handleUpdateClick}
      />

      {showModal && selectedProduct && (
        <UpdateStockModal
          product={selectedProduct}
          onClose={() => setShowModal(false)}
          onSave={handleSaveStock}
        />
      )}
    </div>
  );
};

export default Inventory;