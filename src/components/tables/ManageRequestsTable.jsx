import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import NoTableDataComponent from "../common/NoTableData";
import SpinnerLoader from "../loaders/SpinnerLoader";
import useAxios from "../../hooks/useAxios";
import { useRequestStore } from "../../stores/useRequestStore";
import toast from "react-hot-toast";
import {
  hotToastInfoConfig,
  hotTostSuccessConfig,
} from "../../configs/toastConfigs";

export default function ManageRequestsTable({ requests, isRequestsLoading }) {
  const [foods, setFoods] = useState({});
  const { manageARequest } = useRequestStore();
  const axios = useAxios();
  useEffect(() => {
    const ids = [...new Set(requests.map((r) => r.foodId).filter(Boolean))];

    if (ids.length > 0) {
      Promise.all(ids.map((id) => axiosInstance.get(`/foods/${id}`))).then(
        (responses) => {
          const foodMap = {};
          responses.forEach((res, i) => {
            foodMap[ids[i]] = res.data;
          });
          setFoods(foodMap);
        }
      );
    }
  }, [requests]);

  const handleAccept = async (id) => {
    try {
      await axios.patch(`/requests/${id}`, {
        requestStatus: "Accepted",
      });
      manageARequest(id, "Accepted");
      toast.success(`Request has been accepted!`, hotTostSuccessConfig);
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  const handleReject = async (id) => {
    try {
      await axios.patch(`/requests/${id}`, {
        requestStatus: "Rejected",
      });
      manageARequest(id, "Rejected");
      toast.error(`Request has been rejected!`, hotToastInfoConfig);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <>
      {isRequestsLoading ? (
        <SpinnerLoader color={"text-primary"} />
      ) : requests.length > 0 ? (
        <table className="table">
          <thead className="bg-base-300">
            <tr>
              <th>Sl No.</th>
              <th>Requester Name</th>
              <th>Location</th>
              <th>Reason</th>
              <th>Food Info</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((r, i) => {
              const {
                _id: requestId,
                foodId,
                requesterName,
                requesterEmail,
                requesterImage,
                contactNo,
                location,
                requestReason,
                requestStatus,
              } = r;

              const food = foods[foodId];

              return (
                <tr key={requestId}>
                  <td>{i + 1}</td>
                  <td className="flex gap-3 items-center">
                    <figure className="w-9 h-9 rounded-full overflow-hidden">
                      <img src={requesterImage} alt="" />
                    </figure>
                    <div>
                      <p className="font-semibold">{requesterName}</p>
                      <p>{requesterEmail}</p>
                    </div>
                  </td>

                  <td>
                    <p>{location}</p>
                    <p>{contactNo}</p>
                  </td>

                  <td>{requestReason}</td>
                  <td className="min-w-52">
                    {food ? (
                      <div className="flex items-center gap-3">
                        <img
                          src={food.image}
                          alt={food.name}
                          className="w-12 h-12 rounded-lg"
                        />
                        <span className="font-bold">{food.name}</span>
                      </div>
                    ) : (
                      <span className="opacity-50">Loading food…</span>
                    )}
                  </td>

                  <td>
                    <span
                      className={`badge badge-sm ${
                        requestStatus.toLowerCase() === "accepted"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {requestStatus}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-3">
                      <button
                        className="btn btn-sm btn-success rounded-full"
                        onClick={() => handleAccept(requestId)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-sm btn-error btn-soft rounded-full"
                        onClick={() => handleReject(requestId)}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <NoTableDataComponent text={"No Requests in the list."} />
      )}
    </>
  );
}
