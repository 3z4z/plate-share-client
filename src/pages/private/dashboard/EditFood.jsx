import { useNavigate, useParams } from "react-router";
import CommonTitleComponent from "../../../components/common/CommonTitle";
import { useFoodsStore } from "../../../stores/useFoodsStore";
import { useEffect } from "react";
import FoodForm from "../../../components/forms/FoodForm";
import { useAuthStore } from "../../../stores/useAuthStore";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

export default function EditFoodPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthStore();
  const { food, setFood, updateFood } = useFoodsStore();
  const axios = useAxios();
  useEffect(() => {
    setFood(id);
  }, [setFood, id]);
  useEffect(() => {
    if (!food) return;
  }, [food, navigate, user]);
  const isUserSame = food.donor_email === user.email;
  const handleFoodEdit = (data) => {
    console.log("Trying to edit:", food.name);
    try {
      if (food) {
        const payload = {
          ...data,
          expire_date: data.expire_date ? data.expire_date.toISOString() : null,
          edited_at: new Date().toISOString(),
          donor_name: user.displayName,
          donor_email: user.email,
          donor_image: user.photoURL,
        };
        axios.patch(`/foods/${food._id}`, payload);
        toast.success("Edited Successfully");
        updateFood(payload);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  return (
    <section>
      <title>Edit Food | PlateShare</title>
      <CommonTitleComponent
        title={"Edit Your Meal"}
        subtitle={
          "It only takes a few steps to share your meal with someone in need."
        }
        margins={"my-10"}
      />
      {food && (
        <FoodForm
          food={food}
          isUserSame={isUserSame}
          onSubmit={handleFoodEdit}
          user={user}
        />
      )}
    </section>
  );
}
