import { RiMenuUnfold4Line } from "react-icons/ri";
import { toggleTheme } from "../../utils/toggleTheme";
import { useEffect, useState } from "react";
import { MdOutlineExitToApp, MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import { Link } from "react-router";
import { useAuthStore } from "../../stores/useAuthStore";
import SpinnerLoader from "../loaders/SpinnerLoader";
import toast from "react-hot-toast";
import { hotTostSuccessConfig } from "../../configs/toastConfigs";
export default function DbNavbarComponent() {
  const { user, isAuthLoading, signOut } = useAuthStore();
  const [themeState, setThemeState] = useState("light");
  const htmlElement = document.documentElement;
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setThemeState(storedTheme);
      htmlElement.setAttribute("data-theme", storedTheme);
    } else {
      setThemeState("light");
      htmlElement.setAttribute("data-theme", "light");
    }
  }, [htmlElement]);
  const handleLogout = async () => {
    signOut();
    toast.success("Logged out successfully!", hotTostSuccessConfig);
  };
  return (
    <nav className="navbar w-full bg-base-200 shadow justify-between">
      <div className="flex items-center">
        <label
          htmlFor="dashboard"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <RiMenuUnfold4Line className="size-5" />
        </label>
        <Link to={"/"} className="px-4 text-primary font-bold">
          PlateShare
        </Link>
      </div>
      <div>
        {isAuthLoading ? (
          <SpinnerLoader />
        ) : (
          <div className="dropdown dropdown-end px-0">
            <div
              tabIndex={0}
              role="button"
              className="btn w-12 h-12 p-0 rounded-full"
            >
              <img
                src={user.photoURL}
                alt=""
                className="w-9 h-9 rounded-full"
              />
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-200 border border-base-200 shadow-lg rounded-box z-1 w-60 p-2 gap-1"
            >
              <li>
                <button className="text-error" onClick={handleLogout}>
                  <MdOutlineExitToApp className="rotate-180 text-xl" />
                  Log out
                </button>
              </li>
            </ul>
          </div>
        )}
        <button
          className="btn p-1 size-10 rounded-full ms-2"
          onClick={() => toggleTheme(themeState, setThemeState, htmlElement)}
        >
          {themeState === "light" ? (
            <MdOutlineWbSunny className="size-5" />
          ) : (
            <IoMoonOutline className="size-5" />
          )}
        </button>
      </div>
    </nav>
  );
}
