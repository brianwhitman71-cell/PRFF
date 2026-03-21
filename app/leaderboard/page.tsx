export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">🏆 Leaderboard</h1>
      <p className="text-gray-400">
        Current standings will appear here. Add your league data to populate
        this page.
      </p>

      {/* Placeholder table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-900 text-green-100">
            <tr>
              <th className="px-4 py-3 text-left">Rank</th>
              <th className="px-4 py-3 text-left">Team</th>
              <th className="px-4 py-3 text-left">Owner</th>
              <th className="px-4 py-3 text-right">W</th>
              <th className="px-4 py-3 text-right">L</th>
              <th className="px-4 py-3 text-right">Pts For</th>
              <th className="px-4 py-3 text-right">Pts Against</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-800 text-gray-500 italic">
              <td colSpan={7} className="px-4 py-6 text-center">
                No data yet — add your league standings here.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
