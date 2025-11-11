import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance";
import { useAuthStore } from "./useAuthStore";
import { useFoodsStore } from "./useFoodsStore";

export const useRequestStore = create((set, get) => ({
  requests: [],
  myRequests: [],
  requestsByFood: [],
  isRequestsLoading: true,
  isRequestModalOpen: false,
  setIsRequestModalOpen: (value) => set({ isRequestModalOpen: value }),
  setRequests: () => {
    axiosInstance
      .get("/requests")
      .then((data) => set({ requests: data.data, isRequestsLoading: false }));
  },
  setRequestsByFood: async (id) => {
    const { user } = useAuthStore.getState();
    const token = await user.getIdToken();
    axiosInstance
      .get(`/requests?foodId=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => set({ requestsByFood: data.data }));
  },
  setMyRequests: async (email) => {
    const { user } = useAuthStore.getState();
    const token = await user.getIdToken();
    axiosInstance
      .get(`/requests?email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => set({ myRequests: data.data, isRequestsLoading: false }));
  },
  addRequest: (myRequest) => {
    set((state) => ({
      requests: [...state.requests, myRequest],
    }));
  },
  deleteRequest: (requestId) => {
    const updatedRequests = get().requests.filter(
      (req) => req._id !== requestId
    );
    const updatedMyRequests = get().myRequests.filter(
      (req) => req._id !== requestId
    );
    set({
      requests: updatedRequests,
      myRequests: updatedMyRequests,
    });
  },

  // For food owner

  manageARequest: (requestId, action) => {
    const { updateFoodStatus, foods } = useFoodsStore.getState();
    set((state) => ({
      requestsByFood: state.requestsByFood.map((req) =>
        req._id === requestId ? { ...req, requestStatus: action } : req
      ),
    }));

    const currentRequest = get().requestsByFood.find(
      (req) => req._id === requestId
    );
    if (!currentRequest) return;

    const currentFood = foods.find(
      (food) => food._id === currentRequest.foodId
    );
    if (currentFood) {
      updateFoodStatus(currentRequest.foodId, "Donated");
    }
  },
}));
