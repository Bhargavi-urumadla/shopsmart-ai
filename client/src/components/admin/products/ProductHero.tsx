import "./ProductHero.css";
import { FiPackage } from "react-icons/fi";

interface Props {
  totalProducts: number;
}

const ProductHero = ({ totalProducts }: Props) => {
  return (
    <div className="product-hero">
      <div className="hero-left">
        <div className="hero-icon">
          <FiPackage />
        </div>

        <div>
          <h1>Products Management</h1>
          <p>
            Manage your inventory and products efficiently.
          </p>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-stat">
          <span>Total Products</span>
          <h2>{totalProducts}</h2>
        </div>

        <button className="hero-add-btn">
          + Add Product
        </button>
      </div>
    </div>
  );
};

export default ProductHero;