import { container } from "../../utils/classNames";
import BrandLogoComponent from "./BrandLogo";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import playStoreLogo from "../../assets/google-play.png";
import appStoreLogo from "../../assets/app-store.png";

export default function FooterComponent() {
  const importantLinks = [
    { title: "About Us", path: "#" },
    { title: "Our Mission", path: "#" },
    { title: "Blogs", path: "#" },
    { title: "FAQ", path: "#" },
  ];
  const socialLinks = [
    { title: "Facebook", path: "#", icon: <FaFacebook className="w-5 h-5" /> },
    {
      title: "Instagram",
      path: "#",
      icon: <FaInstagram className="w-5 h-5" />,
    },
    { title: "Twitter", path: "#", icon: <FaXTwitter className="w-5 h-5" /> },
  ];
  return (
    <footer className="mt-28 bg-base-300">
      <div className={container}>
        <div className="grid lg:grid-cols-9 sm:grid-cols-2 lg:gap-6 gap-10 py-16">
          <div className="lg:col-span-2">
            <BrandLogoComponent />
            <p className="mt-6 w-[92.5%]">
              Join PlateShare and turn your extra meals into moments of joy,
              connecting with those in need while spreading kindness, community,
              and smiles every day.
            </p>
          </div>
          <div className="lg:col-span-2">
            <h5 className="text-xl text-secondary">Important Links</h5>
            <ul className="mt-8 flex flex-col gap-3">
              {importantLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="transition hover:text-secondary border-b border-b-transparent hover:border-b-primary"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h5 className="text-xl text-secondary">Social Links</h5>
            <ul className="mt-8 flex flex-col gap-3">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="flex items-center w-max gap-2 transition hover:text-secondary group"
                  >
                    {link.icon}
                    <span className="border-b border-b-transparent group-hover:border-b-primary transition">
                      {link.title}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h5 className="text-xl text-secondary">Get our App</h5>
            <div className="flex gap-3 mt-8">
              <button className="btn btn-neutral h-auto py-2.5 px-3 gap-3 rounded-md">
                <img
                  src={playStoreLogo}
                  alt=""
                  className="h-8 w-8 object-contain"
                />
                <div className="flex flex-col items-start">
                  <span className="text-[8px] -mb-1">Get it on</span>
                  <span>Google Play</span>
                </div>
              </button>
              <button className="btn btn-neutral h-auto py-2.5 px-3 gap-3 rounded-md">
                <img
                  src={appStoreLogo}
                  alt=""
                  className="h-8 w-8 object-contain"
                />
                <div className="flex flex-col items-start">
                  <span className="text-[8px] -mb-1">Download from the</span>
                  <span>App Store</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-t-accent/15 py-6 text-center">
          <p>
            <span className="font-semibold">PlateShare</span> - 2025 &copy; All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
