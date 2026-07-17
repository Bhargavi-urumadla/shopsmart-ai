import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/api";
import "./Products.css";

import { notify } from "../utils/notify";
import Loader from "../components/Loader/Loader";
import ProductSkeleton from "../components/Skeleton/ProductSkeleton";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating?: number;
}

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Track individual button loading
  const [addingToCartId, setAddingToCartId] =
    useState<string | null>(null);

  const [addingToWishlistId, setAddingToWishlistId] =
    useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // Fetch Products
  // =========================

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products");
      console.log("PRODUCTS FROM API:", res.data);


      setProducts(res.data);
    } catch (error) {
      console.error(error);

      notify.error(
        "Unable to load products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Add to Cart
  // =========================

  const addToCart = async (productId: string) => {
    if (addingToCartId === productId) return;

    try {
      setAddingToCartId(productId);

      await API.post(
        "/cart",
        {
          productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      notify.success("Added to cart");

      // Keep user on Products page.
      // They can continue shopping.
      // Navigate to cart using navbar/cart icon.
    } catch (error: any) {
      notify.error(
        error.response?.data?.message ||
          "Failed to add product"
      );
    } finally {
      setAddingToCartId(null);
    }
  };

  // =========================
  // Add to Wishlist
  // =========================

  const addWishlist = async (
    productId: string
  ) => {
    if (addingToWishlistId === productId) return;

    try {
      setAddingToWishlistId(productId);

      await API.post(
        "/wishlist",
        {
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      notify.success("Added to Wishlist");
    } catch (error: any) {
      notify.error(
        error.response?.data?.message ||
          "Failed to add to wishlist"
      );
    } finally {
      setAddingToWishlistId(null);
    }
  };

  // =========================
  // Skeleton Loading
  // =========================

  if (loading) {
    return (
      <div className="products-page">
        <div className="products-header">
          <div>
            <span className="products-subtitle">
              DISCOVER YOUR FAVORITES
            </span>

            <h1>
              🛍 Explore Products
            </h1>
          </div>
        </div>

        <ProductSkeleton count={8} />
      </div>
    );
  }

  return (
    <div className="products-page">

      {/* Page Header */}

      <div className="products-header">

        <div>
          <span className="products-subtitle">
            DISCOVER YOUR FAVORITES
          </span>

          <h1>
            🛍 ShopSmart Products
          </h1>

          <p>
            Explore our collection and find
            something perfect for you.
          </p>
        </div>

        <div className="products-count">
          {products.length} Products
        </div>

      </div>

      {/* Products */}

      <div className="products-grid">

        {products.map((product) => (

          <div
            className="product-card"
            key={product._id}
          >

            {/* Product Image */}

            <div className="product-image-container">

              {/* <img
                src={product.image}
                alt={product.name}
                onClick={() =>
                  navigate(
                    `/products/${product._id}`
                  )
                }
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/400x300?text=ShopSmart";
                }}
              /> */}
              <img
  src={product.image}
  alt={product.name}
  onClick={() =>
    navigate(`/products/${product._id}`)
  }
/>

              {/* Category Badge */}

              <span className="category-badge">
                {product.category}
              </span>

              {/* Wishlist Heart */}

              <button
                className="wishlist-icon-btn"
                aria-label={`Add ${product.name} to wishlist`}
                disabled={
                  addingToWishlistId ===
                  product._id
                }
                onClick={() =>
                  addWishlist(product._id)
                }
              >
                {addingToWishlistId ===
                product._id ? (
                  <Loader
                    size="small"
                    text=""
                  />
                ) : (
                  "♡"
                )}
              </button>

            </div>

            {/* Product Content */}

            <div className="product-card-content">

              <h3
                onClick={() =>
                  navigate(
                    `/products/${product._id}`
                  )
                }
              >
                {product.name}
              </h3>

              {/* Rating */}

              <div className="product-rating">
                <span>⭐</span>

                <span>
                  {product.rating ?? "4.5"}
                </span>

                <span className="rating-text">
                  Highly Rated
                </span>
              </div>

              {/* Description */}

              <p className="description">
                {product.description}
              </p>

              {/* Price */}

              <div className="product-price-row">

                <div>
                  <span className="price-label">
                    Price
                  </span>

                  <p className="price">
                    ₹ {product.price}
                  </p>
                </div>

                <span className="stock-badge">
                  In Stock
                </span>

              </div>

              {/* Buttons */}

              <div className="product-actions">

                <button
                  className="view-btn"
                  onClick={() =>
                    navigate(
                      `/products/${product._id}`
                    )
                  }
                >
                  View Details
                </button>

                <button
                  className="cart-btn"
                  disabled={
                    addingToCartId ===
                    product._id
                  }
                  onClick={() =>
                    addToCart(product._id)
                  }
                >
                  {addingToCartId ===
                  product._id ? (
                    <Loader
                      size="small"
                      text="Adding..."
                    />
                  ) : (
                    "🛒 Add to Cart"
                  )}
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Products;