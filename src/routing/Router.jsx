import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Home from "../views/Home";
import Register from "../views/auth/Register";
import Login from "../views/auth/Login";
import PageNotFound from "../views/error/PageNotFound";
import ErrorLayout from "../components/layouts/ErrorLayout";

let router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
  {
    path: "*",
    Component: ErrorLayout,
    children: [
      {
        path: '*',
        Component: PageNotFound,
      },
    ],
  },
]);

export default router;
