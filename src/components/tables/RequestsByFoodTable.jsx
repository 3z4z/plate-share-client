import { useEffect } from "react";
import { useRequestStore } from "../../stores/useRequestStore";
import { useAuthStore } from "../../stores/useAuthStore";
import { useFoodsStore } from "../../stores/useFoodsStore";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { hotToastInfoConfig } from "../../configs/toastConfigs";

export default function RequestsByFoodTable({ foodId }) {
  const { setRequestsByFood, requestsByFood, manageARequest } =
    useRequestStore();
  const { setFood, food } = useFoodsStore();
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
    isMyFood && (
      <div className="mt-16">
        <h5 className="text-xl mb-5">
          <span>Requests for your plate:</span>
          <span className="text-primary ms-1">{requestsByFood.length}</span>
        </h5>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white">
          <table className="table">
            <thead className="bg-base-200">
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
              {requestsByFood.length > 0 ? (
                requestsByFood.map((request, index) => {
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
                      manageARequest(requestId, action);
                      console.log(
                        "accepted request for foodId:",
                        requesterName
                      );
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
                      manageARequest(requestId, action);
                      console.log(requesterName, "Rejected");
                      toast.error(
                        `Rejected ${requesterName}'s request!`,
                        hotToastInfoConfig
                      );
                    } catch (error) {
                      toast.error(error.response.data);
                    }
                  };
                  return (
                    <tr key={index}>
                      <td className="w-1/16">{index + 1}</td>
                      <td className="w-3/16">
                        <div className="flex items-center gap-3">
                          <div>
                            <figure className="w-10 h-10 rounded-sm flex items-center justify-center border border-base-300 bg-gray-300 overflow-hidden">
                              <img
                                src={requesterImage}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </figure>
                          </div>
                          <div>
                            <p className="text-secondary font-medium">
                              {requesterName}
                            </p>
                            <p className="text-xs">{requesterEmail}</p>
                          </div>
                        </div>
                      </td>
                      <td className="w-4/16 min-w-48">
                        <p>{location}</p>
                        <p className="text-secondary text-xs">{contactNo}</p>
                      </td>
                      <td className="w-4/16 min-w-60">{requestReason}</td>
                      <td className="w-1/8 text-center">
                        <div
                          className={`badge badge-sm ${
                            requestStatus === "Pending"
                              ? "badge-warning"
                              : requestStatus === "Accepted"
                              ? "badge-success"
                              : "badge-error"
                          }`}
                        >
                          {requestStatus}
                        </div>
                      </td>
                      <td className="w-1/8">
                        <div className="flex gap-3">
                          <button
                            className="btn btn-xs btn-success"
                            onClick={handleAccept}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-xs btn-error btn-soft"
                            onClick={handleReject}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-10 text-center ">
                    <p className="text-xl text-error mb-6">
                      No one requested yet.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
}
