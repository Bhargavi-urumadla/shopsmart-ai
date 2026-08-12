import "./TopCategoriesCard.css";
import type { CategoryInsight } from "../../../services/adminAIService";

interface TopCategoriesCardProps {
  categories: CategoryInsight[];
}

const TopCategoriesCard = ({
  categories,
}: TopCategoriesCardProps) => {
  return (
    <div className="top-categories-card">
      <h2>📂 Top Categories</h2>

      {categories.length === 0 ? (
        <p className="empty-message">
          No category data available.
        </p>
      ) : (
        <table className="categories-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Sold</th>
              <th>Revenue</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td>{category.category}</td>
                <td>{category.quantitySold}</td>
                <td>
                  ₹{Number(category.revenue ?? 0).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TopCategoriesCard;