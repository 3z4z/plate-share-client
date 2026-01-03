import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/Routes";
import { Toaster } from "react-hot-toast";
import {
  hotTostErrorConfig,
  hotTostSuccessConfig,
} from "./configs/toastConfigs";
import AppInit from "./AppInit";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppInit />
    <RouterProvider router={router} />
    <Toaster
      toastOptions={{
        success: hotTostSuccessConfig,
        error: hotTostErrorConfig,
      }}
    />
  </StrictMode>
);
