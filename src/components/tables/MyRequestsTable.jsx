import { Link } from "react-router";
import CommonTitleComponent from "../common/CommonTitle";
import { useFoodsStore } from "../../stores/useFoodsStore";
import { useEffect, useState } from "react";
import RequestDeleteConfirmModal from "../modals/RequestDeleteConfirmModal";

export default function MyRequestsTable({ myRequests }) {
  const { availableFoods, setAvailableFoods, isFoodsLoading } = useFoodsStore();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState();
  useEffect(() => {
    setAvailableFoods();
  }, [setAvailableFoods]);
  return (
    <div className="px-3 max-w-[1600px] mx-auto ">
      <CommonTitleComponent title={"My Requested Plates"} margins={"my-7"} />
      <h5 className="text-xl mb-5">
        <span>Your Total Requests:</span>
        <span className="text-primary ms-1">{myRequests.length}</span>
      </h5>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th className="w-1/16">Sl No.</th>
              <th className="w-4/16">Requested Foods</th>
              <th className="w-3/16">Plate Owner</th>
              <th className="w-2/16 text-center">Quantity</th>
              <th className="w-2/16 text-center">Request Status</th>
              <th className="w-3/16 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myRequests.length > 0 ? (
              myRequests.map((request, index) => {
                const { requestStatus, foodId } = request;
                const requestedFood = availableFoods.find(
                  (food) => food._id === foodId
                );
                return (
                  <tr key={index}>
                    <td className="font-bold ps-5">{index + 1}</td>
                    <td>
                      <div className="flex gap-3 items-center">
                        <div>
                          <figure className="w-10 h-10 rounded-sm flex items-center justify-center border border-base-300 bg-gray-300 overflow-hidden">
                            <img
                              src={
                                isFoodsLoading
                                  ? "https://picsum.photos/200/300.jpg"
                                  : requestedFood?.image ||
                                    "https://via.placeholder.com/50"
                              }
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </figure>
                        </div>
                        <span>
                          {isFoodsLoading
                            ? "Loading..."
                            : requestedFood?.name || "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <p>
                        {isFoodsLoading
                          ? "Loading..."
                          : requestedFood?.donor_name || "Unknown"}
                      </p>
                      <p className="text-xs">
                        <span className="me-1">Pickup:</span>
                        {isFoodsLoading
                          ? "Loading..."
                          : requestedFood?.pickup_location || "Unknown"}
                      </p>
                    </td>
                    <td className="text-center">
                      {isFoodsLoading
                        ? "Loading..."
                        : requestedFood?.quantity || "Unknown"}
                    </td>
                    <td className="text-center">
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
                    <td>
                      <div className="flex gap-3 justify-center items-center">
                        <Link
                          to={`/food/${foodId}`}
                          className="btn btn-primary btn-sm"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => setIsDeleteModalOpen(true)}
                          className="btn btn-error btn-soft btn-sm"
                        >
                          Delete
                        </button>
                        <RequestDeleteConfirmModal
                          isDeleteModalOpen={isDeleteModalOpen}
                          setIsDeleteModalOpen={setIsDeleteModalOpen}
                          foodId={foodId}
                          request={request}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-10 text-center ">
                  <p className="text-xl text-error mb-6">
                    No Requests in the list
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
