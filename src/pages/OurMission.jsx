import { useEffect } from "react";
import CommonTitleComponent from "../components/common/CommonTitle";
import { container } from "../utils/classNames";

export default function OurMissionPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <main className="pt-10 px-3 lg:px-20">
      <div className={container}>
        <CommonTitleComponent
          title={"Our Mission"}
          subtitle={`
          At PlateShare, our mission is to connect people through the love of food. 
          We believe every meal has a story, and sharing these experiences brings 
          communities together. Whether you're discovering new flavors or sharing 
          your favorite dishes, we make it simple, fun, and memorable.
        `}
          margins={"mb-16"}
        />
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-base-200 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-primary mb-2">
              Community
            </h2>
            <p className="text-base-content/80">
              Building a strong, friendly community of food lovers who share,
              discover, and celebrate meals together.
            </p>
          </div>
          <div className="bg-base-200 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-primary mb-2">
              Innovation
            </h2>
            <p className="text-base-content/80">
              Constantly improving our platform to make sharing and discovering
              food seamless and enjoyable for everyone.
            </p>
          </div>
          <div className="bg-base-200 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-primary mb-2">
              Quality
            </h2>
            <p className="text-base-content/80">
              Ensuring every meal shared through PlateShare meets high standards
              of enjoyment, safety, and delight.
            </p>
          </div>
          <div className="bg-base-200 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-primary mb-2">
              Sustainability
            </h2>
            <p className="text-base-content/80">
              Encouraging mindful food sharing and reducing waste to create a
              positive impact on the environment.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
