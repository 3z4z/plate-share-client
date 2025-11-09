import { Outlet } from "react-router";
import FooterComponent from "../components/common/Footer";
import HeaderComponent from "../components/common/Header";

export default function HomeLayout() {
  return (
    <div className="flex flex-col h-dvh">
      <HeaderComponent />
      <div className="flex-1">
        <Outlet />
      </div>
      <FooterComponent />
    </div>
  );
}
