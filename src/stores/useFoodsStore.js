import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance";

export const useFoodsStore = create((set) => ({
  foods: [],
  isFoodsLoading: true,
  featuredFoods: [],
  setFoods: () => {
    axiosInstance.get("/foods").then((data) =>
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
}));
