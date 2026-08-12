import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaHeart,
  FaShoppingCart,
  FaUndo,
  FaUser,
  FaMapMarkerAlt,
  FaCreditCard,
  FaStar,
  FaTicketAlt,
  FaBell,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaRobot,
  FaArrowRight,
  FaGift,
  FaSearch,
  FaCrown,
  FaTruck,
  FaShieldAlt,
  FaClock,
  FaFire,
  FaTags,
  FaChevronRight,
} from "react-icons/fa";
import {
  MdCategory,
  MdLocalOffer,
  MdTrendingUp,
  MdFavorite,
} from "react-icons/md";

import API from "../api/api";
import "./Dashboard.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  category?: string;
  image?: string;
  description?: string;
}

interface OrderProduct {
  product?: {
    _id: string;
    name: string;
    image?: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  products: OrderProduct[];
}

interface User {
  id?: string;
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
  avatar?: string;
}

interface DashboardStats {
  orders: number;
  wishlist: number;
  cart: number;
  spent: number;
  coupons: number;
  rewards: number;
}

function Dashboard() {
  const [user] = useState<User | null>(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    orders: 0,
    wishlist: 0,
    cart: 0,
    spent: 0,
    coupons: 5,
    rewards: 1680,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const results = await Promise.allSettled([
        API.get("/products"),
        API.get("/wishlist"),
        API.get("/cart"),
        API.get("/orders"),
      ]);

      let productData: Product[] = [];
      let wishlistCount = 0;
      let cartCount = 0;
      let orderData: Order[] = [];

      /* ---------------- PRODUCTS ---------------- */

      if (results[0].status === "fulfilled") {
        const response = results[0].value.data;

        productData =
          response?.data ||
          response?.products ||
          [];

        if (!Array.isArray(productData)) {
          productData = [];
        }

        setProducts(productData);
      }

      /* ---------------- WISHLIST ---------------- */

      if (results[1].status === "fulfilled") {
        const response = results[1].value.data;

        wishlistCount =
          response?.totalItems ||
          response?.count ||
          response?.wishlist?.length ||
          0;
      }

      /* ---------------- CART ---------------- */

      if (results[2].status === "fulfilled") {
        const response = results[2].value.data;

        cartCount =
          response?.totalItems ||
          response?.count ||
          response?.cart?.length ||
          0;
      }

      /* ---------------- ORDERS ---------------- */

      if (results[3].status === "fulfilled") {
        const response = results[3].value.data;

        orderData =
          response?.orders ||
          response?.data ||
          [];

        if (!Array.isArray(orderData)) {
          orderData = [];
        }

        setOrders(orderData);
      }

      /* ---------------- TOTAL SPENT ---------------- */

      const totalSpent = orderData.reduce(
        (total, order) => {
          if (order.status?.toLowerCase() === "cancelled") {
            return total;
          }

          return total + Number(order.totalAmount || 0);
        },
        0
      );

      setStats({
        orders: orderData.length,
        wishlist: Number(wishlistCount),
        cart: Number(cartCount),
        spent: totalSpent,
        coupons: 5,
        rewards: 1680,
      });
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- USER NAME ---------------- */

  const firstName =
    user?.name?.split(" ")[0] || "Shopper";

  /* ---------------- RECOMMENDED PRODUCTS ---------------- */

  const recommendedProducts = useMemo(() => {
    return products.slice(0, 4);
  }, [products]);

  /* ---------------- RECENT ORDERS ---------------- */

  const recentOrders = useMemo(() => {
    return orders.slice(0, 4);
  }, [orders]);

  /* ---------------- MONTHLY DATA ---------------- */

  const monthlyOrders = useMemo(() => {
    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      const now = new Date();

      return (
        orderDate.getMonth() === now.getMonth() &&
        orderDate.getFullYear() === now.getFullYear()
      );
    });
  }, [orders]);

  const monthlyItems = monthlyOrders.reduce(
    (total, order) => {
      return (
        total +
        (order.products?.reduce(
          (sum, item) => sum + Number(item.quantity || 0),
          0
        ) || 0)
      );
    },
    0
  );

  /* ---------------- CATEGORIES ---------------- */

  const categories = [
    {
      name: "Electronics",
      icon: "🎧",
      color: "category-blue",
    },
    {
      name: "Fashion",
      icon: "👗",
      color: "category-pink",
    },
    {
      name: "Home & Kitchen",
      icon: "☕",
      color: "category-orange",
    },
    {
      name: "Beauty",
      icon: "🧴",
      color: "category-purple",
    },
    {
      name: "Sports",
      icon: "🏀",
      color: "category-green",
    },
    {
      name: "Books",
      icon: "📚",
      color: "category-yellow",
    },
  ];

  /* ---------------- BRANDS ---------------- */

  const brands = [
    {
      name: "Apple",
      products: "12 Products",
      percentage: 40,
      color: "brand-blue",
    },
    {
      name: "Nike",
      products: "8 Products",
      percentage: 28,
      color: "brand-teal",
    },
    {
      name: "Sony",
      products: "6 Products",
      percentage: 20,
      color: "brand-purple",
    },
    {
      name: "Philips",
      products: "4 Products",
      percentage: 12,
      color: "brand-orange",
    },
  ];

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div className="user-dashboard">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside className="user-sidebar">

       

        <div className="sidebar-section-title">
          SHOP
        </div>

        <nav className="sidebar-nav">

          <Link
            to="/dashboard"
            className="sidebar-link active"
          >
            <FaHome />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/products"
            className="sidebar-link"
          >
            <FaBoxOpen />
            <span>Products</span>
          </Link>

          <Link
            to="/wishlist"
            className="sidebar-link"
          >
            <FaHeart />
            <span>Wishlist</span>

            {stats.wishlist > 0 && (
              <span className="sidebar-badge">
                {stats.wishlist}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="sidebar-link"
          >
            <FaShoppingCart />
            <span>Cart</span>

            {stats.cart > 0 && (
              <span className="sidebar-badge">
                {stats.cart}
              </span>
            )}
          </Link>

          <Link
            to="/orders"
            className="sidebar-link"
          >
            <FaBoxOpen />
            <span>Orders</span>
          </Link>

          <Link
            to="/orders"
            className="sidebar-link"
          >
            <FaUndo />
            <span>Returns</span>
          </Link>

        </nav>

        <div className="sidebar-section-title">
          ACCOUNT
        </div>

        <nav className="sidebar-nav">

          <Link
            to="/profile"
            className="sidebar-link"
          >
            <FaUser />
            <span>Profile</span>
          </Link>

          <Link
            to="/profile"
            className="sidebar-link"
          >
            <FaMapMarkerAlt />
            <span>Addresses</span>
          </Link>

          <Link
            to="/profile"
            className="sidebar-link"
          >
            <FaCreditCard />
            <span>Payment Methods</span>
          </Link>

          <Link
            to="/profile"
            className="sidebar-link"
          >
            <FaStar />
            <span>My Reviews</span>
          </Link>

          <Link
            to="/profile"
            className="sidebar-link"
          >
            <FaTicketAlt />
            <span>My Coupons</span>
          </Link>

        </nav>

        <div className="sidebar-section-title">
          MORE
        </div>

        <nav className="sidebar-nav">

          <Link
            to="/"
            className="sidebar-link"
          >
            <FaBell />
            <span>Notifications</span>

            <span className="notification-badge">
              3
            </span>
          </Link>

          <Link
            to="/profile"
            className="sidebar-link"
          >
            <FaCog />
            <span>Settings</span>
          </Link>

          <Link
            to="/"
            className="sidebar-link"
          >
            <FaQuestionCircle />
            <span>Help Center</span>
          </Link>

          <button
            className="sidebar-link logout-sidebar"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>

        </nav>

        {/* PREMIUM CARD */}

        <div className="premium-card">

          <div className="premium-icon">
            <FaCrown />
          </div>

          <h4>Go Premium</h4>

          <p>
            Unlock free delivery,
            early access & more.
          </p>

          <button>
            Upgrade Now
          </button>

        </div>

        {/* AI CARD */}

        <div className="sidebar-ai-card">

          <div>
            <FaRobot className="sidebar-ai-icon" />
          </div>

          <h4>
            AI Shopping Assistant
          </h4>

          <p>
            Find the best deals for you
          </p>

          <Link to="/ai-assistant">
            Ask AI
          </Link>

          <div className="sidebar-ai-robot">
            🤖
          </div>

        </div>

      </aside>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="dashboard-main">

        {/* TOP HEADER */}

        <header className="dashboard-header">

          <div className="mobile-menu-placeholder">
            ☰
          </div>

          <div className="dashboard-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search for products, categories, brands..."
            />

            <span>
              Ctrl /
            </span>

          </div>

          <Link
            to="/ai-assistant"
            className="header-ai-button"
          >
            🤖 AI Assistant
          </Link>

          <Link
            to="/wishlist"
            className="header-icon-button"
          >
            <FaHeart />

            {stats.wishlist > 0 && (
              <span>
                {stats.wishlist}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="header-icon-button"
          >
            <FaShoppingCart />

            {stats.cart > 0 && (
              <span>
                {stats.cart}
              </span>
            )}
          </Link>

          <div className="header-profile">

            <div className="header-avatar">
              {firstName.charAt(0).toUpperCase()}
            </div>

          </div>

        </header>

        {/* =====================================================
            WELCOME + PROMOTION
        ====================================================== */}

        <section className="welcome-section">

          <div className="welcome-content">

            <p className="welcome-small">
              Good evening,
            </p>

            <h1>
              {user?.name || "Shopper"} 👋
            </h1>

            <p>
              Let's make your shopping
              experience amazing!
            </p>

          </div>

          <div className="sale-banner">

            <div className="sale-content">

              <span className="sale-label">
                Big Savings for You!
              </span>

              <h2>
                Flat 30% OFF
              </h2>

              <p>
                On selected electronics
                & accessories
              </p>

              <Link to="/products">
                Shop The Sale
                <FaArrowRight />
              </Link>

            </div>

            <div className="sale-visual">
              🛍️
            </div>

          </div>

        </section>

        {/* =====================================================
            SUMMARY CARDS
        ====================================================== */}

        <section className="summary-grid">

          <div className="summary-card orders-summary">

            <div className="summary-icon">
              <FaBoxOpen />
            </div>

            <span>
              Orders
            </span>

            <strong>
              {stats.orders}
            </strong>

            <small>
              <MdTrendingUp />
              +12% this month
            </small>

            <Link to="/orders">
              View Orders <FaArrowRight />
            </Link>

          </div>

          <div className="summary-card wishlist-summary">

            <div className="summary-icon">
              <FaHeart />
            </div>

            <span>
              Wishlist Items
            </span>

            <strong>
              {stats.wishlist}
            </strong>

            <small>
              <MdTrendingUp />
              +8% this month
            </small>

            <Link to="/wishlist">
              View Wishlist <FaArrowRight />
            </Link>

          </div>

          <div className="summary-card spent-summary">

            <div className="summary-icon">
              ₹
            </div>

            <span>
              Total Spent
            </span>

            <strong>
              ₹ {stats.spent.toLocaleString("en-IN")}
            </strong>

            <small>
              <MdTrendingUp />
              +18% this month
            </small>

            <Link to="/orders">
              View Details <FaArrowRight />
            </Link>

          </div>

          <div className="summary-card coupon-summary">

            <div className="summary-icon">
              <FaTicketAlt />
            </div>

            <span>
              Coupons
            </span>

            <strong>
              {stats.coupons}
            </strong>

            <small>
              Save more today
            </small>

            <Link to="/products">
              View Coupons <FaArrowRight />
            </Link>

          </div>

          <div className="summary-card reward-summary">

            <div className="summary-icon">
              <FaGift />
            </div>

            <span>
              Rewards Points
            </span>

            <strong>
              {stats.rewards.toLocaleString()}
            </strong>

            <small>
              Redeem exciting rewards
            </small>

            <Link to="/profile">
              Redeem Now <FaArrowRight />
            </Link>

          </div>

        </section>

        {/* =====================================================
            RECOMMENDED + ACTIVITY
        ====================================================== */}

        <section className="dashboard-two-column">

          {/* RECOMMENDED */}

          <div className="dashboard-panel">

            <div className="panel-header">

              <div>
                <h2>
                  Recommended for You
                </h2>

                <p>
                  <MdFavorite />
                  Handpicked for you
                </p>
              </div>

              <Link to="/products">
                View All
                <FaChevronRight />
              </Link>

            </div>

            <div className="recommendation-grid">

              {loading ? (
                <div className="dashboard-loading">
                  Loading recommendations...
                </div>
              ) : recommendedProducts.length > 0 ? (
                recommendedProducts.map(
                  (product, index) => (
                    <Link
                      to={`/products/${product._id}`}
                      className="recommendation-card"
                      key={product._id}
                    >

                      <div className="recommendation-badge">
                        {index === 0
                          ? "New"
                          : index === 1
                          ? "-15%"
                          : index === 2
                          ? "Popular"
                          : "Bestseller"}
                      </div>

                      <div className="recommendation-image">

                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                          />
                        ) : (
                          <div className="no-product-image">
                            🛍️
                          </div>
                        )}

                      </div>

                      <h3>
                        {product.name}
                      </h3>

                      <strong>
                        ₹{" "}
                        {Number(
                          product.price || 0
                        ).toLocaleString("en-IN")}
                      </strong>

                      <div className="product-rating">
                        ⭐ 4.8

                        <button
                          type="button"
                          onClick={(e) =>
                            e.preventDefault()
                          }
                        >
                          🛒
                        </button>
                      </div>

                    </Link>
                  )
                )
              ) : (
                <div className="dashboard-empty">
                  No recommendations available.
                </div>
              )}

            </div>

          </div>

          {/* RECENT ACTIVITY */}

          <div className="dashboard-panel activity-panel">

            <div className="panel-header">

              <div>
                <h2>
                  Recent Activity
                </h2>
              </div>

              <Link to="/orders">
                View All
              </Link>

            </div>

            <div className="activity-list">

              {recentOrders.length > 0 ? (
                recentOrders.map(
                  (order, index) => {

                    const firstProduct =
                      order.products?.[0];

                    return (
                      <div
                        className="activity-item"
                        key={order._id}
                      >

                        <div
                          className={`activity-dot activity-${index}`}
                        >
                          {index === 0
                            ? <FaTruck />
                            : index === 1
                            ? <FaHeart />
                            : index === 2
                            ? <FaGift />
                            : <FaStar />}
                        </div>

                        <div className="activity-text">

                          <strong>
                            {order.status ===
                            "Delivered"
                              ? "Order Delivered"
                              : "Order Placed"}
                          </strong>

                          <span>
                            #
                            {order._id
                              .slice(-6)
                              .toUpperCase()}
                          </span>

                          {firstProduct?.product
                            ?.name && (
                            <small>
                              {
                                firstProduct
                                  .product
                                  .name
                              }
                            </small>
                          )}

                        </div>

                        <time>
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                            }
                          )}
                        </time>

                      </div>
                    );
                  }
                )
              ) : (
                <div className="dashboard-empty">
                  No recent activity.
                </div>
              )}

            </div>

          </div>

        </section>

        {/* =====================================================
            CATEGORY + MONTHLY + BRANDS
        ====================================================== */}

        <section className="insights-grid">

          {/* CATEGORIES */}

          <div className="dashboard-panel">

            <div className="panel-header">

              <div>
                <h2>
                  Shop by Category
                </h2>

                <p>
                  Explore top categories
                </p>
              </div>

              <Link to="/products">
                View All
              </Link>

            </div>

            <div className="category-grid">

              {categories.map(
                (category) => (
                  <Link
                    to="/products"
                    className={`category-card ${category.color}`}
                    key={category.name}
                  >

                    <div>
                      {category.icon}
                    </div>

                    <span>
                      {category.name}
                    </span>

                  </Link>
                )
              )}

            </div>

          </div>

          {/* MONTHLY HIGHLIGHTS */}

          <div className="dashboard-panel monthly-panel">

            <div className="panel-header">

              <div>
                <h2>
                  Monthly Highlights
                </h2>
              </div>

              <select defaultValue="month">
                <option value="month">
                  This Month
                </option>
              </select>

            </div>

            <div className="highlight-row">

              <div>
                <span>
                  Orders Placed
                </span>

                <strong>
                  {monthlyOrders.length}
                </strong>
              </div>

              <div className="mini-bars blue-bars">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>

            </div>

            <div className="highlight-row">

              <div>
                <span>
                  Items Bought
                </span>

                <strong>
                  {monthlyItems}
                </strong>
              </div>

              <div className="mini-bars orange-bars">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>

            </div>

            <div className="highlight-row">

              <div>
                <span>
                  Total Savings
                </span>

                <strong className="saving-value">
                  ₹3,240
                </strong>
              </div>

              <div className="mini-bars green-bars">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>

            </div>

            <div className="saving-message">
              🎉 You saved <strong>18%</strong>{" "}
              more this month!
            </div>

          </div>

          {/* BRANDS */}

          <div className="dashboard-panel">

            <div className="panel-header">

              <div>
                <h2>
                  Top Brands You Love
                </h2>
              </div>

              <Link to="/products">
                View All
              </Link>

            </div>

            <div className="brand-list">

              {brands.map(
                (brand) => (
                  <div
                    className="brand-item"
                    key={brand.name}
                  >

                    <div className="brand-logo">
                      {brand.name.charAt(0)}
                    </div>

                    <div className="brand-info">

                      <strong>
                        {brand.name}
                      </strong>

                      <span>
                        {brand.products}
                      </span>

                      <div className="brand-progress">
                        <div
                          className={
                            brand.color
                          }
                          style={{
                            width: `${brand.percentage}%`,
                          }}
                        />
                      </div>

                    </div>

                    <b>
                      {brand.percentage}%
                    </b>

                  </div>
                )
              )}

            </div>

          </div>

        </section>

        {/* =====================================================
            LOYALTY JOURNEY
        ====================================================== */}

        <section className="loyalty-section">

          <div className="loyalty-header">

            <div>
              <h2>
                Your Loyalty Journey
              </h2>

              <p>
                Keep shopping and unlock more
                exclusive rewards!
              </p>
            </div>

            <FaGift />

          </div>

          <div className="loyalty-content">

            <div className="loyalty-track">

              <div className="loyalty-step completed">

                <div>
                  🥉
                </div>

                <strong>
                  Bronze
                </strong>

                <span>
                  0 - 999 pts
                </span>

              </div>

              <div className="loyalty-line completed-line" />

              <div className="loyalty-step current">

                <div>
                  🥈
                </div>

                <strong>
                  Silver
                </strong>

                <span>
                  1,000 - 2,999 pts
                </span>

              </div>

              <div className="loyalty-line" />

              <div className="loyalty-step">

                <div>
                  🥇
                </div>

                <strong>
                  Gold
                </strong>

                <span>
                  3,000 - 4,999 pts
                </span>

              </div>

              <div className="loyalty-line" />

              <div className="loyalty-step">

                <div>
                  💎
                </div>

                <strong>
                  Platinum
                </strong>

                <span>
                  5,000+ pts
                </span>

              </div>

            </div>

            <div className="loyalty-card">

              <h3>
                You're Silver!
              </h3>

              <strong>
                {stats.rewards.toLocaleString()} /
                3,000 points
              </strong>

              <div className="reward-progress">
                <div
                  style={{
                    width: `${Math.min(
                      (stats.rewards / 3000) *
                        100,
                      100
                    )}%`,
                  }}
                />
              </div>

              <p>
                Earn{" "}
                {Math.max(
                  3000 - stats.rewards,
                  0
                )}{" "}
                points to reach Gold tier
              </p>

            </div>

          </div>

        </section>

        {/* =====================================================
            OFFERS
        ====================================================== */}

        <section className="offers-grid">

          <div className="exclusive-offer">

            <div className="offer-text">

              <span>
                Exclusive Offers for You
              </span>

              <h2>
                Grab the best deals
                before they're gone!
              </h2>

              <div className="offer-timer">

                <div>
                  <strong>
                    02
                  </strong>
                  <span>
                    Days
                  </span>
                </div>

                <b>:</b>

                <div>
                  <strong>
                    14
                  </strong>
                  <span>
                    Hours
                  </span>
                </div>

                <b>:</b>

                <div>
                  <strong>
                    36
                  </strong>
                  <span>
                    Mins
                  </span>
                </div>

              </div>

              <Link to="/products">
                Shop Now
                <FaArrowRight />
              </Link>

            </div>

            <div className="offer-image">
              🛒
            </div>

          </div>

          <div className="service-card delivery-card">

            <FaTruck />

            <h3>
              Free Delivery
            </h3>

            <p>
              On orders above ₹499
            </p>

          </div>

          <div className="service-card returns-card">

            <FaUndo />

            <h3>
              Easy Returns
            </h3>

            <p>
              Hassle-free returns
            </p>

          </div>

          <div className="service-card secure-card">

            <FaShieldAlt />

            <h3>
              Secure Payments
            </h3>

            <p>
              100% safe & secure
            </p>

          </div>

        </section>

        {/* =====================================================
            AI SHOPPING TIP
        ====================================================== */}

        <section className="shopping-tip">

          <div className="tip-icon">
            💡
          </div>

          <div className="tip-content">

            <h3>
              Shopping Tip for You
            </h3>

            <p>
              Prices for items in your
              wishlist have dropped!
              Check now and save more.
            </p>

          </div>

          <Link to="/wishlist">
            View Wishlist
            <FaArrowRight />
          </Link>

          <div className="tip-decoration">
            🏷️
          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;