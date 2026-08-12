import "./BusinessHealthCard.css";

interface BusinessHealthCardProps {
  score: number;
}

const BusinessHealthCard = ({
  score,
}: BusinessHealthCardProps) => {
  const getStatus = () => {
    if (score >= 90)
      return {
        label: "Excellent",
        color: "#16a34a",
      };

    if (score >= 75)
      return {
        label: "Good",
        color: "#2563eb",
      };

    if (score >= 60)
      return {
        label: "Average",
        color: "#f59e0b",
      };

    return {
      label: "Needs Improvement",
      color: "#dc2626",
    };
  };

  const status = getStatus();

  return (
    <div className="business-health-card">
      <div className="business-health-header">
        <h2>🏥 Business Health</h2>
      </div>

      <div className="health-circle-container">
        <div
          className="health-circle"
          style={{
            background: `conic-gradient(
              ${status.color} ${score * 3.6}deg,
              #e5e7eb 0deg
            )`,
          }}
        >
          <div className="health-circle-inner">
            <span className="health-score">
              {score}
            </span>
            <span className="health-max">
              /100
            </span>
          </div>
        </div>
      </div>

      <h3
        className="health-status"
        style={{ color: status.color }}
      >
        {status.label}
      </h3>

      <p className="health-description">
        Overall AI evaluation based on
        revenue, inventory, orders,
        customer activity and product
        performance.
      </p>
    </div>
  );
};

export default BusinessHealthCard;