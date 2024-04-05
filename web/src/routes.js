import { createBrowserRouter } from "react-router-dom";
import NotFound from "./components/notFound";
import IntroPage from "./pages/intro";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import RegistrationPage from "./pages/registration/registration";
import ForgotPasswordPage from "./pages/forgotpassword/password";
import DetailsPage from "./pages/users/users";
import VotingPage from "./pages/voting/voting";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IntroPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/user/login",
    element: <Login />,
  },
  {
    path: "/user/registration",
    element: <RegistrationPage />,
  },
  {
    path: "/user/forgotpassword",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/user/details",
    element: <DetailsPage />,
  },
  {
    path: "/user/voting",
    element: <VotingPage />,
  },
  //   Add your routes here
  {
    path: "*",
    element: <NotFound />,
  }
]);

export default router;
