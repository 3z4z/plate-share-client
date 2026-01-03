import { Outlet } from "react-router";
import FooterComponent from "../components/common/Footer";
import HeaderComponent from "../components/common/Header";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/swal.css";

export default function HomeLayout() {
  AOS.init({
    once: true,
  });
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
