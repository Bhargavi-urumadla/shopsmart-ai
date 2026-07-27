import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      {/* Animated Background */}
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>
      <div className="background-grid"></div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="admin-main">
        <Header />

        <motion.main
          className="admin-content"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
          }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default AdminLayout;