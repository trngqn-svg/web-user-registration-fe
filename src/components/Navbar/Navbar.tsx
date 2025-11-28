import { Link } from "react-router-dom";

function Navbar(){
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <a href="/">
          <h1 className="text-xl font-bold p-3">My App</h1>
        </a>
        <div className="flex h-full items-center">
          <Link
            to="/"
            className="px-4 h-full flex items-center hover:bg-indigo-100 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="px-4 h-full flex items-center hover:bg-indigo-100 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 h-full flex items-center hover:bg-indigo-100 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;