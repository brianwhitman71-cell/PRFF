import { cbsFetch } from "@/lib/cbs";

interface Team {
  id: string;
  name: string;
  owner: { name: string };
  wins: number;
  losses: number;
  points_for: number;
  points_against: number;
  rank: number;
}

async function getStandings(): Promise<Team[] | null> {
  try {
    const data = await cbsFetch("standings?");
    // CBS returns standings under body.standing or body.standings
    const raw = data?.body?.standing ?? data?.body?.standings ?? [];
    return raw;
  } catch {
    return null;
  }
}

export default async function LeaderboardPage() {
  const teams = await getStandings();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-1">
          League
        </p>
        <h1 className="text-3xl font-black text-white uppercase">🏆 Standings</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Live standings pulled from CBS Sports.
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
            {!teams || teams.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-gray-600 italic">
                  {teams === null
                    ? "Could not connect to CBS Sports — check credentials."
                    : "No standings data available yet."}
                </td>
              </tr>
            ) : (
              teams.map((team, i) => (
                <tr
                  key={team.id ?? i}
                  className="border-t border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-5 py-3 font-black text-amber-500">{team.rank ?? i + 1}</td>
                  <td className="px-5 py-3 font-semibold text-white">{team.name}</td>
                  <td className="px-5 py-3 text-gray-400">{team.owner?.name ?? "—"}</td>
                  <td className="px-5 py-3 text-right text-green-400 font-bold">{team.wins ?? "—"}</td>
                  <td className="px-5 py-3 text-right text-red-400 font-bold">{team.losses ?? "—"}</td>
                  <td className="px-5 py-3 text-right text-gray-300">{team.points_for ?? "—"}</td>
                  <td className="px-5 py-3 text-right text-gray-500">{team.points_against ?? "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-700 text-right">
        Data refreshes every 5 minutes from CBS Sports · League ID 1774188602
      </p>
    </div>
  );
}
