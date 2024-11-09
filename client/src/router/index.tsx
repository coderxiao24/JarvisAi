import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../views/Home";
import NotFound from "../views/NotFound";
import Layout from "../layout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
