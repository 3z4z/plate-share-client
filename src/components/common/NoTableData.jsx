import { Link } from "react-router";

export default function NoTableDataComponent({ text, action, actionPath }) {
  return (
    <div className="bg-base-200 rounded-lg flex flex-col items-center py-16 shadow">
      <p className="text-error/75 font-medium text-lg">{text}</p>
      {action ? (
        <Link
          to={actionPath}
          className="mt-6 btn btn-primary px-6 rounded-full"
        >
          {action}
        </Link>
      ) : null}
    </div>
  );
}
