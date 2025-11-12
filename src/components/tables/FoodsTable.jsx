import dayjs from "dayjs";
import { Link } from "react-router";
import { useState } from "react";
import FoodDeleteConfirmModal from "../modals/FoodDeleteConfirmModal";
import SpinnerLoader from "../loaders/SpinnerLoader";
import FieldSkeletonLoader from "../loaders/FieldSkeletonLoader";
import cookingIcon from "../../assets/cooking.png";
import NoTableDataComponent from "../common/NoTableData";

export default function FoodsTable({ foods, isLoading }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <>
      {foods.length > 0 ? (
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th className="w-1/16">Sl No.</th>
              <th className="w-6/16">Name</th>
              <th className="w-2/16">Created On</th>
              <th className="w-2/16 text-center">Quantity</th>
              <th className="w-2/16 text-center">Availability</th>
              <th className="w-3/16 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food, index) => {
              const {
                _id: id,
                name,
                image,
                created_at,
                quantity,
                food_status,
              } = food;
              const handleDeleteModalOpen = () => {
                setIsDeleteModalOpen(true);
              };
              return (
                <tr
                  data-aos="fade-top"
                  key={index}
                  className="even:bg-base-100 *:py-1.5"
                >
                  <td className="font-bold ps-5">
                    {isLoading ? (
                      <SpinnerLoader size={"loading-sm"} />
                    ) : (
                      index + 1 || "#"
                    )}
                  </td>
                  <td>
                    <div className="flex gap-3 items-center">
                      <div>
                        {isLoading ? (
                          <SpinnerLoader
                            size={"loading-xl"}
                            color={"text-base-content"}
                          />
                        ) : (
                          <figure className="w-10 h-10 rounded-sm flex items-center justify-center border border-base-300 bg-gray-300 overflow-hidden">
                            <img
                              src={image || cookingIcon}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </figure>
                        )}
                      </div>
                      {isLoading ? (
                        <FieldSkeletonLoader />
                      ) : (
                        <span className="font-medium">
                          {name || "Unknown / Deleted"}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    {isLoading ? (
                      <FieldSkeletonLoader />
                    ) : (
                      dayjs(created_at).format("DD MMM, YYYY") || "Unknown"
                    )}
                  </td>
                  <td className="text-center">
                    {isLoading ? (
                      <FieldSkeletonLoader />
                    ) : (
                      quantity || "Unknown"
                    )}
                  </td>
                  <td className="text-center">
                    {isLoading ? (
                      <FieldSkeletonLoader />
                    ) : (
                      <div
                        className={`badge badge-sm ${
                          food_status === "Available"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {food_status || "Unknown"}
                      </div>
                    )}
                  </td>
                  <td>
                    {isLoading ? (
                      <FieldSkeletonLoader />
                    ) : (
                      <div className="flex gap-3 justify-center items-center">
                        <Link
                          to={`/food/${id}`}
                          className="btn btn-primary btn-sm rounded-full"
                        >
                          View
                        </Link>
                        <Link
                          to={`/edit-food/${id}`}
                          className="btn btn-secondary btn-sm rounded-full"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={handleDeleteModalOpen}
                          className="btn btn-error btn-soft btn-sm rounded-full"
                        >
                          Delete
                        </button>
                        <FoodDeleteConfirmModal
                          setIsDeleteModalOpen={setIsDeleteModalOpen}
                          isDeleteModalOpen={isDeleteModalOpen}
                          id={id}
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
        <NoTableDataComponent
          text={`You didn't share a food yet.`}
          action={"Add Food"}
          actionPath={"/add-food"}
        />
      )}
    </>
  );
}
