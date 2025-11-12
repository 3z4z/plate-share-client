import { useEffect } from "react";
import { useFoodsStore } from "../../stores/useFoodsStore";
import CommonTitleComponent from "../common/CommonTitle";
import FoodCard from "../common/FoodCard";

import { GiKnifeFork } from "react-icons/gi";
import { Link } from "react-router";
import CardSkeletonLoader from "../loaders/CardSkeletonLoader";
import { largeBtn } from "../../utils/classNames";

export default function FeaturedFoodsComponent() {
  const { featuredFoods, setFeaturedFoods, isFoodsLoading } = useFoodsStore();
  useEffect(() => {
    setFeaturedFoods();
  }, [setFeaturedFoods]);
  return (
    <section>
      <CommonTitleComponent
        title={"Plates with Plenty"}
        subtitle={
          "Meals with the most to share—fresh, ready, and waiting for you."
        }
        margins={"mt-28 mb-18"}
      />
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 sm:max-w-full max-w-md mx-auto gap-6">
        {isFoodsLoading ? (
          <CardSkeletonLoader />
        ) : (
          featuredFoods.map((food) => (
            <FoodCard
              isFoodsLoading={isFoodsLoading}
              food={food}
              key={food._id}
            />
          ))
        )}
      </div>
      <div className="flex justify-center">
        <Link to={"/foods"} className={`${largeBtn} mt-12 group`}>
          <GiKnifeFork className="transition-all group-hover:rotate-360 duration-700 text-xl" />
          <span className="ms-1">Show All Plates</span>
        </Link>
      </div>
    </section>
  );
}
