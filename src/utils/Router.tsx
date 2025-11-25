import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PageNotFound from "../pages/Errors/PageNotFound";
import MainLayout from "../layouts/Main";
import AuthLayout from "../layouts/Auth";
import HomeLayout from "../layouts/Home";
import Home from "../pages/Home";
import SignIn from "../pages/Auth/SignIn";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import SetUpProfile from "../pages/SetUpProfile";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Driver from "../pages/Driver";
import AddDriver from "../pages/Driver/AddDriver";
import EditDriver from "../pages/Driver/EditDriver";
import ViewDriver from "../pages/Driver/ViewDriver";
import FAQ from "../pages/FAQ/FAQ";
import Terms from "../pages/CMSPage/TermsCondition";
import PrivacyPolicy from "../pages/CMSPage/PrivacyPolicy";
import AboutUs from "../pages/CMSPage/AboutUs";
import VerifyEmail from "../pages/Auth/VerifyEmail";
import TermsConditionForm from "../pages/CMS/TermsConditionForm";
import PrivacyPolicyForm from "../pages/CMS/PrivacyPolicyForm";
import AboutUsForm from "../pages/CMS/AboutUsForm";

export const AppRouter = () => {
  const { t } = useTranslation();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/privacy",
          element: <PrivacyPolicy />,
        },
        {
          path: "/terms",
          element: <Terms />,
        },
        {
          path: "/about",
          element: <AboutUs />,
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/reset-password",
          element: <ResetPassword />,
        },
        // Profile
        {
          path: "/setup/account",
          element: <SetUpProfile currentTab={1} />,
        },
        {
          path: "/setup/business-details",
          element: <SetUpProfile currentTab={2} />,
        },
        {
          path: "/setup/kyc",
          element: <SetUpProfile currentTab={3} />,
        },
        {
          path: "/verify-email",
          element: <VerifyEmail />,
        },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        // Player
        {
          path: "/player",
          element: <Driver />,
        },
        {
          path: "/player/add",
          element: <AddDriver />,
        },
        {
          path: "/player/edit",
          element: <EditDriver />,
        },
        {
          path: "/player/view",
          element: <ViewDriver />,
        },
        // FAQ
        {
          path: "/faq",
          element: <FAQ />,
        },
        // Terms and Conditions
        {
          path: "/terms-conditions",
          element: <TermsConditionForm />,
        },
        // Privacy Policy
        {
          path: "/privacy-policy",
          element: <PrivacyPolicyForm />,
        },
        // About Us
        {
          path: "/about-us",
          element: <AboutUsForm />,
        },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};
