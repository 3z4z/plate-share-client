import { Outlet } from "react-router";
import DdSidebarComponent from "../components/dashboard/Sidebar";
import DbNavbarComponent from "../components/dashboard/Navbar";
export default function DashboardLayout() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <DbNavbarComponent />
        <Outlet />
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="dashboard"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <DdSidebarComponent />
      </div>
    </div>
  );
}
