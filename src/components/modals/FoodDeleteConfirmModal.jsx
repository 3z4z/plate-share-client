import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";
import { useFoodsStore } from "../../stores/useFoodsStore";

export default function FoodDeleteConfirmModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  id,
}) {
  const { deleteFood } = useFoodsStore();
  const axios = useAxios();

  const handleFoodDelete = async () => {
    try {
      const res = await axios.delete(`/foods/${id}`);
      if (res.status === 200) {
        deleteFood(id);
        toast.success("Deleted your donation!");
        setIsDeleteModalOpen(false);
      } else {
        toast.error("Something is wrong!");
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };
  return (
    <dialog className={`modal ${isDeleteModalOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <p className="text-3xl py-6 text-center font-semibold">Are you Sure?</p>
        <p className="text-center pb-8">You are going to delete this Plate.</p>
        <div className="modal-action justify-center">
          <form method="dialog" className="gap-3 flex items-center">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-secondary btn-outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button className="btn btn-error" onClick={handleFoodDelete}>
              Delete
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
