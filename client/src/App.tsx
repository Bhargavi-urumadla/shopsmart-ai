import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";

import Layout from "./components/layout/Layout";
import AIAssistant from "./pages/AIAssistant";
function App() {
  return (
    <Routes>
      {/* Public Routes - No Navbar */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Shared Layout - Navbar appears on all routes below */}
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />

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
      <Route
  path="/ai-assistant"
  element={<AIAssistant />}
/>
    </Routes>
  );
}

export default App;