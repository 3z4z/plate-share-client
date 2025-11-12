import { Link } from "react-router";
import { largeBtn } from "../utils/classNames";

export default function InvalidProductComponent() {
  return (
    <div className="flex flex-col items-center py-10">
      <p className="text-2xl text-error font-medium mb-10">
        Looks like your requested Plate isn't ready yet
      </p>
      <Link to={"/foods"} className={largeBtn}>
        Check Available Plates
      </Link>
    </div>
  );
}
