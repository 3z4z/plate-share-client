import CommonTitleComponent from "../common/CommonTitle";

export default function SuccessComponent() {
  const successStats = [
    { label: "Meals Shared", value: "12K+" },
    { label: "Active Users", value: "8K+" },
    { label: "Restaurants Joined", value: "350+" },
    { label: "Positive Reviews", value: "4.9/5" },
  ];
  return (
    <section>
      <CommonTitleComponent
        title={"Our Success"}
        subtitle={
          "Learn how PlateShare turns your extra meals into meaningful moments of giving."
        }
        margins={"mt-28 mb-18"}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 sm:gap-8 gap-4">
        {successStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-base-200 sm:p-10 p-6 rounded-lg shadow-md hover:shadow-xl transition"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {stat.value}
            </h3>
            <p className="text-base-content/80">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
