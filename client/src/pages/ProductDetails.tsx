import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import "./ProductDetails.css";
import { notify } from "../utils/notify";
import Loader from "../components/Loader/Loader";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  image: string;
  stock: number;
  rating: number;
}

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Product data
  const [product, setProduct] = useState<Product | null>(null);

  // Page loading state
  const [loading, setLoading] = useState(true);

  // Quantity
  const [quantity, setQuantity] = useState(1);

  // Button loading states
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // =========================
  // Fetch Product
  // =========================

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/products/${id}`);

      setProduct(res.data.data);
    } catch (error) {
      console.error(error);

      notify.error(
        "Unable to load the product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Quantity
  // =========================

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // =========================
  // Add To Cart
  // =========================

  const addToCart = async () => {
    if (addingToCart) return;

    try {
      setAddingToCart(true);

      await API.post(
        "/cart",
        {
          productId: product?._id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      notify.success("Added to cart.");

      navigate("/cart");
    } catch (error: any) {
      notify.error(
        error.response?.data?.message ||
          "Unable to add product to cart. Please try again."
      );
    } finally {
      setAddingToCart(false);
    }
  };

  // =========================
  // Add To Wishlist
  // =========================

  const addWishlist = async () => {
    if (addingToWishlist) return;

    try {
      setAddingToWishlist(true);

      await API.post(
        "/wishlist",
        {
          productId: product?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      notify.success("Added to wishlist.");
    } catch (error: any) {
      notify.error(
        error.response?.data?.message ||
          "Unable to add product to wishlist. Please try again."
      );
    } finally {
      setAddingToWishlist(false);
    }
  };

  // =========================
  // Medium Page Loader
  // =========================

  if (loading) {
    return (
      <Loader
        size="medium"
        text="Loading product details..."
      />
    );
  }

  // =========================
  // Product Not Found
  // =========================

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  return (
    <div className="product-details-page">
<button
  className="back-btn"
  onClick={() => navigate("/products")}
>
  ← Back to Products
</button>
      <div className="product-container">

        {/* Product Image */}

        <div className="product-image">
  <span className="product-category-badge">
    {product.category}
  </span>

  <img
    src={product.image}
    alt={product.name}
    onError={(e) => {
      e.currentTarget.src =
        "https://placehold.co/600x600?text=ShopSmart";
    }}
  />
</div>

        {/* Product Information */}

        <div className="product-info">

          <h1>{product.name}</h1>

          <p className="brand">
            <strong>Brand:</strong>{" "}
            {product.brand}
          </p>

          <p className="category">
            <strong>Category:</strong>{" "}
            {product.category}
          </p>

          <div className="rating">
            ⭐ {product.rating} / 5
          </div>

          <h2 className="price">
            ₹ {product.price}
          </h2>

          <p className="stock">
            {product.stock > 0
              ? `✅ In Stock (${product.stock})`
              : "❌ Out of Stock"}
          </p>

          <p className="description">
            {product.description}
          </p>

          {/* Quantity */}

          <div className="quantity-wrapper">
  <p className="quantity-label">Quantity</p>

  <div className="quantity-section">
    <button
      className="quantity-btn"
      onClick={decreaseQuantity}
      disabled={quantity <= 1}
    >
      −
    </button>

    <span className="quantity-value">
      {quantity}
    </span>

    <button
      className="quantity-btn"
      onClick={increaseQuantity}
      disabled={
        product.stock === 0 ||
        quantity >= product.stock
      }
    >
      +
    </button>
  </div>
</div>

          {/* Action Buttons */}

          <div className="action-buttons">

            {/* Add To Cart */}

            <button
              className="cart-btn"
              onClick={addToCart}
              disabled={
                addingToCart ||
                product.stock === 0
              }
            >
              {addingToCart ? (
                <Loader
                  size="small"
                  text="Adding..."
                />
              ) : (
                "🛒 Add to Cart"
              )}
            </button>

            {/* Wishlist */}

            <button
              className="wishlist-btn"
              onClick={addWishlist}
              disabled={addingToWishlist}
            >
              {addingToWishlist ? (
                <Loader
                  size="small"
                  text="Adding..."
                />
              ) : (
                "❤️ Wishlist"
              )}
            </button>

            {/* Buy Now */}

            <button
              className="buy-btn"
              onClick={() =>
                navigate("/cart")
              }
            >
              ⚡ Buy Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;