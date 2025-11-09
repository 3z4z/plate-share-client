import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/Home";
import ErrorPage from "../pages/Error";
import AvailableFoodsPage from "../pages/AvailableFoods";
export const router = createBrowserRouter([
  {
    path: "",
    Component: HomeLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "foods",
        Component: AvailableFoodsPage,
      },
    ],
  },
]);
