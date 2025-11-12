import { Link } from "react-router";
import errorImg from "../assets/404.png";
import { largeBtn } from "../utils/classNames";

export default function ErrorPage() {
  return (
    <div className="h-dvh w-full flex items-center flex-col mt-20 px-3 text-center">
      <title>404 Not Found</title>
      <div>
        <figure className="max-w-md">
          <img src={errorImg} alt="" />
        </figure>
      </div>
      <p className="text-gray-400/75 font-medium text-xl mt-10 mb-3">
        404: Not Found
      </p>
      <p className="text-error font-medium text-2xl mb-10">
        Looks like your requested Page isn't ready yet!
      </p>
      <Link to={-1} className={largeBtn}>
        Take me Back
      </Link>
    </div>
  );
}
