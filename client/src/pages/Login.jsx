import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/login", { email, password });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <form onSubmit={handleLogin} className="mt-4">
        <input type="email" className="w-full p-2 border rounded mb-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 border rounded mb-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-blue-400 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
