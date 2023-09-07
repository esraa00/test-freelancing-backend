import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IsAuthenticatedWrapper from "./components/IsAuthenticatedWrapper.tsx";
import IsTwoFactorAuthenticatedWrapper from "./components/IsTwoFactorAuthenticatedWrapper.tsx";
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
  {
    path: "/otpSetup",
    element: (
      <IsAuthenticatedWrapper>
        <OtpSetupPage />
      </IsAuthenticatedWrapper>
    ),
  },
  {
    path: "/otp",
    element: (
      <IsAuthenticatedWrapper>
        <Otp />
      </IsAuthenticatedWrapper>
    ),
  },
  {
    path: "/",
    element: (
      <IsTwoFactorAuthenticatedWrapper>
        <Home />
      </IsTwoFactorAuthenticatedWrapper>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
