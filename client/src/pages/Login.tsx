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
  // VERY IMPORTANT:
  // Prevent the form from refreshing the browser
  e.preventDefault();

  // Prevent multiple clicks
  if (loading) return;

  // Start small button loader
  setLoading(true);

  try {
    console.log("Login started");

    const res = await API.post("/auth/login", formData);

    console.log("Login response:", res.data);

    // Save JWT token
    localStorage.setItem("token", res.data.token);

    // Save user
    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    console.log(
      "Token saved:",
      localStorage.getItem("token")
    );

    notify.success("Login successful");

    // Go to dashboard
    navigate("/dashboard");
  } catch (error: any) {
    console.error("Login error:", error);

    notify.error(
      error.response?.data?.message ||
        "Something went wrong. Please try again."
    );
  } finally {
    setLoading(false);
  }
};;

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>🛍 ShopSmart AI</h1>

        <p>Welcome Back</p>

        <form onSubmit={handleSubmit}>

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

        <div className="bottom-text">

          Don't have an account?

          <Link to="/register"> Register</Link>

        </div>

      </div>

    </div>
  );
}

export default Login;