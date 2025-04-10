import { useState } from "react";
import axios from "axios";

export default function WriteLetter() {
  const [recipient, setRecipient] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/letters/write-letter", { author: "Admin", recipient, content });
      alert("Letter Sent Successfully!");
    } catch (error) {
      alert("Failed to send letter!");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold">Write Letter</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input type="email" className="w-full p-2 border rounded mb-3" placeholder="Recipient Email" onChange={(e) => setRecipient(e.target.value)} />
        <textarea className="w-full p-2 border rounded mb-3" placeholder="Letter Content" onChange={(e) => setContent(e.target.value)} />
        <button className="w-full bg-blue-500 text-white p-2 rounded">Send</button>
      </form>
    </div>
  );
}
