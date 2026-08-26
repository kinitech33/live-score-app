import { Link } from "react-router-dom";

function MatchCard({ match }) {
  const fixture = match.fixture;
  const homeTeam = match.teams.home;
  const awayTeam = match.teams.away;
  const isFinished = ["FT", "AET", "PEN"].includes(fixture.status.short);

  return (
    <Link
      to={`/match/${fixture.id}`}
      className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
        <span>{match.league.name}</span>
        <span>{fixture.status.short}</span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-center">
        <div className="flex items-center justify-end gap-3 font-semibold text-gray-900">
          <span>{homeTeam.name}</span>
          <img src={homeTeam.logo} alt="" className="h-10 w-10 object-contain" />
        </div>

        <div className="min-w-16 text-xl font-bold text-gray-900">
          {isFinished || fixture.status.elapsed ? (
            <span>{match.goals.home ?? 0} - {match.goals.away ?? 0}</span>
          ) : (
            <span>{new Date(fixture.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          )}
        </div>

        <div className="flex items-center justify-start gap-3 font-semibold text-gray-900">
          <img src={awayTeam.logo} alt="" className="h-10 w-10 object-contain" />
          <span>{awayTeam.name}</span>
        </div>
      </div>
    </Link>
  );
}

export default MatchCard;