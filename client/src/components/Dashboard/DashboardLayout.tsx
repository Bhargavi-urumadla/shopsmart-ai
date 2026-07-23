import "./DashboardLayout.css";
interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  hero: React.ReactNode;
  quickActions: React.ReactNode;
  stats: React.ReactNode;
  profile: React.ReactNode;
  recentOrders: React.ReactNode;
  offerBanner: React.ReactNode;
}

function DashboardLayout({
  sidebar,
  header,
  hero,
  quickActions,
  stats,
  profile,
  recentOrders,
  offerBanner,
}: DashboardLayoutProps) {
  return (
    <div className="dashboard-container">

      <aside className="dashboard-sidebar">
        {sidebar}
      </aside>

      <main className="dashboard-main">
         {header}

        <section className="dashboard-hero">
          {hero}
        </section>

        <section className="dashboard-content">

         <div className="dashboard-left">
  {quickActions}
  {stats}
  {/* {offerBanner} */}
</div>

          <div className="dashboard-right">
            {profile}
            {recentOrders}
          </div>

        </section>

      </main>

    </div>
  );
}

export default DashboardLayout;