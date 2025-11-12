import { useParams } from "react-router";
import { useFoodsStore } from "../../stores/useFoodsStore";
import { useEffect } from "react";
import WindowLoader from "../../components/loaders/windowLoader/WindowLoader";
import { container } from "../../utils/classNames";
import { useAuthStore } from "../../stores/useAuthStore";
import { useRequestStore } from "../../stores/useRequestStore";
import RequestFoodModal from "../../components/modals/RequestFoodModal";
import RequestsByFoodTable from "../../components/tables/RequestsByFoodTable";
import dayjs from "dayjs";

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
      {isFoodsLoading ? (
        <WindowLoader />
      ) : id === food._id ? (
        <div className={container}>
          <div className="grid md:grid-cols-2 gap-10 pt-6">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-4">
                <h1 className="text-4xl">{name}</h1>
                <p
                  className={`badge ${
                    food_status === "Available"
                      ? "badge-success"
                      : "badge-warning"
                  }`}
                >
                  {food_status}
                </p>
              </div>
              <p className="mt-1 mb-10">
                Pickup from:
                <span className="ms-1 font-medium">{pickup_location}</span>
              </p>
              <div className="flex items-center gap-4">
                <figure className="w-26 h-26 rounded-full overflow-hidden border-3 border-primary ring-6 ring-primary/25">
                  <img src={donor_image} alt="" />
                </figure>
                <div>
                  <p className="font-bold text-primary text-xl mb-1">
                    {donor_name}
                  </p>
                  <p>{donor_email}</p>
                </div>
              </div>
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
              <strong>Additional Info:</strong>
              <p>{description}</p>
            </div>
            <div className="flex md:justify-end justify-center order-1 md:order-2">
              <figure className="md:max-w-lg max-w-md h-max md:aspect-square aspect-[5/3.5] border-3 ring-8 border-secondary ring-secondary/25 rounded-2xl overflow-hidden">
                <img
                  src={image}
                  alt=""
                  className="object-cover h-full w-full"
                />
              </figure>
            </div>
          </div>
          <div className="flex gap-3 mt-16">
            {isMyFood || food_status === "Donated" ? null : (
              <button onClick={openRequestModal} className="btn btn-primary">
                Request Food
              </button>
            )}
          </div>
          <RequestFoodModal id={id} />
          <RequestsByFoodTable isLoading={isFoodsLoading} foodId={id} />
        </div>
      ) : (
        <p className="text-error text-xl py-10 text-center">
          Oops! your requested food isn't there yet!
        </p>
      )}
    </>
  );
}
