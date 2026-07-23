import API from "../api/api";

// ======================
// Place Order
// ======================

export const placeOrder = async (
  shippingAddress: any,
  paymentMethod: string
) => {
  const response = await API.post("/orders", {
    shippingAddress,
    paymentMethod,
  });

  return response.data;
};

// ======================
// Get My Orders
// ======================

export const getMyOrders = async () => {
  const response = await API.get("/orders/my-orders");
  return response.data;
};

// ======================
// Get Order Details
// ======================

export const getOrderById = async (id: string) => {
  const response = await API.get(`/orders/${id}`);
  return response.data;
};

// ======================
// Cancel Order
// ======================

export const cancelOrder = async (id: string) => {
  const response = await API.put(`/orders/${id}/cancel`);
  return response.data;
};