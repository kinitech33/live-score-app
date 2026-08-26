import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMatchDetails,
  getMatchEvents,
} from "../services/footballApi";

function MatchDetails() {
  const { id } = useParams();

  const [match, setMatch] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMatch = async () => {
      try {
        const [matchData, eventsData] = await Promise.all([
          getMatchDetails(id),
          getMatchEvents(id),
        ]);

        setMatch(matchData.response?.[0]);
        setEvents(eventsData.response || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMatch();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading match...
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="p-8 text-center text-red-600">
        {error || "Match not found"}
      </div>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-10">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            {match.league.name}
          </p>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex flex-1 flex-col items-center">
              <img
                src={match.teams.home.logo}
                alt={match.teams.home.name}
                className="h-20 w-20 object-contain"
              />

              <h2 className="mt-3 font-bold">
                {match.teams.home.name}
              </h2>
            </div>

            <div className="px-6">
              <p className="text-4xl font-bold">
                {match.goals.home ?? 0} -{" "}
                {match.goals.away ?? 0}
              </p>

              <p className="mt-2 text-red-600">
                {match.fixture.status.long}
              </p>
            </div>

            <div className="flex flex-1 flex-col items-center">
              <img
                src={match.teams.away.logo}
                alt={match.teams.away.name}
                className="h-20 w-20 object-contain"
              />

              <h2 className="mt-3 font-bold">
                {match.teams.away.name}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">
          Match Events
        </h2>

        {events.length === 0 ? (
          <p className="text-gray-500">
            No events available.
          </p>
        ) : (
          <div className="space-y-4">
            {events.map((event, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b pb-4"
              >
                <span className="font-bold">
                  {event.time.elapsed}'
                </span>

                <span>
                  {event.type} — {event.detail}
                </span>

                {event.player?.name && (
                  <span className="ml-auto text-gray-500">
                    {event.player.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default MatchDetails;