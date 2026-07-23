import { FaSearch, FaTimes } from "react-icons/fa";
import "./ProductsToolbar.css";

interface ProductsToolbarProps {
  search: string;
  setSearch: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  totalProducts: number;
}

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Home",
  "Beverages",
  "Accessories",
];

function ProductsToolbar({
  search,
  setSearch,
  sort,
  setSort,
  category,
  setCategory,
  totalProducts,
}: ProductsToolbarProps) {
  const clearFilters = () => {
    setSearch("");
    setSort("");
    setCategory("All");
  };

  return (
    <section className="products-toolbar">

      {/* Header */}

      <div className="toolbar-top">
{/* 
        <div>
          <h1>🛍 ShopSmart Products</h1>

          <p>
            Discover premium products with AI-powered shopping.
          </p>
        </div> */}

        <span className="product-count">
          {totalProducts} Products
        </span>

      </div>

      {/* Search & Sort */}

      <div className="toolbar-middle">

        <div className="search-box">

          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search by product, brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>

          <option value="latest">
            Latest
          </option>

          <option value="priceAsc">
            Price : Low → High
          </option>

          <option value="priceDesc">
            Price : High → Low
          </option>

          <option value="rating">
            Highest Rated
          </option>

          <option value="nameAsc">
            Name : A → Z
          </option>

          <option value="nameDesc">
            Name : Z → A
          </option>

        </select>

        {(search || sort || category !== "All") && (
          <button
            className="clear-filter-btn"
            onClick={clearFilters}
          >
            <FaTimes />
            Clear
          </button>
        )}

      </div>

      {/* Categories */}

      <div className="category-chips">

        {categories.map((item) => (
          <button
            key={item}
            className={
              category === item
                ? "chip active"
                : "chip"
            }
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}

      </div>

    </section>
  );
}

export default ProductsToolbar;