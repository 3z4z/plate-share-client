import { NavLink } from "react-router";
import { navLinks } from "../../utils/navLinks";

export default function NavbarComponent() {
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
      </nav>
    </>
  );
}
