import API from "../api/api";

// Get All Orders
export const getAllOrders = async () => {
  const { data } = await API.get("/orders");
  return data;
};

// Get Single Order
export const getOrderById = async (id: string) => {
  const { data } = await API.get(`/orders/${id}`);
  return data;
};

// Update Status
export const updateOrderStatus = async (
  id: string,
  status: string
) => {
  const { data } = await API.put(`/orders/${id}/status`, {
    status,
  });

  return data;
};

// Delete Order
export const deleteOrder = async (id: string) => {
  const { data } = await API.delete(`/orders/${id}`);
  return data;
};