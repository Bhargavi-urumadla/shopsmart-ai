import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});
// ===============================
// Request Interceptor
// ===============================
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("========== API REQUEST ==========");
    console.log("Current Token:", token);

    if (
      token &&
      token !== "null" &&
      token !== "undefined"
    ) {
      config.headers.Authorization = `Bearer ${token}`;

      console.log(
        "Authorization Header:",
        config.headers.Authorization
      );
    } else {
      delete config.headers.Authorization;

      console.log(
        "No valid token found in localStorage."
      );
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ===============================
// Response Interceptor
// ===============================
API.interceptors.response.use(
  (response) => response,

  (error) => {
    console.log("========== API ERROR ==========");

    console.log("Status:", error.response?.status);

    console.log(
      "Response:",
      error.response?.data
    );

    // Only clear login if token is actually invalid
    if (
      error.response?.status === 401 &&
      (
        error.response?.data?.message?.includes("expired") ||
        error.response?.data?.message?.includes("Invalid authentication token") ||
        error.response?.data?.message?.includes("No token")
      )
    ) {
      console.log("Removing invalid token...");

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);

export default API;