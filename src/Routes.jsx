import { createBrowserRouter } from "react-router";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/Home";
import ErrorPage from "./pages/Error";

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
    ],
  },
]);
