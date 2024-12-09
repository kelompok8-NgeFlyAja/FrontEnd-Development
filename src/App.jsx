import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import Send from "./pages/Send";
import Payment from "./pages/Payment";
import Psuccess from "./pages/Psuccess";
import Notification from "./pages/Notification";
import Account from "./pages/Account";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/send-email",
    element: <Send />,
  },
  {
    path: "/reset-password",
    element: <Reset />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },

  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/chart",
    element: <Checkout />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/payment-success",
    element: <Psuccess />,
  },
  {
    path: "/notification",
    element: <Notification />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/error",
    element: <Error />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
