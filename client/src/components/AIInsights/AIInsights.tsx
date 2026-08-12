import "./AIInsights.css";

interface Recommendation {
  title: string;
  description: string;
}

interface DashboardInsights {
  healthScore: number;
  aiSummary: string;
  revenueForecast: number;
  recommendations: Recommendation[];
}

interface AIInsightsProps {
  data: DashboardInsights | null;
}

const AIInsights = ({ data }: AIInsightsProps) => {
  if (!data) {
    return (
      <div className="ai-panel">
        <h2>🤖 AI Business Insights</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="ai-panel">
      <h2>🤖 AI Business Insights</h2>

      <div className="health-box">
        <h3>Business Health</h3>
        <h1>{data.healthScore}/100</h1>
      </div>

      <div className="section">
        <h3>AI Summary</h3>
        <p>{data.aiSummary}</p>
      </div>

      <div className="section">
        <h3>Revenue Forecast</h3>
        <h2>₹{data.revenueForecast.toLocaleString()}</h2>
      </div>

      <div className="section">
        <h3>Recommendations</h3>

        {data.recommendations.length === 0 ? (
          <p>No recommendations available.</p>
        ) : (
          <ul>
            {data.recommendations.map((item, index) => (
              <li key={index}>
                <strong>{item.title}</strong>
                <br />
                {item.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AIInsights;