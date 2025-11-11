import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";
import { useRequestStore } from "../../stores/useRequestStore";

export default function RequestDeleteConfirmModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  foodId,
  request,
}) {
  const axios = useAxios();
  const { deleteRequest } = useRequestStore();
  const handleRequestDelete = async () => {
    console.log("Delete works", foodId);
    try {
      const res = await axios.delete(`/requests/${request._id}`);
      if (res.status === 200) {
        deleteRequest(request._id);
        toast.success("Request Deleted!");
        setIsDeleteModalOpen(false);
      } else {
        toast.error("Something is wrong!");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <dialog className={`modal ${isDeleteModalOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <p className="text-3xl py-6 text-center font-semibold">Are you Sure?</p>
        <p className="text-center pb-8">
          You are going to delete this Request.
        </p>
        <div className="modal-action justify-center">
          <form method="dialog" className="gap-3 flex items-center">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-secondary btn-outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button className="btn btn-error" onClick={handleRequestDelete}>
              Delete
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
