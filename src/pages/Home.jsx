import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
            ⚽ Live Football
          </span>

          <h1 className="mt-6 text-5xl font-bold tracking-tight text-gray-900">
            Every goal.
            <br />
            Every match.
            <br />
            Live.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-600">
            Follow live football scores, today's fixtures,
            match events and results from competitions around
            the world.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/live"
              className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              🔴 Live Now
            </Link>

            <Link
              to="/matches"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-100"
            >
              📅 Today's Matches
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;