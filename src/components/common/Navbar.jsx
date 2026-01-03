import { Link, NavLink } from "react-router";
import { navLinks } from "../../utils/navLinks";
import { useAuthStore } from "../../stores/useAuthStore";

export default function NavbarComponent() {
  const { user } = useAuthStore();
  return (
    <>
      <nav className="lg:flex hidden justify-center gap-2">
        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              `btn btn-ghost rounded-full px-5 ${isActive && "bg-base-300"}`
            }
          >
            {link.title}
          </NavLink>
        ))}
        {user && (
          <Link to={"/dashboard"} className="btn btn-ghost rounded-full px-5">
            Dashboard
          </Link>
        )}
      </nav>
    </>
  );
}
