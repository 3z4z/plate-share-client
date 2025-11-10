import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance";

export const useFoodsStore = create((set, get) => ({
  foods: [],
  isFoodsLoading: true,
  isAddingFood: false,
  featuredFoods: [],
  availableFoods: [],
  myFoods: [],
  food: [],
  setFoods: () => {
    axiosInstance.get("/foods/available").then((data) =>
      set({
        foods: data.data,
        isFoodsLoading: false,
      })
    );
  },
  setFeaturedFoods: () => {
    axiosInstance.get("/foods/featured").then((data) =>
      set({
        featuredFoods: data.data,
        isFoodsLoading: false,
      })
    );
  },
  setFood: (foodId) => {
    axiosInstance.get(`/foods/${foodId}`).then((data) =>
      set({
        food: data.data,
        isFoodsLoading: false,
      })
    );
  },
  setMyFoods: (donorEmail) => {
    axiosInstance
      .get(`/foods?email=${donorEmail}`)
      .then((data) => set({ myFoods: data.data, isFoodsLoading: false }));
  },
  setAvailableFoods: () => {
    axiosInstance
      .get("foods?status=Available")
      .then((data) =>
        set({ availableFoods: data.data, isFoodsLoading: false })
      );
  },
  addNewFood: (food) => {
    set((state) => ({ foods: [...state.foods, food] }));
  },
  deleteFood: (foodId) => {
    const updated = get().foods.filter((f) => f._id !== foodId);
    const updatedMyFoods = get().myFoods.filter((f) => f._id !== foodId);
    set({
      foods: updated,
      myFoods: updatedMyFoods,
    });
  },
  updateFood: (food) =>
    set((state) => ({
      foods: state.foods.map((f) => (f._id === food._id ? food : f)),
    })),
}));
