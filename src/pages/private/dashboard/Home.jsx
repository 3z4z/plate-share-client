import { useAuthStore } from "../../../stores/useAuthStore";

export default function DbHomePage() {
  const { user, isAuthLoading } = useAuthStore();
  console.log("isAuthLoading", isAuthLoading);
  return (
    <>
      <h1 className="text-2xl font-bold! text-center py-4">
        👋 Hello {user?.displayName || "User"}!
      </h1>
    </>
  );
}
