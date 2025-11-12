import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL,
  baseURL: "https://plate-share-server-two.vercel.app",
});
