import { useParams } from "react-router";
import { useFoodsStore } from "../../stores/useFoodsStore";
import { useEffect } from "react";
import WindowLoader from "../../components/loaders/windowLoader/WindowLoader";
import { container } from "../../utils/classNames";
import { useAuthStore } from "../../stores/useAuthStore";

export default function FoodDetailsPage() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { food, setFood, isFoodsLoading, setMyFoods, myFoods } =
    useFoodsStore();
  const isMyFood = myFoods.find((food) => food._id === id);
  useEffect(() => {
    if (user) {
      setMyFoods(user.email);
    }
    if (id) {
      setFood(id);
    }
  }, [setFood, id, setMyFoods, user]);
  return (
    <>
      {isFoodsLoading ? (
        <WindowLoader />
      ) : (
        <div className={container}>
          <h1 className="text-4xl mt-6 mb-10">{food.name}</h1>
          <div className="flex gap-3">
            {isMyFood ? (
              <p>This is your food</p>
            ) : (
              <button className="btn btn-primary">Request Food</button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
