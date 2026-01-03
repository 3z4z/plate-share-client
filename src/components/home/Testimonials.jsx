import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import CommonTitleComponent from "../common/CommonTitle";

import "swiper/css";
import "swiper/css/pagination";

export default function TestimonialsComponent() {
  const testimonials = [
    {
      review:
        "PlateShare has completely changed how I think about food sharing. It's simple and fun!",
      name: "Alice Johnson",
      date: "03 Jan, 2026",
    },
    {
      review:
        "Amazing platform! I’ve discovered so many local dishes I wouldn’t have tried otherwise.",
      name: "Michael Lee",
      date: "21 Dec, 2025",
    },
    {
      review:
        "Sharing meals with friends and strangers alike has never been easier. Love it!",
      name: "Sofia Ramirez",
      date: "12 Nov, 2025",
    },
    {
      review:
        "I love the community aspect of PlateShare. It makes food sharing meaningful.",
      name: "Daniel Smith",
      date: "05 Oct, 2025",
    },
    {
      review:
        "Great platform for discovering new recipes and connecting with chefs nearby.",
      name: "Priya Patel",
      date: "28 Sep, 2025",
    },
  ];

  return (
    <section>
      <CommonTitleComponent
        title={"What people says"}
        subtitle={
          "Discover how PlateShare helps food lovers connect, share, and enjoy meaningful meals."
        }
        margins={"mt-28 mb-18"}
      />
      <Swiper
        className="pt-4! pb-12!"
        modules={[Pagination]}
        spaceBetween={24}
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet w-3 h-3 rounded-full bg-base-300",
          bulletActiveClass: "swiper-pagination-bullet-active bg-primary!",
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((testi, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-base-200/50 rounded-xl p-6 flex flex-col justify-between h-full shadow-md hover:shadow-xl transition">
              {/* Review Text */}
              <p className="mb-6 text-base-content">{testi.review}</p>

              {/* Divider */}
              <div className="border-t border-dashed border-base-300 my-4"></div>

              {/* User Info */}
              <div className="mt-auto flex flex-col items-start gap-1">
                <span className="text-secondary font-semibold">
                  {testi.name}
                </span>
                <span className="text-base-content/60 text-sm">
                  {testi.date}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
