import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Instance } from "../../AxiosConfig";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await Instance.post("/admin/login", formData, {
        withCredentials: true
      });

      if (response.status === 200) {
        navigate("/dashboard");
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <form onSubmit={handleLogin} className="mt-4">
        <input
          type="email"
          className="w-full p-2 border rounded mb-3"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        <input
          type="password"
          className="w-full p-2 border rounded mb-3"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button className="w-full bg-blue-400 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
