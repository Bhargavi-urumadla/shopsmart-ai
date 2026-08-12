import "./TopProductsCard.css";
import type { ProductInsight } from "../../../services/adminAIService";

interface TopProductsCardProps {
  products: ProductInsight[];
}

const TopProductsCard = ({
  products = [],
}: TopProductsCardProps) => {
  return (
    <div className="top-products-card">
      <h2>🏆 Top Products</h2>

      {products.length === 0 ? (
        <p className="empty-message">
          No product data available.
        </p>
      ) : (
        <table className="products-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Revenue</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.productId || index}
              >
                <td>{product.name || "-"}</td>

                <td>{product.category || "-"}</td>

                <td>{product.quantitySold ?? 0}</td>

                <td>
                  ₹
                  {Number(
                    product.revenue ?? 0
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TopProductsCard;