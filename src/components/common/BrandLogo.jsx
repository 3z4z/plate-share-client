import logo from "../../assets/logo.png";

export default function BrandLogoComponent() {
  return (
    <div className="flex gap-3 items-center">
      <figure className="w-10 h-10 flex">
        <img src={logo} alt="" className="w-full" />
      </figure>
      <p className="font-bold text-xl">
        <span className="text-accent">Plate</span>
        <span className="text-primary">Share</span>
      </p>
    </div>
  );
}
