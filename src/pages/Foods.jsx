import { useEffect } from "react";
import { useFoodsStore } from "../stores/useFoodsStore";
import FoodCard from "../components/common/FoodCard";
import { container } from "../utils/classNames";
import { Link } from "react-router";
import SpinnerLoader from "../components/loaders/SpinnerLoader";
import CardSkeletonLoader from "../components/loaders/CardSkeletonLoader";
import { useAuthStore } from "../stores/useAuthStore";

export default function FoodsPage() {
  const { availableFoods, setAvailableFoods, isFoodsLoading } = useFoodsStore();
  const { user } = useAuthStore();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setAvailableFoods();
  }, [setAvailableFoods]);
  return (
    <div className={container}>
      <title>Available Foods | PlateShare</title>
      <div className="flex justify-between my-10 flex-wrap gap-4">
        <h1 className="sm:text-3xl text-2xl flex items-center gap-2">
          {isFoodsLoading ? (
            <SpinnerLoader color={"text-base-content"} size={"loading-xl"} />
          ) : (
            <span>{availableFoods.length}</span>
          )}
          <span>Foods Available to get</span>
        </h1>
        {user ? (
          <div className="flex gap-2">
            <Link
              to={"/dashboard/my-foods"}
              className="btn btn-primary px-6 rounded-full"
            >
              My Donations
            </Link>
            <Link
              to={"/dashboard/my-requests"}
              className="btn btn-secondary btn-soft px-6 rounded-full"
            >
              My Requests
            </Link>
          </div>
        ) : null}
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:max-w-full max-w-sm mx-auto gap-4">
        {isFoodsLoading ? (
          <CardSkeletonLoader />
        ) : (
          availableFoods.map((food) => {
            return <FoodCard food={food} key={food._id} />;
          })
        )}
      </div>
    </div>
  );
}
