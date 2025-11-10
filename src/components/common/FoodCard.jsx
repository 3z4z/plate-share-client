import {
  MdOutlineCalendarMonth,
  MdOutlineLocationOn,
  MdOutlinePerson,
} from "react-icons/md";
import dayjs from "dayjs";
import { Link, useLocation } from "react-router";

export default function FoodCard({ food }) {
  const {
    _id: id,
    food_status,
    name,
    image,
    quantity,
    pickup_location,
    expire_date,
    donor_name,
  } = food;
  console.log("food_status", food_status);
  const { pathname } = useLocation();
  return (
    <div
      className={`flex flex-col justify-between ${
        pathname.includes("foods") ? "p-4" : "p-6 "
      } rounded-xl shadow bg-white transition-all hover:-translate-y-2 duration-300 hover:shadow-lg group hover:bg-secondary/5`}
    >
      <div>
        <figure className="rounded-xl border border-gray-100 w-full aspect-[5/3.5] overflow-hidden flex items-center justify-center relative">
          <div className="badge bg-white badge-sm font-semibold text-success absolute top-2 right-2">
            {food_status}
          </div>
          <img src={image} alt="" className="object-cover h-full w-full" />
        </figure>
        <h4 className="text-2xl my-3 group-hover:text-primary transition-all">
          {name}
        </h4>
        <p className="font-semibold mb-6">
          <span className="me-1 text-primary text-lg">{quantity}</span>
          <span>Fresh Plates Left</span>
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-sm gap-2">
            <div>
              <MdOutlinePerson className="w-4 h-4 text-secondary" />
            </div>
            <p>{donor_name}</p>
          </div>
          <div className="flex items-center text-sm gap-2">
            <div>
              <MdOutlineLocationOn className="w-4 h-4 text-secondary" />
            </div>
            <p>{pickup_location}</p>
          </div>
          <div className="flex items-center text-sm gap-2">
            <MdOutlineCalendarMonth className="w-4 h-4 text-secondary" />
            <p>
              Until
              <span className="ms-1 font-medium">
                {dayjs(expire_date).format("DD MMMM, YYYY")}
              </span>
            </p>
          </div>
        </div>
      </div>
      <Link
        to={`/food/${id}`}
        className="btn btn-block btn-secondary btn-outline mt-6 text-nowrap"
      >
        View Details
      </Link>
    </div>
  );
}
