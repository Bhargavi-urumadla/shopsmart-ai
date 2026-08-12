import "./ProductToolbar.css";
import { FiSearch, FiPlus } from "react-icons/fi";

interface Props {
  search: string;
  category: string;
  onSearch: (value: string) => void;
  onCategory: (value: string) => void;
  onAdd: () => void;
}

const ProductToolbar = ({
  search,
  category,
  onSearch,
  onCategory,
  onAdd,
}: Props) => {
  return (
    <div className="product-toolbar">

      <div className="toolbar-left">

        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <select
          value={category}
          onChange={(e) => onCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Mobile">Mobile</option>
          <option value="Laptop">Laptop</option>
          <option value="Accessories">Accessories</option>
          <option value="TV">TV</option>
          <option value="Audio">Audio</option>
        </select>

      </div>

      <button
        className="add-product-btn"
        onClick={onAdd}
      >
        <FiPlus />
        Add Product
      </button>

    </div>
  );
};

export default ProductToolbar;