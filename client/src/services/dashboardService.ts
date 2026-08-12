import API from "../api/api";

export const getSalesOverview = async () => {
  const { data } = await API.get("/admin/sales/overview");
  return data.data;
};

export const getMonthlySales = async () => {
  const { data } = await API.get("/admin/sales/monthly");
  return data.data;
};

export const getRecentOrders = async () => {
  const { data } = await API.get("/admin/orders");

  console.log("Orders API Response:", data);

  // Backend returns { success, count, data }
  return data.data || [];
};

export const getAIInsights = async () => {
  const { data } = await API.get("/admin-ai/dashboard");
  return data.data;
};