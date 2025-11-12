import { Link } from "react-router";
import { useFoodsStore } from "../../stores/useFoodsStore";
import { useEffect, useState } from "react";
import RequestDeleteConfirmModal from "../modals/RequestDeleteConfirmModal";
import cookingIcon from "../../assets/cooking.png";
import SpinnerLoader from "../loaders/SpinnerLoader";
import FieldSkeletonLoader from "../loaders/FieldSkeletonLoader";
import NoTableDataComponent from "../common/NoTableData";

export default function MyRequestsTable({ myRequests }) {
  const { foods, setFoods, isFoodsLoading } = useFoodsStore();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState();
  useEffect(() => {
    setFoods();
  }, [setFoods]);
  return (
    <>
      {myRequests.length > 0 ? (
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
            {myRequests.map((request, index) => {
              const { requestStatus, foodId } = request;
              const requestedFood = foods.find((food) => food._id === foodId);
              return (
                <tr
                  data-aos="fade-top"
                  key={index}
                  className="even:bg-base-100 *:py-1.5"
                >
                  <td className="font-bold ps-5">{index + 1 || "#"}</td>
                  <td>
                    <div className="flex gap-3 items-center">
                      <div>
                        {isFoodsLoading ? (
                          <SpinnerLoader size={"loading-xl"} />
                        ) : (
                          <figure className="w-10 h-10 rounded-sm flex items-center justify-center border border-base-300 bg-gray-300 overflow-hidden">
                            <img
                              src={requestedFood?.image || cookingIcon}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </figure>
                        )}
                      </div>
                      {isFoodsLoading ? (
                        <FieldSkeletonLoader />
                      ) : (
                        <span>
                          {requestedFood?.name || "Unknown / Deleted"}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    {isFoodsLoading ? (
                      <FieldSkeletonLoader />
                    ) : (
                      <p>{requestedFood?.donor_name || "Unknown"}</p>
                    )}
                    <div className={`text-xs ${isFoodsLoading ? "mt-1" : ""}`}>
                      {isFoodsLoading ? (
                        <FieldSkeletonLoader />
                      ) : (
                        <p>
                          <span className="me-1">Pickup:</span>
                          <span>
                            {requestedFood?.pickup_location || "Unknown"}
                          </span>
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="text-center">
                    {isFoodsLoading ? (
                      <FieldSkeletonLoader />
                    ) : (
                      <p>{requestedFood?.quantity || "Unknown"}</p>
                    )}
                  </td>
                  <td className="text-center">
                    {isFoodsLoading ? (
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
                  <td>
                    {isFoodsLoading ? (
                      <FieldSkeletonLoader />
                    ) : (
                      <div className="flex gap-3 justify-center items-center">
                        <Link
                          to={`/food/${foodId}`}
                          className="btn btn-primary btn-sm rounded-full"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => setIsDeleteModalOpen(true)}
                          className="btn btn-error btn-soft btn-sm rounded-full"
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
                    )}
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
