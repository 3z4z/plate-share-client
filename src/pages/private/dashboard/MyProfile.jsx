import { useAuthStore } from "../../../stores/useAuthStore";
import CommonTitleComponent from "../../../components/common/CommonTitle";
import WindowLoader from "../../../components/loaders/windowLoader/WindowLoader";
import { BiEditAlt } from "react-icons/bi";
import { useRef } from "react";
import UpdateProfileModal from "../../../components/modals/UpdateProfileModal";

export default function MyProfilePage() {
  const { user, isAuthLoading } = useAuthStore();
  const updateProfileModalRef = useRef();
  const handleUpdateProfileModalOpen = () => {
    updateProfileModalRef.current.showModal();
    console.log("clicked");
  };
  if (isAuthLoading) return <WindowLoader />;
  return (
    <>
      <title>Manage Requests | PlateShare</title>
      <div className="px-3 max-w-[1600px] mx-auto ">
        <CommonTitleComponent title={"My Profile"} margins={"my-7"} />
        <div className="bg-base-200 rounded-2xl shadow py-6 px-1">
          <div className="max-w-xl mx-auto w-full bg-base-100 py-4 md:px-4 px-2 rounded-xl">
            <figure className="border-3 border-primary/25 rounded-lg overflow-hidden w-28 h-28 flex items-center justify-center mb-5">
              <img
                src={user?.photoURL}
                alt=""
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="flex gap-3">
              <p>Name:</p>
              <p className="font-semibold">{user?.displayName}</p>
            </div>
            <div className="flex gap-3 mt-1">
              <p>Email:</p>
              <p className="font-semibold">{user?.email}</p>
            </div>
            <button
              onClick={handleUpdateProfileModalOpen}
              className="btn btn-primary rounded-full mt-5 px-5"
            >
              <BiEditAlt className="size-4" />
              Update Profile
            </button>
          </div>
        </div>
      </div>
      <UpdateProfileModal modalRef={updateProfileModalRef} />
    </>
  );
}
