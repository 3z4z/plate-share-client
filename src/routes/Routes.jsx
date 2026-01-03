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
import AddFoodPage from "../pages/private/dashboard/AddFood";
import MyFoodsPage from "../pages/private/dashboard/MyFoods";
import EditFoodPage from "../pages/private/dashboard/EditFood";
import MyRequestsPage from "../pages/private/dashboard/MyRequests";
import AboutPage from "../pages/About";
import OurMissionPage from "../pages/OurMission";
import OurPoliciesPage from "../pages/Policies";
import FaqPage from "../pages/faq";
import DashboardLayout from "../layouts/DashboardLayout";
import DbHomePage from "../pages/private/dashboard/Home";
import ManageRequestsPage from "../pages/private/dashboard/ManageRequests";
import MyProfilePage from "../pages/private/dashboard/MyProfile";
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
        path: "about-us",
        Component: AboutPage,
      },
      {
        path: "our-mission",
        Component: OurMissionPage,
      },
      {
        path: "our-policies",
        Component: OurPoliciesPage,
      },
      {
        path: "faq",
        Component: FaqPage,
      },
      {
        path: "food/:id",
        element: (
          <PrivateRoute>
            <FoodDetailsPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "auth",
    Component: AuthPage,
    errorElement: <ErrorPage />,
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
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DbHomePage,
      },
      {
        path: "add-food",
        Component: AddFoodPage,
      },
      {
        path: "my-foods",
        Component: MyFoodsPage,
      },
      {
        path: "my-requests",
        Component: MyRequestsPage,
      },
      {
        path: "manage-requests",
        Component: ManageRequestsPage,
      },
      {
        path: "edit-food/:id",
        Component: EditFoodPage,
      },
      {
        path: "my-profile",
        Component: MyProfilePage,
      },
    ],
  },
]);
