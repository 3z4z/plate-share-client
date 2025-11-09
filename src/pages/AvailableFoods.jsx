import { useEffect } from "react";
import { useFoodsStore } from "../stores/useFoodsStore";

export default function AvailableFoodsPage() {
  const { foods, setFoods, isFoodsLoading } = useFoodsStore();

  useEffect(() => {
    setFoods();
  }, [setFoods]);
  return (
    <>
      <p>this is available foods page</p>
      {isFoodsLoading ? <p>Loading...</p> : <p>{foods.length} available</p>}
    </>
  );
}
