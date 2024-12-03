import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import Register from "./pages/Register";
import Otp from "./pages/Otp";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
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
    path: "/chart",
    element: <Checkout />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
