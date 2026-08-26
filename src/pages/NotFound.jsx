import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg text-center">
        <p className="text-8xl font-black tracking-tight text-gray-200">
          404
        </p>

        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Page Not Found
        </h1>

        <p className="mt-4 text-gray-500">
          Sorry, the page you're looking for doesn't
          exist or may have been moved.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/"
            className="rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Back Home
          </Link>

          <Link
            to="/live"
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Live Matches
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;