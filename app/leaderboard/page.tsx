export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-1">
          League
        </p>
        <h1 className="text-3xl font-black text-white uppercase">🏆 Standings</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Current standings — add your league data to populate this table.
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
            <tr>
              <td colSpan={7} className="px-5 py-10 text-center text-gray-600 italic">
                No data yet — add your league standings here.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
