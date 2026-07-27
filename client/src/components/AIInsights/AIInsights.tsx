import { useEffect, useState } from "react";
import "./AIInsights.css";
import { FiTrendingUp, FiAlertTriangle, FiActivity } from "react-icons/fi";
import { getDashboardInsights } from "../../services/adminAI";

interface DashboardInsights {
  storeHealth: number;
  summary: string;
  forecast: {
    growth: string;
    expectedRevenue: string;
  };
  trending: {
    category: string;
    product: string;
  };
  alerts: {
    type: string;
    message: string;
    priority: string;
  }[];
  recommendations: {
    title: string;
    reason: string;
    priority: string;
  }[];
}

const AIInsights = () => {
  const [data, setData] = useState<DashboardInsights | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getDashboardInsights();
        setData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  if (!data) {
    return (
      <div className="ai-panel">
        <h2>🤖 AI Business Insights</h2>
        <p>Loading AI Insights...</p>
      </div>
    );
  }

  return (
    <div className="ai-panel">

      <div className="ai-title">
        🤖 AI Business Insights
      </div>

      <div className="health-box">

        <div>
          <h4>Store Health</h4>
          <p>Your store is performing well.</p>
        </div>

        <div className="health-score">
          {data.storeHealth}%
        </div>

      </div>

      <div className="divider"/>

      <div className="section">

        <h4>
          <FiActivity />
          Business Summary
        </h4>

        <p>{data.summary}</p>

      </div>

      <div className="divider"/>

      <div className="section">

        <h4>
          <FiTrendingUp />
          Sales Forecast
        </h4>

        <div className="forecast-grid">

          <div>
            <span>Growth</span>
            <strong>{data.forecast.growth}</strong>
          </div>

          <div>
            <span>Revenue</span>
            <strong>{data.forecast.expectedRevenue}</strong>
          </div>

        </div>

      </div>

      <div className="divider"/>

      <div className="section">

        <h4>🔥 Trending Product</h4>

        <p>
          <strong>{data.trending.product}</strong>
        </p>

        <small>{data.trending.category}</small>

      </div>

      <div className="divider"/>

      <div className="section">

        <h4>
          <FiAlertTriangle />
          Alerts
        </h4>

        {data.alerts.map((alert, index) => (

          <div className="alert-card" key={index}>

            <span className={alert.priority.toLowerCase()}>
              {alert.priority}
            </span>

            <p>{alert.message}</p>

          </div>

        ))}

      </div>

      <div className="divider"/>

      <div className="section">

        <h4>💡 AI Recommendations</h4>

        <ul>

          {data.recommendations.map((item, index) => (

            <li key={index}>

              <strong>{item.title}</strong>

              <br/>

              <small>{item.reason}</small>

            </li>

          ))}

        </ul>

      </div>

    </div>
  );
};

export default AIInsights;