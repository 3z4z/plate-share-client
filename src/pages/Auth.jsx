import { Outlet } from "react-router";

export default function AuthPage() {
  return (
    <div className="w-full min-h-dvh bg-linear-to-b from-secondary from-50% to-white to-50% flex items-center justify-center px-3">
      <Outlet />
    </div>
  );
}
