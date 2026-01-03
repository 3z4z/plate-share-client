import { useEffect } from "react";
import CommonTitleComponent from "../components/common/CommonTitle";
import { container } from "../utils/classNames";

export default function AboutPage() {
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
          title={"About PlateShare"}
          subtitle={`
          PlateShare is your go-to platform for discovering, sharing, and
          enjoying delicious meals. We connect food lovers, restaurants, and
          chefs in a simple and interactive way. Our mission is to make every
          meal a memorable experience!`}
          margins={"mb-16"}
        />
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="bg-base-200 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-primary mb-2">
              Our Mission
            </h3>
            <p className="text-base-content/80">
              To connect people through food, making it easier to share,
              discover, and enjoy amazing dishes together.
            </p>
          </div>
          <div className="bg-base-200 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-primary mb-2">
              Our Vision
            </h3>
            <p className="text-base-content/80">
              To be the most loved food sharing platform where every bite counts
              and every dish tells a story.
            </p>
          </div>
          <div className="bg-base-200 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-primary mb-2">
              Our Values
            </h3>
            <p className="text-base-content/80">
              Community, quality, and passion – we value connections that make
              food an experience worth sharing.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
