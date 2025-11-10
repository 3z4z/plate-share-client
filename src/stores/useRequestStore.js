import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance";

export const useRequestStore = create((set) => ({
  requests: [],
  isRequestsLoading: true,
  setRequests: () => {
    axiosInstance
      .get("/requests")
      .then((data) => set({ requests: data.data, isRequestsLoading: false }));
  },
  myRequests: [],
  setMyRequests: (email) => {
    axiosInstance
      .get(`/requests/${email}`)
      .then((data) => set({ myRequests: data.data, isRequestsLoading: false }));
  },
  addRequest: (myRequest) => {
    set((state) => ({
      requests: [...state.requests, myRequest],
      isRequestsLoading: false,
    }));
  },
}));
