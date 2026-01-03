import { useRequestStore } from "../../stores/useRequestStore";
import RequestFoodForm from "../forms/RequestFoodForm";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function RequestFoodModal({ id }) {
  const { isRequestModalOpen, setIsRequestModalOpen } = useRequestStore();
  const closeModal = () => {
    setIsRequestModalOpen(false);
  };
  return (
    <dialog className={`modal ${isRequestModalOpen ? "modal-open" : ""}`}>
      <div className="modal-box bg-base-100">
        <div className="text-end">
          <button
            className="transition-all hover:text-error cursor-pointer"
            onClick={closeModal}
          >
            <IoIosCloseCircleOutline className="w-7 h-7" />
          </button>
        </div>
        <RequestFoodForm id={id} />
      </div>
    </dialog>
  );
}
