import { useEffect } from "react";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useRequestStore } from "../../../stores/useRequestStore";
import CommonTitleComponent from "../../../components/common/CommonTitle";
import SpinnerLoader from "../../../components/loaders/SpinnerLoader";
import ManageRequestsTable from "../../../components/tables/ManageRequestsTable";

export default function ManageRequestsPage() {
  const { user } = useAuthStore();
  const { setRequests, requests, isRequestsLoading } = useRequestStore();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (user) {
      setRequests(user?.email);
    }
  }, [setRequests, user]);
  return (
    <>
      <title>Manage Requests | PlateShare</title>
      <div className="px-3 max-w-[1600px] mx-auto ">
        <CommonTitleComponent title={"Manage requests"} margins={"my-7"} />
        <h5 className="md:text-xl md:mb-5 mb-2 md:pt-0 pt-5">
          <span>Total Requests:</span>
          <span className="text-primary ms-1">
            {isRequestsLoading ? (
              <SpinnerLoader size={"loading-xl"} />
            ) : (
              requests.length
            )}
          </span>
        </h5>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <ManageRequestsTable
            requests={requests}
            isRequestsLoading={isRequestsLoading}
          />
        </div>
      </div>
    </>
  );
}
