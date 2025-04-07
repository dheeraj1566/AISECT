import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <ul className="mt-4">
        {users.map((user) => (
          <li key={user._id} className="p-2 border-b">{user.name} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
}
