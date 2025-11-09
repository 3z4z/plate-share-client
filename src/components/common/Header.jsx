import { Link } from "react-router";
import { container } from "../../utils/classNames";
import NavbarComponent from "./Navbar";
import BrandLogoComponent from "./BrandLogo";
import userImg from "../../assets/user.png";
import { HiMenuAlt1 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { navLinks } from "../../utils/navLinks";
import { useState } from "react";

export default function HeaderComponent() {
  const authActions = [
    { title: "Login", path: "/auth/login" },
    { title: "Register", path: "/auth/register" },
  ];

  const [isDockOpen, setIsDockOpen] = useState(false);

  return (
    <header className="bg-white relative z-50">
      <div className={`${container} py-5 flex items-center justify-between`}>
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
        <div className="dropdown dropdown-end block lg:hidden">
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
        <div className="lg:w-1/4 lg:flex hidden justify-end items-center gap-3 **:px-6">
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
