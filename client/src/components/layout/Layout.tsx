import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import ScrollToTop from "../common/ScrollToTop";
function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
        <ScrollToTop />
      </main>
    </>
  );
}

export default Layout;