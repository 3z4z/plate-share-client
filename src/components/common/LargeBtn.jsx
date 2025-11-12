import { Link } from "react-router";
import { largeBtn } from "../../utils/classNames";

export default function LargeBtn({ path, icon, customClass, title }) {
  return (
    <Link to={path} className={`${largeBtn} ${customClass}`}>
      {icon}
      <span className={`${icon ? "ms-1" : ""}`}>{title}</span>
    </Link>
  );
}
