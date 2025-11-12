import { useEffect } from "react";
import { useFoodsStore } from "../../stores/useFoodsStore";

import { GiKnifeFork } from "react-icons/gi";

import CommonTitleComponent from "../common/CommonTitle";
import FoodCard from "../common/FoodCard";
import CardSkeletonLoader from "../loaders/CardSkeletonLoader";
import { largeBtnIcon } from "../../utils/classNames";
import LargeBtn from "../common/LargeBtn";

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
        <LargeBtn
          path={"/foods"}
          title={"Show All Plates"}
          customClass={"mt-12 group"}
          icon={<GiKnifeFork className={largeBtnIcon} />}
        />
      </div>
    </section>
  );
}
