import API from "../api/api";

export const getDashboardInsights = async () => {
  const response = await API.get("/admin-ai/dashboard");
  return response.data;
};