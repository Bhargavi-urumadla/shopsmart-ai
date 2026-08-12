import { useEffect, useState } from "react";

import "./AIInsights.css";

import { getDashboardInsights } from "../../services/adminAIService";
import type { DashboardInsights } from "../../services/adminAIService";

import AIHero from "../../components/admin/ai/AIHero";
import BusinessHealthCard from "../../components/admin/ai/BusinessHealthCard";
import AISummaryCard from "../../components/admin/ai/AISummaryCard";
import RecommendationsCard from "../../components/admin/ai/RecommendationsCard";
import ForecastCard from "../../components/admin/ai/ForecastCard";
import TopProductsCard from "../../components/admin/ai/TopProductsCard";
import TopCategoriesCard from "../../components/admin/ai/TopCategoriesCard";

const AIInsights = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardInsights | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      setLoading(true);

      const response = await getDashboardInsights();

      setData(response);
      setError("");
    } catch (err: any) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Failed to load AI Insights."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="ai-page">
        <div className="loading-state">
          Loading AI Insights...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ai-page">
        <div className="error-state">{error}</div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="ai-page">
      <AIHero generatedAt={data.generatedAt} />

      <div className="ai-grid">
        <BusinessHealthCard score={data.healthScore} />

        <ForecastCard
          revenueForecast={data.revenueForecast}
        />
      </div>

      <AISummaryCard summary={data.aiSummary} />

      <RecommendationsCard
        recommendations={data.recommendations}
      />

      <div className="ai-grid">
        <TopProductsCard
          products={data.topProducts}
        />

        <TopCategoriesCard
          categories={data.topCategories}
        />
      </div>
    </div>
  );
};

export default AIInsights;