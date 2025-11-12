import { useEffect } from "react";
import { useRequestStore } from "../../stores/useRequestStore";
import { useAuthStore } from "../../stores/useAuthStore";
import MyRequestsTable from "../../components/tables/MyRequestsTable";
import CommonTitleComponent from "../../components/common/CommonTitle";
import SpinnerLoader from "../../components/loaders/SpinnerLoader";

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
      <div className="px-3 max-w-[1600px] mx-auto ">
        <CommonTitleComponent title={"My Requested Plates"} margins={"my-7"} />
        <h5 className="md:text-xl md:mb-5 mb-2 md:pt-0 pt-5">
          <span>Your Total Requests:</span>
          <span className="text-primary ms-1">
            {isRequestsLoading ? (
              <SpinnerLoader size={"loading-xl"} />
            ) : (
              myRequests.length
            )}
          </span>
        </h5>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white">
          <MyRequestsTable myRequests={myRequests} />
        </div>
      </div>
      {/* {isRequestsLoading ? (
        <p>Loading...</p>
      ) : (
      )} */}
    </>
  );
}
