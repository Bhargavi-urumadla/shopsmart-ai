import axios from "axios";

const API =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Get Inventory
export const getInventory = async () => {
  const res = await axios.get(
    `${API}/inventory`,
    authConfig()
  );

  return res.data.data;
};

// Get Low Stock
export const getLowStock = async () => {
  const res = await axios.get(
    `${API}/inventory/low-stock`,
    authConfig()
  );

  return res.data.data;
};

// Get Out Of Stock
export const getOutOfStock = async () => {
  const res = await axios.get(
    `${API}/inventory/out-of-stock`,
    authConfig()
  );

  return res.data.data;
};

// Update Stock
export const updateStock = async (
  id: string,
  quantity: number,
  note = ""
) => {
  const res = await axios.patch(
    `${API}/inventory/${id}`,
    {
      quantity,
      note,
    },
    authConfig()
  );

  return res.data.data;
};

// Restock Product
export const restockProduct = async (
  productId: string,
  quantity: number,
  note = ""
) => {
  const res = await axios.post(
    `${API}/inventory/restock`,
    {
      productId,
      quantity,
      note,
    },
    authConfig()
  );

  return res.data.data;
};

// Inventory History
export const getInventoryHistory = async (id: string) => {
  const res = await axios.get(
    `${API}/inventory/history/${id}`,
    authConfig()
  );

  return res.data.data;
};