import { useForm } from "react-hook-form";
import { useAuthStore } from "../../stores/useAuthStore";
import useAxios from "../../hooks/useAxios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRequestStore } from "../../stores/useRequestStore";

export default function RequestFoodForm({ id }) {
  const axios = useAxios();
  const { user } = useAuthStore();
  const { addRequest, setIsRequestModalOpen } = useRequestStore();
  const { handleSubmit, reset, register } = useForm({
    mode: "onChange",
    defaultValues: {
      requesterName: user.displayName || "",
      requesterEmail: user.email || "",
      requesterImage: user.photoURL || "",
      contactNo: "",
      location: "",
      requestReason: "",
    },
  });
  useEffect(() => {
    reset({
      requesterName: user.displayName,
      requesterEmail: user.email,
      requesterImage: user.photoURL,
    });
  }, [reset, user]);
  const handleRequestSubmit = async (data) => {
    try {
      const res = await axios.post("/requests", {
        ...data,
        foodId: id,
        requestStatus: "Pending",
      });
      toast.success("Requested Successfully!");
      addRequest(res.data);
      setIsRequestModalOpen(false);
      reset();
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error(err.response?.data || "Already Requested!");
      } else {
        toast.error("Failed to send request.");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(handleRequestSubmit)} className="fieldset">
      <h3 className="text-2xl mb-5 text-center">Request Plate</h3>
      <label>Your Name</label>
      <input
        type="text"
        placeholder="Your name"
        className="input w-full resize-none rounded-2xl bg-transparent border-accent/8 disabled:bg-base-100"
        disabled
        {...register("requesterName")}
      />
      <label>Your Email</label>
      <input
        type="email"
        placeholder="Your email"
        className="input w-full resize-none rounded-2xl bg-transparent border-accent/8 disabled:bg-base-100"
        disabled
        {...register("requesterEmail")}
      />
      <label>Your Image Url</label>
      <input
        type="email"
        placeholder="https://..."
        className="input w-full resize-none rounded-2xl bg-transparent border-accent/8 disabled:bg-base-100"
        disabled
        {...register("requesterImage")}
      />
      <label className="mt-3">Contact No</label>
      <input
        type="text"
        placeholder="Contact No"
        className="input w-full resize-none rounded-2xl bg-transparent border-accent/8 disabled:bg-base-100"
        {...register("contactNo")}
      />
      <label className="mt-3">Location</label>
      <input
        type="text"
        placeholder="Location"
        className="input w-full resize-none rounded-2xl bg-transparent border-accent/8 disabled:bg-base-100"
        {...register("location")}
      />
      <label className="mt-3">Why do you need this?</label>
      <textarea
        className="textarea w-full resize-none rounded-2xl bg-transparent border-accent/8 disabled:bg-base-100"
        {...register("requestReason")}
      ></textarea>
      <div className="text-center mt-8">
        <button className="btn btn-primary w-max px-8 rounded-full">
          Request Now
        </button>
      </div>
    </form>
  );
}
