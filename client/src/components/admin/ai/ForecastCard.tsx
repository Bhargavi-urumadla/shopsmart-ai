import "./ForecastCard.css";

interface ForecastCardProps {
  revenueForecast: number;
}

const ForecastCard = ({
  revenueForecast,
}: ForecastCardProps) => {
  return (
    <div className="forecast-card">
      <h2>📈 Revenue Forecast</h2>

      <div className="forecast-amount">
        ₹{Number(revenueForecast).toLocaleString()}
      </div>

      <p className="forecast-text">
        Estimated next month's revenue based on
        AI sales analysis.
      </p>
    </div>
  );
};

export default ForecastCard;