import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
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
]);

export default function App() {
  return <RouterProvider router={router} />;
}
