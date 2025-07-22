import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./error-page";
import "./main.css";
import Home from "./pages/home";
import Root from "./pages/root";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Profile from "./pages/profile";
import AuthProvider from "./contexts/AuthProvider";
import Logout from "./pages/logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/profile", element: <Profile /> },
      { path: "/logout", element: <Logout /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
