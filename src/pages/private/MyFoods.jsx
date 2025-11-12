import { useEffect } from "react";
import { useFoodsStore } from "../../stores/useFoodsStore";
import { useAuthStore } from "../../stores/useAuthStore";
import FoodsTable from "../../components/tables/FoodsTable";
import CommonTitleComponent from "../../components/common/CommonTitle";
import SpinnerLoader from "../../components/loaders/SpinnerLoader";

export default function MyFoodsPage() {
  const { user } = useAuthStore();
  const { setMyFoods, myFoods, isFoodsLoading } = useFoodsStore();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (user) {
      setMyFoods(user.email);
    }
  }, [setMyFoods, user]);
  return (
    <div className="px-3 max-w-[1600px] mx-auto ">
      <CommonTitleComponent title={"My Shared Plates"} margins={"my-7"} />
      <h5 className="md:text-xl md:mb-5 mb-2 md:pt-0 pt-5">
        <span>Your Total Shares:</span>
        <span className="text-primary ms-1">
          {isFoodsLoading ? (
            <SpinnerLoader size={"loading-xl"} />
          ) : (
            myFoods.length
          )}
        </span>
      </h5>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white">
        <FoodsTable foods={myFoods} isLoading={isFoodsLoading} />
      </div>
    </div>
  );
}
