import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import "./ProductDetails.css";

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

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      alert("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const addToCart = async () => {
    try {
      await API.post(
        "/cart",
        {
          productId: product?._id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Product Added to Cart");

      navigate("/cart");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  const addWishlist = async () => {
    try {
      await API.post(
        "/wishlist",
        {
          productId: product?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Added to Wishlist");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

return (
  <div className="product-details-page">
    <div className="product-container">

      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-info">

        <h1>{product.name}</h1>

        <p className="brand">
          <strong>Brand:</strong> {product.brand}
        </p>

        <p className="category">
          <strong>Category:</strong> {product.category}
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

        <div className="quantity-section">

          <button
            className="quantity-btn"
            onClick={decreaseQuantity}
          >
            −
          </button>

          <span>{quantity}</span>

          <button
            className="quantity-btn"
            onClick={increaseQuantity}
          >
            +
          </button>

        </div>

        <div className="action-buttons">

          <button
            className="cart-btn"
            onClick={addToCart}
          >
            🛒 Add to Cart
          </button>

          <button
            className="wishlist-btn"
            onClick={addWishlist}
          >
            ❤️ Wishlist
          </button>

          <button
            className="buy-btn"
            onClick={() => navigate("/cart")}
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