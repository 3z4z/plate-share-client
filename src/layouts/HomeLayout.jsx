import { useAuthStore } from "../stores/useAuthStore";
import { Outlet } from "react-router";
import FooterComponent from "../components/common/Footer";
import HeaderComponent from "../components/common/Header";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/swal.css";

export default function HomeLayout() {
  AOS.init({
    once: true,
  });
  const { initAuthListener } = useAuthStore();
  useEffect(() => {
    const unsubscribe = initAuthListener();
    return () => unsubscribe();
  }, [initAuthListener]);
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
