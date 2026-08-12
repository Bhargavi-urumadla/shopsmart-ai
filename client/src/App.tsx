import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

// Public/User Pages
import Landing from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout/Checkout";
import AIAssistant from "./pages/AIAssistant";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import Orders from "./pages/Orders/Orders";
import OrderDetails from "./pages/OrderDetails/OrderDetails";

// User Layout
import Layout from "./components/layout/Layout";

// Admin Layout
import AdminLayout from "./components/admin/layout/AdminLayout";

// Admin Pages
import DashboardAdmin from "./pages/admin/Dashboard";
import ProductsAdmin from "./pages/admin/Products";
import OrdersAdmin from "./pages/admin/Orders";
import Customers from "./pages/admin/Customers";
import Categories from "./pages/admin/Categories";
import Inventory from "./pages/admin/Inventory";
import Analytics from "./pages/admin/Analytics";
import AIInsights from "./pages/admin/AIInsights";
import Settings from "./pages/admin/Settings";
import Profile from "./pages/admin/Profile";

// Admin Route Protection
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <Routes>
      {/* =====================================================
          PUBLIC ROUTES
      ===================================================== */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* =====================================================
          ADMIN ROUTES
          
          ProtectedAdminRoute checks:
          - token exists
          - user exists
          - user.role === "admin"
      ===================================================== */}

      <Route element={<ProtectedAdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>

          {/* Admin Dashboard */}
          <Route
            index
            element={<DashboardAdmin />}
          />

          {/* Admin Products */}
          <Route
            path="products"
            element={<ProductsAdmin />}
          />

          {/* Admin Orders */}
          <Route
            path="orders"
            element={<OrdersAdmin />}
          />

          {/* Admin Customers */}
          <Route
            path="customers"
            element={<Customers />}
          />

          {/* Admin Categories */}
          <Route
            path="categories"
            element={<Categories />}
          />

          {/* Admin Inventory */}
          <Route
            path="inventory"
            element={<Inventory />}
          />

          {/* Admin Analytics */}
          <Route
            path="analytics"
            element={<Analytics />}
          />

          {/* Admin AI Insights */}
          <Route
            path="ai-insights"
            element={<AIInsights />}
          />

          {/* Admin Settings */}
          <Route
            path="settings"
            element={<Settings />}
          />

          {/* Admin Profile */}
          <Route
            path="profile"
            element={<Profile />}
          />

        </Route>
      </Route>

      {/* =====================================================
          USER ROUTES
          
          Normal logged-in users use this layout.
      ===================================================== */}

      <Route element={<Layout />}>

        {/* Home */}
        <Route
          path="/"
          element={<Landing />}
        />

        {/* User Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Products */}
        <Route
          path="/products"
          element={<Products />}
        />

        {/* Product Details */}
        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        {/* Wishlist */}
        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* Orders */}
        <Route
          path="/orders"
          element={<Orders />}
        />

        {/* Order Details */}
        <Route
          path="/orders/:id"
          element={<OrderDetails />}
        />

      </Route>

      {/* =====================================================
          OTHER USER ROUTES
      ===================================================== */}

      <Route
        path="/checkout"
        element={<Checkout />}
      />

      <Route
        path="/order-success"
        element={<OrderSuccess />}
      />

      <Route
        path="/ai-assistant"
        element={<AIAssistant />}
      />

    </Routes>
  );
}

export default App;