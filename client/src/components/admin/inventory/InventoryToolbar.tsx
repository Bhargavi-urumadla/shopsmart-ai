import "./InventoryToolbar.css";
import { FaSearch, FaSyncAlt } from "react-icons/fa";

interface InventoryToolbarProps {
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
}

const InventoryToolbar = ({
  search,
  setSearch,
  filter,
  setFilter,
}: InventoryToolbarProps) => {
  return (
    <div className="inventory-toolbar">

      {/* Search */}
      <div className="inventory-search">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search product or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filter */}
      <select
        className="inventory-filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All Products</option>
        <option value="instock">In Stock</option>
        <option value="low">Low Stock</option>
        <option value="out">Out of Stock</option>
      </select>

      {/* Refresh */}
      <button
        className="inventory-refresh-btn"
        onClick={() => window.location.reload()}
      >
        <FaSyncAlt />
        Refresh
      </button>

    </div>
  );
};

export default InventoryToolbar;