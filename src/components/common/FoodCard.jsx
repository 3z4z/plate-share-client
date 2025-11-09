import { MdOutlineCalendarMonth, MdOutlineLocationOn } from "react-icons/md";
import dayjs from "dayjs";

export default function FoodCard({ food }) {
  const { name, image, quantity, pickup_location, expire_date } = food;
  return (
    <div className="flex flex-col justify-between p-6 rounded-xl shadow bg-white transition-all hover:-translate-y-2 duration-300 hover:shadow-lg group hover:bg-secondary/5">
      <div>
        <figure className="rounded-xl border border-gray-100 w-full aspect-[5/3.5] overflow-hidden flex items-center justify-center">
          <img src={image} alt="" className="object-cover" />
        </figure>
        <h4 className="text-2xl my-3 group-hover:text-primary transition-all">
          {name}
        </h4>
        <p className="font-semibold mb-6">
          <span className="me-1 text-primary text-lg">{quantity}</span>
          <span>Fresh Plates Left</span>
        </p>
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center text-sm gap-2">
            <MdOutlineLocationOn className="w-4 h-4" />
            <p>{pickup_location}</p>
          </div>
          <div className="flex items-center text-sm gap-2">
            <MdOutlineCalendarMonth className="w-4 h-4" />
            <p>{dayjs(expire_date).format("DD MMMM, YYYY")}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex gap-3 flex-wrap">
        <button className="btn btn-secondary flex-1 text-nowrap">
          Request Food
        </button>
        <button className="btn btn-secondary btn-outline flex-1 text-nowrap">
          View Details
        </button>
      </div>
    </div>
  );
}
