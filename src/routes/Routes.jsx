import { createBrowserRouter, Navigate } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/Home";
import ErrorPage from "../pages/Error";
import FoodsPage from "../pages/Foods";
import AuthPage from "../pages/Auth";
import LoginPage from "../components/auth/Login";
import RegisterPage from "../components/auth/Register";
import FoodDetailsPage from "../pages/private/FoodDetails";
import PrivateRoute from "./PrivateRoutes";
import AddFoodPage from "../pages/private/AddFood";
import MyFoodsPage from "../pages/private/MyFoods";
import EditFoodPage from "../pages/private/EditFood";
import MyRequestsPage from "../pages/private/MyRequests";
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
        Component: FoodsPage,
      },
      {
        path: "food/:id",
        element: (
          <PrivateRoute>
            <FoodDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "add-food",
        element: (
          <PrivateRoute>
            <AddFoodPage />
          </PrivateRoute>
        ),
      },
      {
        path: "my-foods",
        element: (
          <PrivateRoute>
            <MyFoodsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "my-requests",
        element: (
          <PrivateRoute>
            <MyRequestsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-food/:id",
        element: (
          <PrivateRoute>
            <EditFoodPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "auth",
    Component: AuthPage,
    children: [
      {
        index: true,
        element: <Navigate to={"login"} replace />,
      },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "register",
        Component: RegisterPage,
      },
    ],
  },
]);
