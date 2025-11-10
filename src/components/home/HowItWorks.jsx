import postFood from "../../assets/how-it-works/post.png";
import findFood from "../../assets/how-it-works/find.png";
import collectFood from "../../assets/how-it-works/pickup.png";
import CommonTitleComponent from "../common/CommonTitle";
export default function HowItWorksComponent() {
  const howItWorks = [
    {
      title: "Post Food",
      image: postFood,
      description:
        "Share your extra meals by posting them with a quick photo and location.",
    },
    {
      title: "Find Food",
      image: findFood,
      description:
        "Explore nearby shared plates, filter by location, and discover delicious home-cooked meals.",
    },
    {
      title: "Collect Food",
      image: collectFood,
      description:
        "Contact the sharer, arrange pickup, and enjoy your meal while helping reduce food waste.",
    },
  ];

  return (
    <section>
      <CommonTitleComponent
        title={"How PlateShare Works"}
        subtitle={
          "Learn how PlateShare turns your extra meals into meaningful moments of giving."
        }
        margins={"mt-28 mb-18"}
      />
      <div className="grid lg:grid-cols-3 lg:max-w-full max-w-lg mx-auto">
        {howItWorks.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center px-6 pt-7 pb-10 hover:bg-white hover:shadow-lg transition rounded-lg group"
          >
            <figure className="max-w-20 w-full mb-10">
              <img src={step.image} alt="" />
            </figure>
            <h4 className="mb-2 text-2xl group-hover:text-primary transition">
              {step.title}
            </h4>
            <p className="text-gray-600 max-w-4/5">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
