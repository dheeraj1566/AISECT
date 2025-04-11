import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-500 text-black p-4 flex justify-between">
        <h1 className="text-xl font-bold">Letter Portal</h1>
        <div>
          <Link to="/dashboard" className="mr-4 text-black">Home</Link>
          <Link to="/write-letter" className="mr-4 text-black">Letter</Link>
          <Link to="/" className="mr-4 text-black">Login</Link>
        </div>
      </nav>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
