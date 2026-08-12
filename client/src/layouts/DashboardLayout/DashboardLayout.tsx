import type { ReactNode } from "react";

import Sidebar from "../../components/admin/sidebar/Sidebar";
import Header from "../../components/admin/header/Header";
import "./DashboardLayout.css";

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Header />

        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;