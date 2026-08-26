import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          to="/"
          className="text-2xl font-black text-gray-900"
        >
          Live<span className="text-red-600">Score</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="font-medium text-gray-700 hover:text-red-600"
          >
            Home
          </Link>

          <Link
            to="/live"
            className="font-medium text-gray-700 hover:text-red-600"
          >
            🔴 Live
          </Link>

          <Link
            to="/matches"
            className="font-medium text-gray-700 hover:text-red-600"
          >
            Matches
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;