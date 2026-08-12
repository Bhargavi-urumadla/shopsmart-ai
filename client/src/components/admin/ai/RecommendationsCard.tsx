import "./RecommendationsCard.css";
import type { Recommendation } from "../../../services/adminAIService";

interface RecommendationsCardProps {
  recommendations: Recommendation[];
}

const RecommendationsCard = ({
  recommendations,
}: RecommendationsCardProps) => {
  const getBadgeClass = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "badge high";
      case "medium":
        return "badge medium";
      case "low":
        return "badge low";
      default:
        return "badge";
    }
  };

  return (
    <div className="recommendations-card">
      <h2>💡 AI Recommendations</h2>

      {recommendations.length === 0 ? (
        <p className="empty-message">
          No recommendations available.
        </p>
      ) : (
        recommendations.map((item, index) => (
          <div className="recommendation-item" key={index}>
            <div className="recommendation-header">
              <span className={getBadgeClass(item.severity)}>
                {item.severity}
              </span>

              <h3>{item.title}</h3>
            </div>

            <p>{item.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecommendationsCard;