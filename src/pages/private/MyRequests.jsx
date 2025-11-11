import { useEffect } from "react";
import { useRequestStore } from "../../stores/useRequestStore";
import { useAuthStore } from "../../stores/useAuthStore";
import MyRequestsTable from "../../components/tables/MyRequestsTable";

export default function MyRequestsPage() {
  const { user } = useAuthStore();
  const { myRequests, setMyRequests, isRequestsLoading } = useRequestStore();
  useEffect(() => {
    if (user) {
      setMyRequests(user.email);
    }
  }, [setMyRequests, user]);
  return (
    <>
      {isRequestsLoading ? (
        <p>Loading...</p>
      ) : (
        <MyRequestsTable myRequests={myRequests} />
      )}
    </>
  );
}
