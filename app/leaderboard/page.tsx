const SCRAPER_URL = "https://prff-scraper-production.up.railway.app";

interface Team {
  rank: number;
  team: string;
  owner: string;
  wins: string;
  losses: string;
  pointsFor: string;
  pointsAgainst: string;
}

async function getStandings(): Promise<{ standings: Team[]; updatedAt: string | null } | null> {
  try {
    const res = await fetch(`${SCRAPER_URL}/standings`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function LeaderboardPage() {
  const data = await getStandings();
  const teams = data?.standings ?? [];
  const updatedAt = data?.updatedAt
    ? new Date(data.updatedAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-1">
          League
        </p>
        <h1 className="text-3xl font-black text-white uppercase">🏆 Standings</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Live standings scraped from CBS Sports — updates every hour.
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
                    ? "Could not reach scraper service — check Railway deployment."
                    : "Scraper is warming up — standings will appear within a few minutes."}
                </td>
              </tr>
            ) : (
              teams.map((team, i) => (
                <tr
                  key={i}
                  className="border-t border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-5 py-3 font-black text-amber-500">{team.rank ?? i + 1}</td>
                  <td className="px-5 py-3 font-semibold text-white">{team.team}</td>
                  <td className="px-5 py-3 text-gray-400">{team.owner}</td>
                  <td className="px-5 py-3 text-right text-green-400 font-bold">{team.wins}</td>
                  <td className="px-5 py-3 text-right text-red-400 font-bold">{team.losses}</td>
                  <td className="px-5 py-3 text-right text-gray-300">{team.pointsFor}</td>
                  <td className="px-5 py-3 text-right text-gray-500">{team.pointsAgainst}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-700 text-right">
        {updatedAt ? `Last updated ${updatedAt}` : "Waiting for first scrape..."} · Updates hourly
      </p>
    </div>
  );
}
