import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Products.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Add to Cart
  const addToCart = async (productId: string) => {
    try {
      await API.post(
        "/cart",
        {
          productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("✅ Product Added to Cart");

      // Navigate to Cart Page
      navigate("/cart");

    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to add product");
    }
  };

  // Add to Wishlist
  const addWishlist = async (productId: string) => {
    try {
      await API.post(
        "/wishlist",
        {
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("❤️ Added to Wishlist");

      // Optional
      // navigate("/wishlist");

    } catch (error: any) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  if (loading) {
    return <h2 className="loading">Loading Products...</h2>;
  }

  return (
    <div className="products-page">

      <h1>🛍 ShopSmart Products</h1>

      <div className="products-grid">

        {products.map((product) => (

          <div className="product-card" key={product._id}>

           <img
  src={product.image}
  alt={product.name}
  onClick={() => navigate(`/products/${product._id}`)}
  style={{ cursor: "pointer" }}
/>

           <h3
  onClick={() => navigate(`/products/${product._id}`)}
  style={{ cursor: "pointer" }}
>
  {product.name}
</h3>

            <p className="price">
              ₹ {product.price}
            </p>

            <p className="category">
              {product.category}
            </p>

            <p className="description">
              {product.description}
            </p>

            <div className="buttons">
 <button
  className="view-btn"
  onClick={() => {
    console.log(product._id);
    navigate(`/products/${product._id}`);
  }}
>
  👁 View Details
</button>

  <button
    className="cart-btn"
    onClick={() => addToCart(product._id)}
  >
    🛒 Add to Cart
  </button>

  <button
    className="wishlist-btn"
    onClick={() => addWishlist(product._id)}
  >
    ❤️ Wishlist
  </button>
</div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Products;