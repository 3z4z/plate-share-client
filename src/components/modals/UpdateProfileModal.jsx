import { useForm } from "react-hook-form";
import { useAuthStore } from "../../stores/useAuthStore";
import { useEffect } from "react";
import WindowLoader from "../loaders/windowLoader/WindowLoader";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import {
  hotTostErrorConfig,
  hotTostSuccessConfig,
} from "../../configs/toastConfigs";

export default function UpdateProfileModal({ modalRef }) {
  const { user, isAuthLoading, updateUser } = useAuthStore();
  const axios = useAxios();
  const { register, handleSubmit, reset } = useForm({
    mode: "all",
  });
  useEffect(() => {
    if (!user) return;
    if (user) {
      reset({
        name: user?.displayName,
        image: user?.photoURL,
      });
    }
  }, [user, reset]);
  if (isAuthLoading) return <WindowLoader />;
  const handleUpdate = async (data) => {
    console.log(data);
    try {
      await updateUser(data.name, data.image);
      await axios.patch(`/users/${user?.email}`);
      toast.success("Success!", hotTostSuccessConfig);
    } catch (err) {
      toast.success(
        err.response.message || err.response || "Error!",
        hotTostErrorConfig
      );
    }
  };
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box md:px-10 px-6 py-8">
        <form onSubmit={handleSubmit(handleUpdate)} className="fieldset">
          <label>Full Name</label>
          <input
            type="text"
            className="input w-full rounded-full"
            {...register("name")}
          />
          <label className="mt-2">Photo Url</label>
          <input
            type="text"
            className="input w-full rounded-full"
            {...register("image")}
          />
          <div className="modal-action">
            <button className="btn btn-primary rounded-full">Update</button>
            <button type="button" className="btn btn-secondary rounded-full">
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
