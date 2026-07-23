import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Landing from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Layout from "./components/layout/Layout";
import AIAssistant from "./pages/AIAssistant";
import { useEffect } from "react";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import Orders from "./pages/Orders/Orders";
import OrderDetails from "./pages/OrderDetails/OrderDetails"; 
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
      {/* Public Routes - No Navbar */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      {/* ================= ADMIN ROUTES ================= */}

<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<DashboardAdmin />} />

  <Route
    path="products"
    element={<ProductsAdmin />}
  />

  <Route
    path="orders"
    element={<OrdersAdmin />}
  />

  <Route
    path="customers"
    element={<Customers />}
  />

  <Route
    path="categories"
    element={<Categories />}
  />

  <Route
    path="inventory"
    element={<Inventory />}
  />

  <Route
    path="analytics"
    element={<Analytics />}
  />

  <Route
    path="ai-insights"
    element={<AIInsights />}
  />

  <Route
    path="settings"
    element={<Settings />}
  />

  <Route
    path="profile"
    element={<Profile />}
  />
</Route>

      {/* Shared Layout - Navbar appears on all routes below */}
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />

        <Route
  path="/orders/:id"
  element={<OrderDetails />}
/>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />
      </Route>
      <Route path="/checkout" element={<Checkout />} />

<Route
  path="/order-success"
  element={<OrderSuccess />}
/>

<Route
  path="/orders"
  element={<Orders />}
/>

      <Route
  path="/ai-assistant"
  element={<AIAssistant />}
/>
    </Routes>
  );
}

export default App;