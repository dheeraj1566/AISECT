import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Dashboard from "../AdminPages/Dashboard";
import WriteLetter from "../AdminPages/WriteLetter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { 
        index: true,
        element: <Login /> 
      },
      { 
      path: "/dashboard", 
      element: <Dashboard /> 
    },
      {
        path: "/write-letter",
        element: <WriteLetter />
      },
    ],
  },
]);

export default router;
