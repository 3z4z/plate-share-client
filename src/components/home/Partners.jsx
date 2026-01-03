import Marquee from "react-fast-marquee";

import nestle from "../../assets/partners/nestle.png";
import parle from "../../assets/partners/parle.svg";
import afbl from "../../assets/partners/afbl.png";
import greenL from "../../assets/partners/green-lounge.png";
import heinz from "../../assets/partners/heinz.svg";
import pran from "../../assets/partners/pran.png";
import sultanD from "../../assets/partners/sultan-dine.png";
import westin from "../../assets/partners/westin.svg";
import CommonTitleComponent from "../common/CommonTitle";

export default function PartnersComponent() {
  const brands = [
    { icon: nestle },
    { icon: parle },
    { icon: afbl },
    { icon: greenL },
    { icon: heinz },
    { icon: pran },
    { icon: sultanD },
    { icon: westin },
  ];

  return (
    <section>
      <CommonTitleComponent
        title={"Our Partners"}
        subtitle={
          "We collaborate with restaurants, chefs, and food enthusiasts to bring you the best dining experiences. Together, we make every meal memorable."
        }
        margins={"mt-28 mb-18"}
      />
      <Marquee className="bg-neutral/5 py-10">
        {brands.map((b, i) => (
          <figure
            key={i}
            className="h-14 mx-10 w-max flex items-center justify-center"
          >
            <img src={b.icon} alt="" className="h-full" />
          </figure>
        ))}
      </Marquee>
    </section>
  );
}
