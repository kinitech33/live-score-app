import { useCallback, useEffect, useState } from "react";

import MatchCard from "../components/MatchCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import { getLiveMatches } from "../services/footballApi";

function LiveMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMatches = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getLiveMatches();

      setMatches(data.response || []);
    } catch (err) {
      console.error("Failed to fetch live matches:", err);

      setError(
        err.message || "Unable to load live matches."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches();

    // Refresh live scores every 60 seconds
    const interval = setInterval(() => {
      fetchMatches();
    }, 60000);

    return () => clearInterval(interval);
  }, [fetchMatches]);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 animate-pulse rounded-full bg-red-500"></span>

            <h1 className="text-3xl font-bold text-gray-900">
              Live Matches
            </h1>
          </div>

          <p className="mt-2 text-gray-500">
            Follow football matches happening right now.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <Loading message="Loading live matches..." />
        )}

        {/* Error */}
        {!loading && error && (
          <ErrorMessage
            message={error}
            onRetry={fetchMatches}
          />
        )}

        {/* No Matches */}
        {!loading && !error && matches.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <div className="mb-4 text-5xl">
              ⚽
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              No Live Matches
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              There are currently no football matches
              being played. Check back later.
            </p>

            <button
              onClick={fetchMatches}
              className="mt-6 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Refresh
            </button>
          </div>
        )}

        {/* Matches */}
        {!loading && !error && matches.length > 0 && (
          <>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600">
                {matches.length}{" "}
                {matches.length === 1
                  ? "live match"
                  : "live matches"}
              </p>

              <button
                onClick={fetchMatches}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
              >
                Refresh
              </button>
            </div>

            <div className="grid gap-5">
              {matches.map((match) => (
                <MatchCard
                  key={match.fixture.id}
                  match={match}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default LiveMatches;