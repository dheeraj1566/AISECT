import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import WriteLetter from "../AdminPages/WriteLetter";
import AdminDashboard from "../AdminPages/AdminDashboard";
import AdminLogin from "../AdminPages/AdminLogin";
import ProtectedRoute from "../AdminComponents/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <AdminLogin />
      },
      {
        path: "/dashboard",
        element:
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>

      },
      {
        path: "/write-letter",
        element:
        <ProtectedRoute>
          <WriteLetter />
          </ProtectedRoute>
      },
    ],
  },
]);

export default router;
