import heroImg from "../../assets/hero.png";
import { container, largeBtnIcon } from "../../utils/classNames";
import { FaCompass } from "react-icons/fa6";
import LargeBtn from "../common/LargeBtn";

export default function HeroComponent() {
  return (
    <div className={`grid grid-cols-2 gap-10 ${container} md:pt-26 pt-16`}>
      <div className="not-lg:col-span-2">
        <h1 className="text-[2.5rem] leading-10 relative mb-6">
          <span className="z-0 text-accent/7 md:text-7xl text-5xl absolute -top-8 left-0 select-none">
            <span>PLATE</span>
            <span className="text-primary/7">SHARE</span>
          </span>
          <span className="text-primary relative z-1 text-5xl">
            Be The Reason
          </span>
          <span className="text-accent block">Someone Smiles Today</span>
        </h1>
        <p className="mb-10 sm:max-w-4/5">
          Join PlateShare and turn your extra meals into moments of joy,
          connecting with those in need while spreading kindness, community, and
          smiles every day.
        </p>
        <LargeBtn
          path={"/foods"}
          customClass={"group"}
          icon={<FaCompass className={largeBtnIcon} />}
          title={"Explore Plates"}
        />
      </div>
      <figure className="not-lg:col-span-2 ps-8 flex justify-center">
        <img src={heroImg} className="lg:w-full" alt="" />
      </figure>
    </div>
  );
}
