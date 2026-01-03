import { NavLink } from "react-router";

import { HiOutlineViewGridAdd } from "react-icons/hi";
import { PiBowlFood, PiGearSixBold } from "react-icons/pi";
import { RiShareForward2Line, RiUserLine } from "react-icons/ri";
import { FiGrid } from "react-icons/fi";

export default function DdSidebarComponent() {
  const sidebarLinks = [
    {
      link: "/dashboard",
      title: "Homepage",
      icon: FiGrid,
    },
    {
      link: "/dashboard/add-food",
      title: "Add Food",
      icon: HiOutlineViewGridAdd,
    },
    {
      link: "/dashboard/my-foods",
      title: "My Foods Shares",
      icon: RiShareForward2Line,
    },
    {
      link: "/dashboard/my-requests",
      title: "My Food Requests",
      icon: PiBowlFood,
    },
    {
      link: "/dashboard/manage-requests",
      title: "Manage Requests",
      icon: PiGearSixBold,
    },
    {
      link: "/dashboard/my-profile",
      title: "My Profile",
      icon: RiUserLine,
    },
  ];
  return (
    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      <ul className="menu w-full grow">
        {sidebarLinks.map((l, i) => (
          <li key={i}>
            <NavLink
              to={l.link}
              end={l.link === "/dashboard"}
              className={({ isActive }) =>
                `is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                  isActive && "bg-primary text-neutral"
                }`
              }
              data-tip={l.title}
            >
              <l.icon className="my-1.5 size-4.5" />
              <span className="is-drawer-close:hidden text-nowrap">
                {l.title}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
