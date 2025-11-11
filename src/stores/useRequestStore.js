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

  // manageARequest: (requestId, action) => {
  //   const foodStates = useFoodsStore.getState();
  //   set((state) => ({
  //     requestsByFood: state.requestsByFood.map((req) =>
  //       req._id === requestId ? { ...req, requestStatus: action } : req
  //     ),
  //   }));
  //   const currentRequest = get().requests.find((req) => req._id === requestId);
  //   const currentFood = foodStates.foods.find(
  //     (food) => food._id === currentRequest.foodId
  //   );
  //   if (currentFood) {
  //     const updateFoodStatus = foodStates.getState().updateFoodStatus;
  //     if (updateFoodStatus) {
  //       updateFoodStatus(currentRequest.foodId, "Unavailable");
  //     } else {
  //       console.log("Invalid food status found");
  //     }
  //   }
  // },

  // ... inside your requestStore definition ...

  manageARequest: (requestId, action) => {
    // 1. Get the current static state and actions of the food store
    const foodStoreActions = useFoodsStore.getState();

    // 2. Update the request status in the CURRENT store (requests store)
    set((state) => ({
      requestsByFood: state.requestsByFood.map((req) =>
        req._id === requestId ? { ...req, requestStatus: action } : req
      ),
    }));

    // 3. Find the request we just updated to get the foodId
    // FIX 1: Use 'requestsByFood' instead of 'requests'
    const currentRequest = get().requestsByFood.find(
      (req) => req._id === requestId
    );

    // Only proceed if the request was found
    if (currentRequest) {
      // 4. Find the specific food item in the food store's 'foods' array
      const currentFood = foodStoreActions.foods.find(
        (food) => food._id === currentRequest.foodId
      );

      if (currentFood) {
        // 5. FIX 2: Access the action directly from foodStoreActions (no second .getState())
        const updateFoodStatus = foodStoreActions.updateFoodStatus;

        // 6. Call the external store's action
        if (updateFoodStatus) {
          updateFoodStatus(currentRequest.foodId, "Unavailable");
        } else {
          console.log("updateFoodStatus action not found in food store."); // Or log the error
        }
      }
    }
  },
}));
