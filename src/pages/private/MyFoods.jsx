import { useEffect } from "react";
import { useFoodsStore } from "../../stores/useFoodsStore";
import { useAuthStore } from "../../stores/useAuthStore";
import FoodsTableComponent from "../../components/common/FoodsTable";

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
    <>
      {isFoodsLoading ? (
        <p>Loading...</p>
      ) : (
        <FoodsTableComponent foods={myFoods} />
      )}
    </>
  );
}
