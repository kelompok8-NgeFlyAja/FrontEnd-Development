import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
