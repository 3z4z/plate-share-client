import { Link } from "react-router";

export default function LoggedInCard() {
  return (
    <div className="bg-base-100 p-10 rounded-lg flex flex-col items-center max-w-sm w-full shadow-lg">
      <p className="text-lg">You're Already Logged in</p>
      <Link to={-1} className="btn btn-neutral mt-9 w-max">
        Go Back
      </Link>
    </div>
  );
}
