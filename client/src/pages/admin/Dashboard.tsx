import "./Dashboard.css";
import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiPackage,
} from "react-icons/fi";

import StatCard from "../../components/admin/cards/StatCard";
import RevenueChart from "../../components/admin/charts/RevenueChart";
import DashboardHero from "../../components/admin/hero/DashboardHero";
import RecentOrders from "../../components/admin/tables/RecentOrders";
import AIInsights from "../../components/AIInsights/AIInsights";

const Dashboard = () => {
  return (
    <div className="dashboard-page">

      {/* Hero */}

      <DashboardHero />

      {/* KPI Cards */}

      <div className="stats-grid">

        <StatCard
          title="Revenue"
          value={542320}
          prefix="₹"
          growth="+18.4% this month"
          color="linear-gradient(135deg,#14b8a6,#06b6d4)"
          icon={<FiDollarSign />}
        />

        <StatCard
          title="Orders"
          value={352}
          growth="+12% today"
          color="linear-gradient(135deg,#6366f1,#8b5cf6)"
          icon={<FiShoppingBag />}
        />

        <StatCard
          title="Customers"
          value={1248}
          growth="+9.3% this week"
          color="linear-gradient(135deg,#10b981,#22c55e)"
          icon={<FiUsers />}
        />

        <StatCard
          title="Products"
          value={265}
          growth="+5 New"
          color="linear-gradient(135deg,#f59e0b,#fb923c)"
          icon={<FiPackage />}
        />

      </div>

      {/* Coming Soon */}

      <div className="dashboard-coming">

     <RevenueChart />

        <div className="dashboard-bottom">

    <RecentOrders />

    <AIInsights />

</div>

      </div>

    </div>
  );
};

export default Dashboard;