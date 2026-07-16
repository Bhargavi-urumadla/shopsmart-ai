import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

// Save JWT Token
localStorage.setItem("token", res.data.token);

// Save logged-in user details
localStorage.setItem("user", JSON.stringify(res.data.user));

alert("Login Successful");

// Navigate to Home
navigate("/dashboard");

    } catch (error: any) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

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

          <button className="login-btn">

            Login

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