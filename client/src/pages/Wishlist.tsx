import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/api";
import "./Wishlist.css";

import { notify } from "../utils/notify";
import Loader from "../components/Loader/Loader";
import EmptyState from "../components/EmptyState/EmptyState";

interface WishlistItem {
  _id: string;

  product: {
    _id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    image: string;
  };
}

function Wishlist() {
  const navigate = useNavigate();

  // Wishlist products
  const [wishlist, setWishlist] =
    useState<WishlistItem[]>([]);

  // Page loading
  const [loading, setLoading] =
    useState(true);

  // Remove button loading
  const [removingId, setRemovingId] =
    useState<string | null>(null);

  // Add to cart button loading
  const [addingToCartId, setAddingToCartId] =
    useState<string | null>(null);

  const token =
    localStorage.getItem("token");

  useEffect(() => {
    fetchWishlist();
  }, []);

  // =========================
  // Fetch Wishlist
  // =========================

  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        "/wishlist",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setWishlist(res.data);

    } catch (error) {
      console.error(error);

      notify.error(
        "Unable to load your wishlist. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Add Product To Cart
  // =========================

  const addToCart = async (
    productId: string
  ) => {
    if (
      addingToCartId === productId
    ) {
      return;
    }

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
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      notify.success(
        "Added to cart successfully."
      );

    } catch (error: any) {
      console.error(error);

      notify.error(
        error.response?.data?.message ||
          "Unable to add product to cart."
      );

    } finally {
      setAddingToCartId(null);
    }
  };

  // =========================
  // Remove From Wishlist
  // =========================

  const removeWishlist = async (
    id: string
  ) => {
    if (removingId === id) {
      return;
    }

    try {
      setRemovingId(id);

      await API.delete(
        `/wishlist/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      // Remove immediately from UI
      setWishlist(
        (prevWishlist) =>
          prevWishlist.filter(
            (item) =>
              item._id !== id
          )
      );

      notify.success(
        "Removed from wishlist successfully."
      );

    } catch (error) {
      console.error(error);

      notify.error(
        "Failed to remove from wishlist. Please try again."
      );

    } finally {
      setRemovingId(null);
    }
  };

  // =========================
  // Page Loader
  // =========================

  if (loading) {
    return (
      <Loader
        size="medium"
        text="Loading your wishlist..."
      />
    );
  }

  return (
    <div className="wishlist-page">

      {/* Header */}

      <div className="wishlist-header">

        <div>
          <span className="wishlist-subtitle">
            YOUR SAVED FAVORITES
          </span>

          <h1>
            ❤️ My Wishlist
          </h1>

          <p>
            Products you love, saved in
            one place.
          </p>
        </div>

        {wishlist.length > 0 && (
          <div className="wishlist-count">
            {wishlist.length}{" "}
            {wishlist.length === 1
              ? "Product"
              : "Products"}
          </div>
        )}

      </div>

      {/* Empty Wishlist */}

      {wishlist.length === 0 ? (

        <EmptyState
          icon="❤️"
          title="Your Wishlist is Empty"
          message="Save the products you love and find them easily whenever you're ready to shop."
          buttonText="Explore Products"
          buttonLink="/products"
        />

      ) : (

        <div className="wishlist-grid">

          {wishlist.map((item) => (

            <div
              className="wishlist-card"
              key={item._id}
            >

              {/* Product Image */}

              <div className="wishlist-image-container">

                <img
                  src={item.product.image}
                  alt={item.product.name}
                  onClick={() =>
                    navigate(
                      `/products/${item.product._id}`
                    )
                  }
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/400x300?text=ShopSmart";
                  }}
                />

                <span className="wishlist-category">
                  {item.product.category}
                </span>

              </div>

              {/* Product Content */}

              <div className="wishlist-card-content">

                <h3
                  onClick={() =>
                    navigate(
                      `/products/${item.product._id}`
                    )
                  }
                >
                  {item.product.name}
                </h3>

                <p className="wishlist-description">
                  {item.product.description}
                </p>

                {/* Price */}

                <div className="wishlist-price-row">

                  <div>
                    <span className="price-label">
                      Price
                    </span>

                    <p className="wishlist-price">
                      ₹ {item.product.price}
                    </p>
                  </div>

                  <span className="saved-badge">
                    ❤️ Saved
                  </span>

                </div>

                {/* Actions */}

                <div className="wishlist-actions">

                  <button
                    className="wishlist-view-btn"
                    onClick={() =>
                      navigate(
                        `/products/${item.product._id}`
                      )
                    }
                  >
                    View Details
                  </button>

                  <button
                    className="wishlist-cart-btn"
                    onClick={() =>
                      addToCart(
                        item.product._id
                      )
                    }
                    disabled={
                      addingToCartId ===
                      item.product._id
                    }
                  >
                    {addingToCartId ===
                    item.product._id ? (
                      <Loader
                        size="small"
                        text="Adding..."
                      />
                    ) : (
                      "🛒 Add to Cart"
                    )}
                  </button>

                </div>

                {/* Remove */}

                <button
                  className="wishlist-remove-btn"
                  onClick={() =>
                    removeWishlist(
                      item._id
                    )
                  }
                  disabled={
                    removingId ===
                    item._id
                  }
                >
                  {removingId ===
                  item._id ? (
                    <Loader
                      size="small"
                      text="Removing..."
                    />
                  ) : (
                    "🗑 Remove from Wishlist"
                  )}
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Wishlist;