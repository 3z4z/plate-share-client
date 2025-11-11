import { useParams } from "react-router";
import { useFoodsStore } from "../../stores/useFoodsStore";
import { useEffect } from "react";
import WindowLoader from "../../components/loaders/windowLoader/WindowLoader";
import { container } from "../../utils/classNames";
import { useAuthStore } from "../../stores/useAuthStore";
import { useRequestStore } from "../../stores/useRequestStore";
import RequestFoodModal from "../../components/modals/RequestFoodModal";
import RequestsByFoodTable from "../../components/tables/RequestsByFoodTable";

export default function FoodDetailsPage() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { food, setFood, isFoodsLoading, setMyFoods, myFoods } =
    useFoodsStore();
  const isMyFood = myFoods.find((food) => food._id === id);
  const { setIsRequestModalOpen } = useRequestStore();
  useEffect(() => {
    if (user) {
      setMyFoods(user.email);
    }
    if (id) {
      setFood(id);
    }
  }, [setFood, id, setMyFoods, user]);
  const openRequestModal = () => {
    setIsRequestModalOpen(true);
  };
  return (
    <>
      {isFoodsLoading ? (
        <WindowLoader />
      ) : (
        <div className={container}>
          <h1 className="text-4xl mt-6 mb-10">{food.name}</h1>
          <p
            className={`badge ${
              food.food_status === "Available"
                ? "badge-success"
                : "badge-warning"
            }`}
          >
            {food.food_status}
          </p>
          <div className="flex gap-3">
            {isMyFood ? (
              <p>This is your food</p>
            ) : (
              <button onClick={openRequestModal} className="btn btn-primary">
                Request Food
              </button>
            )}
          </div>
          <RequestFoodModal id={id} />
          <RequestsByFoodTable foodId={id} />
        </div>
      )}
    </>
  );
}
