import { Outlet } from "react-router";
import FooterComponent from "../components/Footer";
import HeaderComponent from "../components/Header";

export default function HomeLayout() {
  return (
    <div>
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </div>
  );
}
