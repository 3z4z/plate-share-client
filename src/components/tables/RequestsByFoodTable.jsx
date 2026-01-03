import { useEffect } from "react";
import { useRequestStore } from "../../stores/useRequestStore";
import { useAuthStore } from "../../stores/useAuthStore";
import { useFoodsStore } from "../../stores/useFoodsStore";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { hotToastInfoConfig } from "../../configs/toastConfigs";
import FieldSkeletonLoader from "../loaders/FieldSkeletonLoader";
import SpinnerLoader from "../loaders/SpinnerLoader";
import cookingIcon from "../../assets/cooking.png";
import NoTableDataComponent from "../common/NoTableData";

export default function RequestsByFoodTable({ foodId, isLoading }) {
  const { setRequestsByFood, requestsByFood, manageARequest } =
    useRequestStore();
  const { setFood, food, setFoods } = useFoodsStore();
  const { user } = useAuthStore();
  const axios = useAxios();
  useEffect(() => {
    if (user && foodId) {
      setRequestsByFood(foodId);
      setFood(foodId);
    }
  }, [setRequestsByFood, foodId, setFood, user]);
  const isMyFood = food.donor_email === user.email;

  return (
    <>
      {requestsByFood.length > 0
        ? isMyFood && (
            <div className="mt-16">
              <h5 className="text-xl mb-5">
                {isLoading ? (
                  <div className="max-w-60">
                    <FieldSkeletonLoader />
                  </div>
                ) : (
                  <>
                    <span>Requests for your plate:</span>
                    <span className="text-primary ms-1">
                      {isLoading ? (
                        <SpinnerLoader
                          size={"loading-xl"}
                          color={"text-primary"}
                        />
                      ) : (
                        requestsByFood.length
                      )}
                    </span>
                  </>
                )}
              </h5>
              <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                  <thead className="bg-base-300">
                    <tr>
                      <th className="w-1/16">Sl No.</th>
                      <th className="w-3/16">Requester Name</th>
                      <th className="w-3/16">Location</th>
                      <th className="w-5/16">Reason</th>
                      <th className="w-2/16 text-center">Request Status</th>
                      <th className="w-2/16 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestsByFood.map((request, index) => {
                      const {
                        _id: requestId,
                        requesterName,
                        requesterEmail,
                        requesterImage,
                        contactNo,
                        location,
                        requestReason,
                        requestStatus,
                      } = request;
                      const handleAccept = async () => {
                        const action = "Accepted";
                        try {
                          await axios.patch(`/requests/${requestId}`, {
                            requestStatus: action,
                          });
                          setFood(foodId);
                          setRequestsByFood(foodId);
                          setFoods();

                          manageARequest(requestId, action);
                          toast.success(`Accepted ${requesterName}'s request!`);
                        } catch (error) {
                          toast.error(error.response.data);
                        }
                      };
                      const handleReject = async () => {
                        const action = "Rejected";
                        try {
                          await axios.patch(`/requests/${requestId}`, {
                            requestStatus: action,
                          });
                          setFood(foodId);
                          setRequestsByFood(foodId);
                          setFoods();

                          manageARequest(requestId, action);
                          toast.error(
                            `Rejected ${requesterName}'s request!`,
                            hotToastInfoConfig
                          );
                        } catch (error) {
                          toast.error(error.response.data);
                        }
                      };
                      return (
                        <tr
                          data-aos="fade-top"
                          className="even:bg-base-200 *:py-1.5"
                          key={index}
                        >
                          <td className="w-1/16">
                            {isLoading ? (
                              <FieldSkeletonLoader />
                            ) : (
                              index + 1 || "#"
                            )}
                          </td>
                          <td className="w-3/16">
                            <div className="flex items-center gap-3">
                              <div>
                                {isLoading ? (
                                  <SpinnerLoader size={"loading-xl"} />
                                ) : (
                                  <figure className="w-10 h-10 rounded-sm flex items-center justify-center border border-base-300 bg-gray-300 overflow-hidden">
                                    <img
                                      src={requesterImage || cookingIcon}
                                      alt=""
                                      className="w-full h-full object-cover"
                                    />
                                  </figure>
                                )}
                              </div>
                              <div className="w-full">
                                <div
                                  className={`text-secondary font-medium ${
                                    isLoading ? "mb-1" : ""
                                  }`}
                                >
                                  {isLoading ? (
                                    <FieldSkeletonLoader />
                                  ) : (
                                    <p>{requesterName || "Unknown"}</p>
                                  )}
                                </div>
                                <div>
                                  {isLoading ? (
                                    <FieldSkeletonLoader />
                                  ) : (
                                    <p className="text-xs">
                                      {requesterEmail || "Unknown"}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="w-4/16 min-w-48">
                            <div className={`${isLoading ? "mb-1" : ""}`}>
                              {isLoading ? (
                                <FieldSkeletonLoader />
                              ) : (
                                <p>{location || "Unknown"}</p>
                              )}
                            </div>
                            <div className="text-secondary text-xs">
                              {isLoading ? (
                                <FieldSkeletonLoader />
                              ) : (
                                <p>{contactNo || "Unknown"}</p>
                              )}
                            </div>
                          </td>
                          <td className="w-4/16 min-w-60">
                            {isLoading ? (
                              <FieldSkeletonLoader />
                            ) : (
                              requestReason || "Unknown"
                            )}
                          </td>
                          <td className="w-1/8 text-center">
                            {isLoading ? (
                              <FieldSkeletonLoader />
                            ) : (
                              <div
                                className={`badge badge-sm ${
                                  requestStatus === "Pending"
                                    ? "badge-warning"
                                    : requestStatus === "Accepted"
                                    ? "badge-success"
                                    : "badge-error"
                                }`}
                              >
                                {requestStatus || "Unknown"}
                              </div>
                            )}
                          </td>
                          <td className="w-1/8">
                            {isLoading ? (
                              <FieldSkeletonLoader />
                            ) : (
                              <div className="flex gap-3">
                                <button
                                  className="btn btn-sm btn-success rounded-full"
                                  onClick={handleAccept}
                                >
                                  Accept
                                </button>
                                <button
                                  className="btn btn-sm btn-error btn-soft rounded-full"
                                  onClick={handleReject}
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )
        : isMyFood && (
            <NoTableDataComponent text={"No Requests for this plate."} />
          )}
    </>
  );
}
