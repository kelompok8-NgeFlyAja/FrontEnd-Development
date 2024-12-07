import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import Send from "./pages/Send";
//import Success from "./pages/Success";
import Payment from "./pages/Payment";
import Notification from "./pages/Notification";

const router = createBrowserRouter([
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
    path: "/register/OTP",
    element: <Otp />,
  },
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  // {
  //   path: "/payment-success",
  //   element: <Success />,
  // },
  {
    path: "/notification",
    element: <Notification />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
