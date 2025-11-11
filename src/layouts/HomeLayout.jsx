import { useAuthStore } from "../stores/useAuthStore";
import { Outlet } from "react-router";
import FooterComponent from "../components/common/Footer";
import HeaderComponent from "../components/common/Header";
import { useEffect } from "react";

export default function HomeLayout() {
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
