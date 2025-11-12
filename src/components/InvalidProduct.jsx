import brokenPlateImg from "../assets/broken.png";
import LargeBtn from "./common/LargeBtn";
export default function InvalidProductComponent() {
  return (
    <div className="flex flex-col items-center py-10 px-3 text-center">
      <figure>
        <img src={brokenPlateImg} alt="" />
      </figure>
      <p className="text-2xl text-error font-medium mt-5 mb-10">
        Looks like your requested Plate in broken or unavailable!
      </p>
      <LargeBtn path={"/foods"} title={"Check Available Plates"} />
    </div>
  );
}
