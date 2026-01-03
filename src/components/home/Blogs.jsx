import CommonTitleComponent from "../common/CommonTitle";
import blog1Img from "../../assets/blogs/blog-1.jpg";
import blog2Img from "../../assets/blogs/blog-2.jpg";
import blog3Img from "../../assets/blogs/blog-3.jpg";
const blogs = [
  {
    title: "5 Easy Meals to Share with Friends",
    excerpt:
      "Discover quick and delicious recipes that are perfect for sharing with family and friends, no matter the occasion.",
    image: blog1Img,
    date: "28 Dec, 2025",
  },
  {
    title: "Top 10 Restaurants Loved by PlateShare Users",
    excerpt:
      "Explore the most popular local spots recommended by our community, and get inspired for your next food adventure.",
    image: blog2Img,
    date: "15 Dec, 2025",
  },
  {
    title: "How to Reduce Food Waste in Your Kitchen",
    excerpt:
      "Learn simple tips and tricks to minimize food waste while still enjoying delicious meals every day.",
    image: blog3Img,
    date: "02 Dec, 2025",
  },
];

export default function BlogsComponent() {
  return (
    <section className="pt-20 px-4 lg:px-20 bg-base-100">
      <CommonTitleComponent
        title={"From Our Blog"}
        subtitle={
          "Stay inspired with the latest recipes, cooking tips, and stories from our food-loving community, and discover new ways to share and enjoy meals every day."
        }
        margins={"mb-16"}
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, idx) => (
          <div
            key={idx}
            className="bg-base-200 rounded-xl shadow-md hover:shadow-xl overflow-hidden transition flex flex-col"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {blog.title}
                </h3>
                <p className="text-base-content/80 mb-4">{blog.excerpt}</p>
              </div>
              <span className="text-base-content/60 text-sm">{blog.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
