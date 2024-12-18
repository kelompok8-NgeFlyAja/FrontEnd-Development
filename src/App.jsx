import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";
import Login from "./pages/Login";
import VerifyToken from "./pages/VerifyToken";
import Reset from "./pages/Reset";
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import Send from "./pages/Send";
import Notification from "./pages/Notification";
import Account from "./pages/Account";
import Riwayat from "./pages/Riwayat";
import Error from "./pages/Error";
import { Checkout } from "./pages/Checkout";

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
    path: "/verify-token/:token",
    element: <VerifyToken />,
  },
  {
    path: "/reset-password/:token",
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
    path: "/checkout",
    element: <Checkout />,
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
    path: "/riwayat-pesanan",
    element: <Riwayat />,
  },
  {
    path: "/error",
    element: <Error />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
