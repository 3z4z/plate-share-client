import FeaturedFoodsComponent from "../components/home/FeaturedFoods";
import HeroComponent from "../components/home/Hero";
import HowItWorksComponent from "../components/home/HowItWorks";
import OurMissionComponent from "../components/home/OurMission";
import { container } from "../utils/classNames";

export default function HomePage() {
  return (
    <>
      <section className="bg-white shadow">
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
