import { Controller, useForm } from "react-hook-form";
import { regex, validationMessage } from "../../utils/regex";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import { useEffect } from "react";

export default function FoodForm({ food = {}, onSubmit, user, isUserSame }) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: food || {
      name: "",
      image: "",
      quantity: null,
      pickup_location: "",
      expire_date: null,
      description: "",
      donor_name: "",
      donor_email: "",
      donor_image: "",
      food_status: "",
    },
  });
  useEffect(() => {
    if (food && user) {
      reset({
        name: food.name || "",
        image: food.image || "",
        quantity: food.quantity || null,
        pickup_location: food.pickup_location || "",
        expire_date: food.expire_date ? new Date(food.expire_date) : null,
        description: food.description || "",
        donor_name: food.donor_name || user.displayName || "",
        donor_email: food.donor_email || user.email || "",
        donor_image: food.donor_image || user.photoURL || "",
        food_status: food.food_status || "",
      });
    }
  }, [food, reset, user]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fieldset max-w-2xl mx-auto bg-white pb-8 pt-10 px-12 rounded-lg shadow-lg"
    >
      <fieldset disabled={!isUserSame}>
        <div className="flex gap-3 mb-3">
          <div className="flex-1">
            <label className="font-medium pb-2 inline-block">Donor Name</label>
            <input
              type="text"
              placeholder="Donor Name"
              disabled
              className="input rounded-full bg-transparent w-full border-accent/8 disabled:bg-base-100"
              {...register(
                "donor_name"
                //   {
                //   required: "Donor Name is Required!",
                //   minLength: {
                //     value: 3,
                //     message: validationMessage.name,
                //   },
                // }
              )}
            />
            {errors.donor_name && (
              <p className="text-error mt-0.5">{errors.donor_name.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="font-medium pb-2 inline-block ">
              Donor Email
            </label>
            <input
              type="email"
              disabled
              placeholder="Donor Email"
              className="input rounded-full bg-transparent w-full border-accent/8 disabled:bg-base-100"
              {...register(
                "donor_email"
                //   {
                //   required: "Donor Email is required!",
                //   pattern: {
                //     value: regex.email,
                //     message: validationMessage.email,
                //   },
                // }
              )}
            />
            {/* {errors.donor_email && (
              <p className="text-error mt-0.5">{errors.donor_email.message}</p>
            )} */}
          </div>
        </div>
        <label className="font-medium">Donor Image Url</label>
        <input
          type="text"
          disabled
          placeholder="https://..."
          className="input rounded-full bg-transparent w-full border-accent/8 disabled:bg-base-100"
          {...register("donor_image")}
        />
        <div className="flex gap-3 mb-3 mt-3">
          <div className="flex-1">
            <label className="font-medium pb-2 inline-block">Food Name</label>
            <input
              type="text"
              placeholder="Cheeseburger"
              className="input rounded-full bg-transparent w-full border-accent/8 disabled:bg-base-100"
              {...register("name", {
                required: "Food Name is required!",
                minLength: {
                  value: 3,
                  message: "Food Name is too short",
                },
              })}
            />
            {errors.name && (
              <p className="text-error mt-0.5">{errors.name.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="font-medium pb-2 inline-block">Food Image</label>
            <input
              type="text"
              placeholder="https://..."
              className="input rounded-full bg-transparent w-full border-accent/8 disabled:bg-base-100"
              {...register("image", {
                required: "Food Image is required",
                pattern: {
                  value: regex.imageUrl,
                  message: validationMessage.imageUrl,
                },
              })}
            />
            {errors.image && (
              <p className="text-error mt-0.5">{errors.image.message}</p>
            )}
          </div>
        </div>
        <div className="flex gap-3 mb-3">
          <div className="max-w-36">
            <label className="font-medium pb-2 inline-block">Quantity</label>
            <input
              type="number"
              placeholder="10"
              className="input rounded-full bg-transparent w-full border-accent/8 disabled:bg-base-100"
              {...register("quantity", {
                required: "Quantity is Required!",
                min: {
                  value: 1,
                  message: "Too little to share",
                },
                valueAsNumber: true,
              })}
            />
            {errors.quantity && (
              <p className="text-error mt-0.5">{errors.quantity.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="font-medium pb-2 inline-block">Food Status</label>
            <select
              defaultValue=""
              className="select w-full bg-white border-accent/8 rounded-full disabled:bg-base-100"
              {...register("food_status", {
                required: "Food Status is Required",
                validate: (value) =>
                  value !== "Unavailable" || "Unavailable is not allowed",
              })}
            >
              <option value="" disabled>
                Select a status
              </option>
              <option value={"Available"}>Available</option>
              <option value={"Unavailable"}>Unavailable</option>
            </select>

            {errors.food_status && (
              <p className="text-error mt-0.5">{errors.food_status.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="font-medium pb-2 inline-block">
              Expiration Date
            </label>
            <Controller
              control={control}
              name="expire_date"
              rules={{
                required: "Expiration Date is Required",
                validate: (date) => {
                  if (!date) return true;
                  const today = dayjs().startOf("day");
                  const selected = dayjs(date).startOf("day");
                  return selected.isAfter(today) || "Must select a valid date!";
                },
              }}
              render={({ field }) => (
                <DatePicker
                  dateFormat={"dd/MM/YYYY"}
                  placeholderText="dd/MM/YYYY"
                  className="input w-full bg-transparent border-accent/8 rounded-full disabled:bg-base-100"
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                />
              )}
            />
            {errors.expire_date && (
              <p className="text-error mt-0.5">{errors.expire_date.message}</p>
            )}
          </div>
        </div>
        <label className="font-medium">Pickup Location</label>
        <input
          type="text"
          placeholder="Jatrabari, Dhaka"
          className="input rounded-full bg-transparent w-full border-accent/8 disabled:bg-base-100"
          {...register("pickup_location", {
            required: "Pickup Location is required!",
            validate: (value) =>
              (value && value.toLowerCase().includes("dhaka")) ||
              "Outside Dhaka is not allowed for now",
            minLength: {
              value: 5,
              message: "Location is too short",
            },
          })}
        />

        {errors.pickup_location && (
          <p className="text-error mt-0.5">{errors.pickup_location.message}</p>
        )}
        <label className="font-medium mt-3">Additional Notes</label>
        <textarea
          placeholder="Add some description"
          rows={6}
          className="textarea w-full resize-none rounded-2xl bg-transparent border-accent/8 disabled:bg-base-100"
          {...register("description")}
        ></textarea>
        <div className="flex flex-col items-center mt-3">
          <button
            disabled={!isValid || !isUserSame}
            className="btn btn-primary px-8 w-max rounded-full"
          >
            {food?._id ? "Update Plate" : "Add Plate"}
          </button>
          {!isUserSame && (
            <p className="text-error mt-2">
              This plate is owned by another user!
            </p>
          )}
        </div>
      </fieldset>
    </form>
  );
}
