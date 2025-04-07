import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import WriteLetter from "../pages/WriteLetter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/write-letter", element: <WriteLetter /> },
    ],
  },
]);

export default router;
