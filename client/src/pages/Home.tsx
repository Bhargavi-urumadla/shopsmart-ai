import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import { notify } from "../utils/notify";
import ProductSkeleton from "../components/Skeleton/ProductSkeleton";
import "./Home.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products");

      // Show only first 4 products
      setProducts(res.data.slice(0, 4));
    } catch (error) {
      console.error(error);

      notify.error(
        "Unable to load featured products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
  

      <div className="home-page">

        {/* Hero Section */}

        <section className="hero">

          <div className="hero-left">

            <h1>👋 Welcome Back</h1>

            <h2>
              {user?.name || "Shopper"}
            </h2>

            <p>
              Shop smarter with AI. Explore products,
              save your favourites, manage your cart,
              and track all your orders from one place.
            </p>

            <Link to="/products">
              <button className="shop-btn">
                🛍 Shop Now
              </button>
            </Link>

          </div>

          <div className="hero-right">
            🤖
          </div>

        </section>

        {/* Dashboard */}

        <section className="dashboard">

          <Link
            to="/products"
            className="dashboard-card"
          >
            <div className="icon">🛍</div>

            <h3>Products</h3>

            <p>Browse all available products</p>
          </Link>

          <Link
            to="/wishlist"
            className="dashboard-card"
          >
            <div className="icon">❤️</div>

            <h3>Wishlist</h3>

            <p>Products you saved</p>
          </Link>

          <Link
            to="/cart"
            className="dashboard-card"
          >
            <div className="icon">🛒</div>

            <h3>Cart</h3>

            <p>View shopping cart</p>
          </Link>

          <Link
            to="/orders"
            className="dashboard-card"
          >
            <div className="icon">📦</div>

            <h3>Orders</h3>

            <p>Track previous orders</p>
          </Link>

        </section>

        {/* Featured Products */}

        <section className="featured">

          <div className="section-header">

            <h2>🔥 Featured Products</h2>

            <Link to="/products">
              View All →
            </Link>

          </div>

          {/* Featured Products Loading */}

          {loading ? (
  <ProductSkeleton count={4} />
) : (

            <div className="featured-grid">

              {products.map((product) => (

                <div
                  className="featured-card"
                  key={product._id}
                >

                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/400x300?text=ShopSmart";
                    }}
                  />

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    {product.category}
                  </p>

                  <h2>
                    ₹ {product.price}
                  </h2>

                  <Link
                    to={`/products/${product._id}`}
                  >
                    <button>
                      View Product
                    </button>
                  </Link>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* AI Tip */}

        <section className="ai-box">

          <h2>💡 AI Shopping Tip</h2>

          <p>
            Compare products before purchasing.
            Save favourites in your wishlist and
            place orders with confidence.
          </p>

        </section>

      </div>
    </>
  );
}

export default Home;