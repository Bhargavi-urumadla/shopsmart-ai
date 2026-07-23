import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/api";
import "./Products.css";

import { notify } from "../utils/notify";
import Loader from "../components/Loader/Loader";
import ProductSkeleton from "../components/Skeleton/ProductSkeleton";
import ProductsToolbar from "../components/products/ProductsToolbar";
import ProductsHero from "../components/Hero/ProductsHero";
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
const [search, setSearch] = useState("");
const [debouncedSearch, setDebouncedSearch] = useState("");

const [sort, setSort] = useState("");

const [category, setCategory] = useState("All");

const [currentPage, setCurrentPage] = useState(1);

const [totalPages, setTotalPages] = useState(1);
const [totalProducts, setTotalProducts] = useState(0);

const limit = 8;

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
    setCurrentPage(1);
  }, 500);

  return () => clearTimeout(timer);
}, [search]);
useEffect(() => {
  setCurrentPage(1);
}, [category, sort]);
  useEffect(() => {
  fetchProducts();
}, [debouncedSearch, sort, category, currentPage]);

  // =========================
  // Fetch Products
  // =========================
const fetchProducts = useCallback(async () => {
  try {
    setLoading(true);

    const params = new URLSearchParams();

    params.append("page", currentPage.toString());
    params.append("limit", limit.toString());

    if (category !== "All") {
      params.append("category", category);
    }

    if (sort) {
      params.append("sort", sort);
    }

    if (debouncedSearch.trim()) {
      params.append("search", debouncedSearch);
    }

    const res = await API.get(
      `/products?${params.toString()}`
    );

    setProducts(res.data.data || []);

if (res.data.pagination) {
  setTotalPages(res.data.pagination.totalPages);
  setTotalProducts(res.data.pagination.totalProducts);
}

  } catch (error) {
    console.error(error);

    notify.error(
      "Unable to load products."
    );
  } finally {
    setLoading(false);
  }
}, [
  category,
  sort,
  debouncedSearch,
  currentPage,
]);

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
        <ProductsHero />

        <ProductSkeleton count={8} />
      </div>
    );
  }

  return (
  <div className="products-page">

    <ProductsHero />

    <ProductsToolbar
      search={search}
      setSearch={setSearch}
      sort={sort}
      setSort={setSort}
      category={category}
      setCategory={setCategory}
      totalProducts={totalProducts}
    />

    {products.length === 0 ? (
      <div className="empty-products">
        <h2>No Products Found</h2>
        <p>Try another search or category.</p>
      </div>
    ) : (
      <>
        <div className="products-grid">
          {products.map((product, index) => (
            <div
              className="product-card"
              key={product._id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Product Image */}
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() =>
                    navigate(`/products/${product._id}`)
                  }
                />

                <span className="category-badge">
                  {product.category}
                </span>

                <button
                  className="wishlist-icon-btn"
                  aria-label={`Add ${product.name} to wishlist`}
                  disabled={
                    addingToWishlistId === product._id
                  }
                  onClick={() =>
                    addWishlist(product._id)
                  }
                >
                  {addingToWishlistId === product._id ? (
                    <Loader size="small" text="" />
                  ) : (
                    "♡"
                  )}
                </button>
              </div>

              {/* Product Content */}
              <div className="product-card-content">

                <h3
                  onClick={() =>
                    navigate(`/products/${product._id}`)
                  }
                >
                  {product.name}
                </h3>

                <div className="product-rating">
                  <span>⭐</span>
                  <span>{product.rating ?? "4.5"}</span>
                  <span className="rating-text">
                    Highly Rated
                  </span>
                </div>

                <p className="description">
                  {product.description}
                </p>

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

                <div className="product-actions">

                  <button
                    className="view-btn"
                    onClick={() =>
                      navigate(`/products/${product._id}`)
                    }
                  >
                    View Details
                  </button>

                  <button
                    className="cart-btn"
                    disabled={
                      addingToCartId === product._id
                    }
                    onClick={() =>
                      addToCart(product._id)
                    }
                  >
                    {addingToCartId === product._id ? (
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

        {totalPages > 1 && (
          <div className="pagination">

            <button
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
            >
              ←
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => (
                <button
                  key={index + 1}
                  className={
                    currentPage === index + 1
                      ? "page-number active"
                      : "page-number"
                  }
                  onClick={() =>
                    setCurrentPage(index + 1)
                  }
                >
                  {index + 1}
                </button>
              )
            )}

            <button
              className="page-btn"
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
            >
              →
            </button>

          </div>
        )}
      </>
    )}

  </div>
);
}

export default Products;