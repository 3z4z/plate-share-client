import dayjs from "dayjs";
import CommonTitleComponent from "../common/CommonTitle";
import { Link } from "react-router";
import { useState } from "react";
import FoodDeleteConfirmModal from "../modals/FoodDeleteConfirmModal";

export default function FoodsTable({ foods }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <div className="px-3 max-w-[1600px] mx-auto ">
      <CommonTitleComponent title={"My Shared Plates"} margins={"my-7"} />
      <h5 className="text-xl mb-5">
        <span>Your Total Shares:</span>
        <span className="text-primary ms-1">{foods.length}</span>
      </h5>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white">
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
            {foods.length > 0 ? (
              foods.map((food, index) => {
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
                  <tr key={index} className="odd:bg-base-100 *:py-1.5">
                    <td className="font-bold ps-5">{index + 1}</td>
                    <td>
                      <div className="flex gap-3 items-center">
                        <div>
                          <figure className="w-10 h-10 rounded-sm flex items-center justify-center border border-base-300 bg-gray-300 overflow-hidden">
                            <img
                              src={image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </figure>
                        </div>
                        <span>{name}</span>
                      </div>
                    </td>
                    <td>{dayjs(created_at).format("DD MMM, YYYY")}</td>
                    <td className="text-center">{quantity}</td>
                    <td className="text-center">
                      <div
                        className={`badge badge-sm ${
                          food_status === "Available"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {food_status}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-3 justify-center items-center">
                        <Link
                          to={`/food/${id}`}
                          className="btn btn-primary btn-sm"
                        >
                          View
                        </Link>
                        <Link
                          to={`/edit-food/${id}`}
                          className="btn btn-secondary btn-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={handleDeleteModalOpen}
                          className="btn btn-error btn-soft btn-sm"
                        >
                          Delete
                        </button>
                        <FoodDeleteConfirmModal
                          setIsDeleteModalOpen={setIsDeleteModalOpen}
                          isDeleteModalOpen={isDeleteModalOpen}
                          id={id}
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
                    No Foods in the list
                  </p>
                  <Link
                    to={"/add-food"}
                    className="btn btn-primary px-6 rounded-full"
                  >
                    Add a food
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
