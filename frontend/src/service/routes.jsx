import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import Setup2fa from "../pages/Setup2fa.jsx";
import Verify2fa from "../pages/Verify2fa.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/setup2fa",
    element: <Setup2fa />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/verify2fa", 
    element: <Verify2fa />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
