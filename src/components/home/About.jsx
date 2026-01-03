import { FaQuoteLeft } from "react-icons/fa6";
import aboutUsImage from "../../assets/about.jpg";

export default function AboutUsComponent() {
  const aboutUsContents = {
    title: "About Us",
    description: [
      `PlateShare is a platform for food lovers to discover, share, and enjoy
            delicious meals. We connect communities, chefs, and restaurants to
            make every meal memorable.`,
      `Our mission is to make food sharing simple, fun, and safe for everyone.
            Whether you’re sharing your favorite dish or discovering new flavors, 
            PlateShare makes it easy to connect through food.`,
    ],
  };
  return (
    <section className="mt-28">
      <div className="grid lg:grid-cols-2 gap-18 items-center">
        <div>
          <h2 className="text-4xl text-primary relative mb-12 lg:ms-0 ms-4">
            <FaQuoteLeft className="absolute -top-14 -left-6 text-secondary/20 w-24 h-24" />
            <span className="relative z-2">{aboutUsContents.title}</span>
          </h2>
          {aboutUsContents.description.map((d, i) => (
            <p className="text-base-content/70 mb-6 last:mb-0" key={i}>
              {d}
            </p>
          ))}
        </div>
        <figure
          data-aos="flip-up"
          className="rounded-4xl overflow-hidden lg:max-w-full max-w-md mx-auto order-2 lg:order-1"
        >
          <img src={aboutUsImage} alt="" />
        </figure>
      </div>
    </section>
  );
}
