import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Login.css";
import { notify } from "../utils/notify";
import Loader from "../components/Loader/Loader";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    // Prevent the form from refreshing the browser
    e.preventDefault();

    // Prevent multiple clicks
    if (loading) return;

    // Start loader
    setLoading(true);

    try {
      console.log("Login started");

      // ===============================
      // LOGIN API
      // ===============================
      const res = await API.post("/auth/login", formData);
      console.log("========== LOGIN DEBUG ==========");
console.log("Login response:", res.data);
console.log("Logged-in user:", res.data.user);
console.log("Logged-in email:", res.data.user?.email);
console.log("Logged-in role:", res.data.user?.role);
console.log("=================================");

      console.log("Login response:", res.data);

      // ===============================
      // SAVE JWT TOKEN
      // ===============================
   // Clear previous login first
localStorage.removeItem("token");
localStorage.removeItem("user");

// Save new JWT token
localStorage.setItem("token", res.data.token);

// Save new logged-in user
localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

      console.log(
        "Token saved:",
        localStorage.getItem("token")
      );

      // ===============================
      // GET LOGGED-IN USER
      // ===============================
      const user = res.data.user;

      console.log("Authenticated User:", user);
      console.log("User Role:", user?.role);

      notify.success("Login successful");

      // ===============================
      // ROLE-BASED REDIRECTION
      // ===============================
if (user?.role?.toLowerCase() === "admin") {
  console.log("Admin login detected");
  navigate("/admin", { replace: true });
} else {
  console.log("Normal user login detected");
  navigate("/", { replace: true });
}

    } catch (error: any) {
      console.error("Login error:", error);

      notify.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>🛍 ShopSmart AI</h1>

        <p>Welcome Back</p>

        <form onSubmit={handleSubmit}>

          {/* ===============================
              EMAIL
          =============================== */}
          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          {/* ===============================
              PASSWORD
          =============================== */}
          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

          {/* ===============================
              LOGIN BUTTON
          =============================== */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? (
              <Loader
                size="small"
                text="Logging in..."
              />
            ) : (
              "Login"
            )}
          </button>

        </form>

        {/* ===============================
            REGISTER
        =============================== */}
        <div className="bottom-text">

          Don't have an account?

          <Link to="/register">
            {" "}Register
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;