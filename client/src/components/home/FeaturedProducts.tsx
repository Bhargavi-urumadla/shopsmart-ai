import { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import API from "../../api/api";
import "./FeaturedProducts.css";
import { Link, useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  price: number;
  rating: number;
  stock: number;
}

function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data.data.slice(0, 4));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="featured-section">
        <h2>Featured Products</h2>
        <p>Loading products...</p>
      </section>
    );
  }

  return (
    <section className="featured-section">
      <div className="section-header">
        <span className="section-badge">⭐ Featured Collection</span>
        <h2>Featured Products</h2>
        <p>Hand-picked products recommended for you.</p>
      </div>

      <div className="featured-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <div className="product-top">
              <span className="category">{product.category}</span>

              <button className="wishlist-btn">
                <FaHeart />
              </button>
            </div>

           <div className="image-wrapper">

   <img
  src={product.image}
  alt={product.name}
  onClick={() => {
    console.log(product._id);
    navigate(`/products/${product._id}`);
  }}
  style={{ cursor: "pointer" }}
/>
  
</div>

            <div className="product-body">
              <h3>
  <Link to={`/products/${product._id}`}>
    {product.name}
  </Link>
</h3>

              <p className="brand">{product.brand}</p>

              <div className="rating">
                <FaStar />
                <span>{product.rating}</span>
              </div>

              <div className="price-row">
                <h4>₹{product.price}</h4>

                {product.stock > 0 ? (
                  <span className="stock in-stock">
                    In Stock
                  </span>
                ) : (
                  <span className="stock out-stock">
                    Out of Stock
                  </span>
                )}
              </div>

              <button className="cart-btn">
                <FaShoppingCart />
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;