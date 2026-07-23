import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaHeart,
  FaShoppingCart,
  FaArrowRight,
} from "react-icons/fa";
import { MdInventory2 } from "react-icons/md";
import API from "../../api/api";
import "./Stats.css";

interface StatsData {
  products: number;
  wishlist: number;
  cart: number;
  orders: number;
}

function Stats() {
  const [stats, setStats] = useState<StatsData>({
    products: 0,
    wishlist: 0,
    cart: 0,
    orders: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [products, wishlist, cart, orders] = await Promise.all([
        API.get("/products"),
        API.get("/wishlist"),
        API.get("/cart"),
        API.get("/orders"),
      ]);

      setStats({
        products: products.data.count || products.data.data?.length || 0,
        wishlist:
          wishlist.data.totalItems ||
          wishlist.data.wishlist?.length ||
          0,
        cart:
          cart.data.totalItems ||
          cart.data.cart?.length ||
          0,
        orders:
          orders.data.totalOrders ||
          orders.data.orders?.length ||
          0,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const cards = [
    {
      title: "Products",
      count: stats.products,
      subtitle: "Browse Collection",
      icon: <MdInventory2 />,
      link: "/products",
      color: "products",
    },
    {
      title: "Wishlist",
      count: stats.wishlist,
      subtitle: "Saved Items",
      icon: <FaHeart />,
      link: "/wishlist",
      color: "wishlist",
    },
    {
      title: "Cart",
      count: stats.cart,
      subtitle: "Ready to Checkout",
      icon: <FaShoppingCart />,
      link: "/cart",
      color: "cart",
    },
    {
      title: "Orders",
      count: stats.orders,
      subtitle: "Track Orders",
      icon: <FaBoxOpen />,
      link: "/orders",
      color: "orders",
    },
  ];

  return (
    <section className="stats-section">
      <div className="stats-grid">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className={`stats-card ${card.color}`}
          >
            <div className="stats-top">
              <div className="stats-icon">{card.icon}</div>

              <FaArrowRight className="arrow-icon" />
            </div>

            <div className="stats-body">
              <h3>{card.title}</h3>
              <h2>{card.count}</h2>
              <p>{card.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Stats;