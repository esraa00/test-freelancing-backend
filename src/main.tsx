import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpPage from "./pages/SignUp.tsx";
import LoginPage from "./pages/Login.tsx";
import OtpSetupPage from "./pages/OtpSetup.tsx";
import Otp from "./pages/Otp.tsx";
import Home from "./pages/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/signUp",
    element: <SignUpPage />,
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/otpSetup", element: <OtpSetupPage /> },
  { path: "/otp", element: <Otp /> },
  { path: "/", element: <Home /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
