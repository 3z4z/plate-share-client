import { useEffect } from "react";
import { useFoodsStore } from "../stores/useFoodsStore";
import FoodCard from "../components/common/FoodCard";
import { container } from "../utils/classNames";
import { Link } from "react-router";

export default function FoodsPage() {
  const { availableFoods, setAvailableFoods, isFoodsLoading } = useFoodsStore();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setAvailableFoods();
  }, [setAvailableFoods]);
  return (
    <div className={container}>
      <div className="flex justify-between my-10 flex-wrap gap-4">
        <h1 className="sm:text-3xl text-2xl">
          {isFoodsLoading ? "..." : availableFoods.length} Foods Available to
          get
        </h1>
        <div className="flex gap-2">
          <Link to={"/my-foods"} className="btn btn-primary px-6 rounded-full">
            My Donations
          </Link>
          <Link
            to={"/my-requests"}
            className="btn btn-secondary btn-soft px-6 rounded-full"
          >
            My Requests
          </Link>
        </div>
      </div>
      {isFoodsLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:max-w-full max-w-sm mx-auto gap-4">
          {availableFoods.map((food) => {
            return <FoodCard food={food} key={food._id} />;
          })}
        </div>
      )}
    </div>
  );
}
