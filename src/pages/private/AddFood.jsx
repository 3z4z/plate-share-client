import { useFoodsStore } from "../../stores/useFoodsStore";
import CommonTitleComponent from "../../components/common/CommonTitle";
import { useAuthStore } from "../../stores/useAuthStore";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";
import FoodForm from "../../components/forms/FoodForm";

export default function AddFoodPage() {
  const { addNewFood } = useFoodsStore();
  const { user } = useAuthStore();
  const axios = useAxios();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const handleAddFood = async (data) => {
    const payload = {
      ...data,
      created_at: new Date().toISOString(),
      expire_date: data.expire_date ? data.expire_date.toISOString() : null,
    };
    try {
      const res = await axios.post("/foods", payload);
      addNewFood(res.data);
      toast.success("Added Successfully!");
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error(err.response.data);
        console.log("err", err);
      } else {
        toast.error("Failed to add food.");
      }
    }
  };
  return (
    <section>
      <title>Add a food | PlateShare</title>
      <CommonTitleComponent
        title={"Share Your Meal"}
        subtitle={
          "It only takes a few steps to share your meal with someone in need."
        }
        margins={"my-10"}
      />
      <FoodForm onSubmit={handleAddFood} food={{}} user={user} />
    </section>
  );
}
