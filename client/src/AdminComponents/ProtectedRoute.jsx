import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Instance } from "../../AxiosConfig";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkForToken() {
      try {
        const response = await Instance.get("/admin/check", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkForToken();
  }, []);

  if (loading) return <div>LOADING...</div>;

  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
