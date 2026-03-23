import { getStandings } from "@/lib/standings";

export default async function LeaderboardPage() {
  const data = await getStandings();
  const teams = data?.standings ?? [];
  const displayYear = data?.year;
  const week = data?.week;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-1">
          League
        </p>
        <h1 className="text-3xl font-black text-white uppercase">
          🏆 Standings
          {displayYear && (
            <span className="ml-3 text-amber-400">{displayYear}</span>
          )}
          {week && (
            <span className="ml-2 text-lg text-gray-500 font-semibold normal-case">
              · Week {week}
            </span>
          )}
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          {process.env.SLEEPER_LEAGUE_ID
            ? "Live from Sleeper · updates every 5 minutes"
            : "Live from CBS Sports · updates every 5 minutes"}
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-gray-500 bg-white/5">
              <th className="px-5 py-4 text-left">Rank</th>
              <th className="px-5 py-4 text-left">Team</th>
              <th className="px-5 py-4 text-left">Owner</th>
              <th className="px-5 py-4 text-right">W</th>
              <th className="px-5 py-4 text-right">L</th>
              <th className="px-5 py-4 text-right">Pts For</th>
              <th className="px-5 py-4 text-right">Pts Against</th>
            </tr>
          </thead>
          <tbody>
            {teams.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-gray-600 italic">
                  {data === null
                    ? "Could not reach league data — check credentials."
                    : "No standings available yet."}
                </td>
              </tr>
            ) : (
              teams.map(
                (
                  team: {
                    rank: number;
                    team: string;
                    owner: string;
                    wins: string;
                    losses: string;
                    pointsFor: string;
                    pointsAgainst: string;
                  },
                  i: number
                ) => (
                  <tr
                    key={i}
                    className="border-t border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-5 py-3 font-black text-amber-500">
                      {team.rank ?? i + 1}
                    </td>
                    <td className="px-5 py-3 font-semibold text-white">{team.team}</td>
                    <td className="px-5 py-3 text-gray-400">{team.owner}</td>
                    <td className="px-5 py-3 text-right text-green-400 font-bold">{team.wins}</td>
                    <td className="px-5 py-3 text-right text-red-400 font-bold">{team.losses}</td>
                    <td className="px-5 py-3 text-right text-gray-300">{team.pointsFor}</td>
                    <td className="px-5 py-3 text-right text-gray-500">{team.pointsAgainst}</td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
