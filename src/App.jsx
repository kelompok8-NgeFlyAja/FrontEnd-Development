import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
  {
    path: "/search",
    element: <Search />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
