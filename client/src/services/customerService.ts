import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getCustomers = async () => {
  const res = await axios.get(
    `${API}/admin/customers`,
    authConfig()
  );

  return res.data.data;
};

export const getCustomerById = async (id: string) => {
  const res = await axios.get(
    `${API}/admin/customers/${id}`,
    authConfig()
  );

  return res.data.data;
};

export const toggleBlockCustomer = async (id: string) => {
  const res = await axios.patch(
    `${API}/admin/customers/${id}/block`,
    {},
    authConfig()
  );

  return res.data.data;
};

export const deleteCustomer = async (id: string) => {
  const res = await axios.delete(
    `${API}/admin/customers/${id}`,
    authConfig()
  );

  return res.data;
};