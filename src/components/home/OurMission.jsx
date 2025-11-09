import { FaQuoteLeft } from "react-icons/fa6";
import ourMissionImage from "../../assets/our-mission.jpg";
export default function OurMissionComponent() {
  const ourMission = {
    title: "Our Mission",
    description:
      "PlateShare aims to reduce food waste while connecting communities. We empower people to share surplus meals, promote kindness, and make every plate count. Through small actions, we hope to create a sustainable and caring environment where everyone can enjoy nutritious, home-cooked food.",
    keyPoints: [
      "Reduce food waste and promote sustainability",
      "Connect people through shared meals",
      "Make nutritious food accessible to everyone",
      "Encourage kindness and community engagement",
      "Create a positive impact in local communities",
    ],
  };
  return (
    <section className="mt-28">
      <div className="grid lg:grid-cols-2 gap-18 items-center">
        <figure className="rounded-4xl overflow-hidden lg:max-w-full max-w-md mx-auto order-2 lg:order-1">
          <img src={ourMissionImage} alt="" />
        </figure>
        <div className="order-1 lg:order-2">
          <h2 className="text-4xl text-primary relative mb-12 lg:ms-0 ms-4">
            <FaQuoteLeft className="absolute -top-14 -left-6 text-secondary/20 w-24 h-24" />
            <span className="relative z-2">{ourMission.title}</span>
          </h2>
          <p className="md:w-4/5 text-gray-600 mb-7">
            {ourMission.description}
          </p>
          <ul className="ms-5 list-disc text-gray-600">
            {ourMission.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
