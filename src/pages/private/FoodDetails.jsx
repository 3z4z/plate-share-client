import { useParams } from "react-router";
import { useFoodsStore } from "../../stores/useFoodsStore";
import { useEffect } from "react";
import WindowLoader from "../../components/loaders/windowLoader/WindowLoader";
import { container, largeBtn } from "../../utils/classNames";
import { useAuthStore } from "../../stores/useAuthStore";
import { useRequestStore } from "../../stores/useRequestStore";
import RequestFoodModal from "../../components/modals/RequestFoodModal";
import RequestsByFoodTable from "../../components/tables/RequestsByFoodTable";
import dayjs from "dayjs";
import FieldSkeletonLoader from "../../components/loaders/FieldSkeletonLoader";
import SpinnerLoader from "../../components/loaders/SpinnerLoader";

export default function FoodDetailsPage() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { food, setFood, isFoodsLoading, setMyFoods, myFoods } =
    useFoodsStore();
  const isMyFood = myFoods.find((food) => food._id === id);
  const { setIsRequestModalOpen } = useRequestStore();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (user) {
      setMyFoods(user.email);
    }
    if (id) {
      setFood(id);
    }
  }, [setFood, id, setMyFoods, user]);
  const openRequestModal = () => {
    setIsRequestModalOpen(true);
  };
  const {
    donor_email,
    donor_name,
    donor_image,
    name,
    image,
    quantity,
    food_status,
    pickup_location,
    description,
    expire_date,
  } = food;
  return (
    <>
      <title>{isFoodsLoading ? "PlateShare" : `${name} | PlateShare`}</title>
      {isFoodsLoading ? (
        <WindowLoader />
      ) : (
        <div className={container}>
          <div className="grid md:grid-cols-2 gap-10 pt-6">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-4 flex-wrap">
                {name ? (
                  <h1 className="sm:text-4xl text-3xl" data-aos="fade-right">
                    {name}
                  </h1>
                ) : (
                  <FieldSkeletonLoader width={"w-60"} height={"h-10"} />
                )}
                {food_status ? (
                  <p
                    data-aos="fade-right"
                    data-aos-delay="300"
                    className={`badge sm:badge-md badge-sm ${
                      food_status === "Available"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {food_status ? food_status : "loading"}
                  </p>
                ) : (
                  <FieldSkeletonLoader width={"w-20"} />
                )}
              </div>
              {pickup_location ? (
                <p className="mt-1 mb-10" data-aos="fade-right">
                  Pickup from:
                  <span className="ms-1 font-medium">{pickup_location}</span>
                </p>
              ) : (
                <FieldSkeletonLoader
                  margin={"mt-1"}
                  width={"max-w-96 w-full"}
                />
              )}
              {donor_image ? (
                <div className="flex items-center gap-4 flex-wrap">
                  <figure className="sm:w-26 sm:h-26 w-12 h-12 rounded-full overflow-hidden border-3 border-primary ring-6 ring-primary/25">
                    <img
                      src={donor_image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <div>
                    <p className="font-bold text-primary sm:text-xl text-lg mb-1">
                      {donor_name}
                    </p>
                    <p className="sm:break-keep break-all">{donor_email}</p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 items-center my-8">
                  <div className="w-20 h-20 flex items-center justify-center bg-base-200 rounded-full">
                    <SpinnerLoader size={"loading-xl"} />
                  </div>
                  <div className="flex gap-1 flex-col">
                    <FieldSkeletonLoader width={"w-24"} />
                    <FieldSkeletonLoader width={"w-30"} />
                  </div>
                </div>
              )}
              {quantity ? (
                <>
                  <p className="mt-10 mb-1">
                    <span>Total Available:</span>
                    <span className="ms-1 font-bold">{quantity} Plates</span>
                  </p>
                  <p className="mb-10">
                    <span>Expire Date:</span>
                    <span className="ms-1 font-bold">
                      {dayjs(expire_date).format("DD MMMM, YYYY")}
                    </span>
                  </p>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <FieldSkeletonLoader width={"w-60"} />
                  <FieldSkeletonLoader width={"w-60"} />
                </div>
              )}
              {description ? (
                <>
                  <strong>Additional Info:</strong>
                  <p>{description}</p>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-8">
                  <FieldSkeletonLoader width={"w-40"} />
                  <div className="flex flex-col gap-1">
                    <FieldSkeletonLoader />
                    <FieldSkeletonLoader />
                    <FieldSkeletonLoader />
                    <FieldSkeletonLoader width={"max-w-80 w-full"} />
                  </div>
                </div>
              )}
            </div>
            <div className="flex md:justify-end justify-center order-1 md:order-2">
              {image ? (
                <figure
                  className="w-full bg-base-200 md:max-w-lg max-w-md h-max md:aspect-square aspect-[5/3.5] border-3 ring-8 border-secondary ring-secondary/25 rounded-2xl overflow-hidden"
                  data-aos="fade-left"
                  data-aos-delay="500"
                >
                  <img
                    src={image}
                    alt=""
                    className="object-cover h-full w-full"
                  />
                </figure>
              ) : (
                <FieldSkeletonLoader
                  width={
                    "w-full max-w-md h-max md:aspect-square aspect-[5/3.5]"
                  }
                />
              )}
            </div>
          </div>
          {food_status ? (
            <>
              <div className="flex gap-3 mt-16">
                {isMyFood ? null : (
                  <button onClick={openRequestModal} className={largeBtn}>
                    Request This Plate
                  </button>
                )}
              </div>
              <RequestFoodModal id={id} />
              <RequestsByFoodTable isLoading={isFoodsLoading} foodId={id} />
            </>
          ) : null}
        </div>
      )}
    </>
  );
}
