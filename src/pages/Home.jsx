import { useEffect } from "react";
import FeaturedFoodsComponent from "../components/home/FeaturedFoods";
import HeroComponent from "../components/home/Hero";
import HowItWorksComponent from "../components/home/HowItWorks";
import OurMissionComponent from "../components/home/OurMission";
import { container } from "../utils/classNames";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <section className="bg-base-200 shadow">
        <HeroComponent />
      </section>
      <div className={container}>
        <FeaturedFoodsComponent />
        <HowItWorksComponent />
        <OurMissionComponent />
      </div>
    </>
  );
}
