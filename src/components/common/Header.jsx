import { Link } from "react-router";
import { container } from "../../utils/classNames";
import NavbarComponent from "./Navbar";
import BrandLogoComponent from "./BrandLogo";
import userImg from "../../assets/user.png";
import { HiMenuAlt1 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { navLinks } from "../../utils/navLinks";
import { useState } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import SpinnerLoader from "../loaders/SpinnerLoader";
import { MdOutlineExitToApp } from "react-icons/md";
import { PiBowlFood, PiGearSixBold } from "react-icons/pi";
import { HiOutlineViewGridAdd } from "react-icons/hi";

export default function HeaderComponent() {
  const { user, isAuthLoading, signOut } = useAuthStore();
  const authActions = [
    { title: "Login", path: "/auth/login" },
    { title: "Register", path: "/auth/register" },
  ];

  const userActions = [
    {
      title: "Add Food",
      path: "/add-food",
      icon: <HiOutlineViewGridAdd className="text-xl" />,
    },
    {
      title: "Manage My Foods",
      path: "/my-foods",
      icon: <PiGearSixBold className="text-xl" />,
    },
    {
      title: "My Food Requests",
      path: "/my-requests",
      icon: <PiBowlFood className="text-xl" />,
    },
    {
      title: "Logout",
      path: "",
      icon: <MdOutlineExitToApp className="rotate-180 text-xl" />,
    },
  ];

  const handleSignOut = () => {
    signOut();
  };

  const [isDockOpen, setIsDockOpen] = useState(false);

  return (
    <header className="bg-white relative z-50 py-15">
      <div
        className={`${container} md:w-full w-[calc(100%-1rem)]! py-5 flex items-center justify-between shadow-md rounded-full bg-base-100 border border-base-300/35 fixed top-3 left-1/2 -translate-x-1/2`}
      >
        <div className="lg:w-1/4 flex items-center">
          <button
            onClick={() => setIsDockOpen(true)}
            className="btn lg:hidden h-auto bg-transparent shadow-none border-0 pe-4 ps-0"
          >
            <HiMenuAlt1 className="text-2xl text-accent" />
          </button>
          <Link to="/">
            <BrandLogoComponent />
          </Link>
        </div>
        <div className="lg:w-1/2 hidden lg:block">
          <NavbarComponent />
        </div>
        <div className="lg:w-1/4 flex justify-end items-center gap-3">
          {isAuthLoading ? (
            <SpinnerLoader size={"loading-lg"} color={"text-primary"} />
          ) : !user ? (
            <>
              <div
                className={`dropdown dropdown-end ${
                  user ? "hidden" : "block lg:hidden"
                }`}
              >
                <div
                  tabIndex={0}
                  role="button"
                  className="btn w-10 h-10 p-0 rounded-full"
                >
                  <img src={userImg} alt="" className="w-8" />
                </div>
                <ul
                  tabIndex={-1}
                  className="dropdown-content menu bg-base-100 rounded-box z-2 w-52 p-2 shadow-sm"
                >
                  {authActions.map((link, index) => (
                    <li key={index}>
                      <Link
                        className={`link link-hover py-2.5 hover:bg-white border border-transparent rounded-full ${
                          link.path.includes("login")
                            ? "link-primary hover:border-primary active:border-primary"
                            : "link-secondary hover:border-secondary active:border-secondary"
                        }`}
                        to={link.path}
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:flex hidden justify-end gap-2">
                {authActions.map((link, index) => (
                  <Link
                    key={index}
                    className={`btn rounded-full ${
                      link.path.includes("login")
                        ? "btn-primary btn-outline"
                        : "btn-secondary"
                    }`}
                    to={link.path}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </>
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
                className="dropdown-content menu bg-white border border-base-200 shadow-lg rounded-box z-1 w-60 p-2 gap-1"
              >
                {userActions.map((link, index) =>
                  link.title.toLowerCase().includes("logout") ? (
                    <button
                      onClick={handleSignOut}
                      key={index}
                      className="btn bg-transparent rounded-full font-medium! border-0 shadow-none text-error hover:bg-error/15 py-2 px-4 justify-start"
                    >
                      {link.icon}
                      {link.title}
                    </button>
                  ) : (
                    <Link
                      key={index}
                      className="btn bg-transparent rounded-full font-medium! border-0 shadow-none hover:bg-primary/15 py-2 px-4 justify-start"
                      to={link.path}
                    >
                      {link.icon}
                      {link.title}
                    </Link>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      {isDockOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsDockOpen(false)}
          ></div>

          <div className="fixed top-0 left-0 h-full w-80 bg-base-100 z-50 shadow-lg animate-slideIn">
            <div className="flex items-center justify-between mt-4 mb-6 px-4">
              <BrandLogoComponent />
              <button
                onClick={() => setIsDockOpen(false)}
                className="btn h-auto bg-transparent shadow-none border-0"
              >
                <RxCross2 className="text-2xl text-accent" />
              </button>
            </div>
            <ul className="menu p-4 w-full">
              {navLinks.map((link, index) => (
                <li
                  key={index}
                  className="border-b last:border-b-0 border-b-secondary/20"
                >
                  <Link
                    to={link.path}
                    className="hover:bg-primary/70 py-3"
                    onClick={() => setIsDockOpen(false)}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </header>
  );
}
