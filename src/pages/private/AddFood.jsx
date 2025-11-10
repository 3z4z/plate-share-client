// import { Controller, useForm } from "react-hook-form";
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
  // const formMethods = useForm({
  //   mode: "onChange",
  //   defaultValues: {
  //     name: "",
  //     image: "",
  //     quantity: null,
  //     pickup_location: "",
  //     expire_date: null,
  //     description: "",
  //     donor_name: "",
  //     donor_email: "",
  //     donor_image: "",
  //     food_status: "",
  //   },
  // });

  // const { reset, handleSubmit } = formMethods;
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // setFoods();
    // if (user) {
    //   // reset({
    //   //   donor_email: user.email,
    //   //   donor_name: user.displayName,
    //   //   donor_image: user.photoURL,
    //   // });
    // }
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
      // reset({
      //   name: "",
      //   image: "",
      //   quantity: null,
      //   pickup_location: "",
      //   expire_date: null,
      //   description: "",
      //   donor_name: "",
      //   donor_email: "",
      //   donor_image: "",
      //   food_status: "",
      // });
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error(err.response.data);
      } else {
        toast.error("Failed to add food.");
      }
    }
  };
  return (
    <section>
      <CommonTitleComponent
        title={"Share Your Meal"}
        subtitle={
          "It only takes a few steps to share your meal with someone in need."
        }
        margins={"my-10"}
      />
      <FoodForm
        onSubmit={handleAddFood}
        // formMethods={formMethods}
        food={{}}
        user={user}
      />
    </section>
  );
}
