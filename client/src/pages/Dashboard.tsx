import "./Dashboard.css";

import DashboardLayout from "../components/Dashboard/DashboardLayout";
import Sidebar from "../components/Sidebar/Sidebar";
import Hero from "../components/Hero/Hero";
import QuickActions from "../components/QuickActions/QuickActions";
import StatsCards from "../components/StatsCards/StatsCards";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import RecentOrders from "../components/RecentOrders/RecentOrders";
import OfferBanner from "../components/OfferBanner/OfferBanner";
function Dashboard() {
  return (
    <DashboardLayout
      sidebar={<Sidebar />}
      hero={<Hero />}
      quickActions={<QuickActions />}
      stats={<StatsCards />}
      profile={<ProfileCard />}
      recentOrders={<RecentOrders />}
      offerBanner={<OfferBanner />} header={undefined}    />
  );
}

export default Dashboard;