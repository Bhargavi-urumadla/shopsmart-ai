import { useEffect, useState } from "react";
import "./Dashboard.css";

import DashboardHero from "../../components/admin/hero/DashboardHero";
import RevenueChart from "../../components/admin/charts/RevenueChart";
import RecentOrders from "../../components/admin/tables/RecentOrders";

import StatsCards from "../../components/StatsCards/StatsCards";
import AIInsights from "../../components/AIInsights/AIInsights";
import QuickActions from "../../components/QuickActions/QuickActions";

import {
  getSalesOverview,
  getMonthlySales,
  getRecentOrders,
  getAIInsights,
} from "../../services/dashboardService";

function Dashboard() {
  const [overview, setOverview] = useState<any>(null);
  const [monthlySales, setMonthlySales] = useState([]);
  const [orders, setOrders] = useState([]);
  const [aiData, setAiData] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [
        overviewResponse,
        monthlyResponse,
        ordersResponse,
        aiResponse,
      ] = await Promise.all([
        getSalesOverview(),
        getMonthlySales(),
        getRecentOrders(),
        getAIInsights(),
      ]);

      setOverview(overviewResponse);
      setMonthlySales(monthlyResponse);
      setOrders(ordersResponse);
      setAiData(aiResponse);
    } catch (error) {
      console.error("Dashboard Load Failed", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div className="dashboard-page">
      <DashboardHero />

      <StatsCards data={overview} />

      <div className="dashboard-top">
        <div className="dashboard-left">
          <RevenueChart data={monthlySales} />

          <QuickActions />
        </div>

        <div className="dashboard-right">
          <AIInsights data={aiData} />
        </div>
      </div>

      <div className="dashboard-bottom">
        <RecentOrders orders={orders} />
      </div>
    </div>
  );
}

export default Dashboard;