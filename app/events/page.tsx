export default function EventsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">📅 Events</h1>
      <p className="text-gray-400">
        Important dates, deadlines, and league events.
      </p>

      {/* Placeholder events */}
      <div className="space-y-3">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex gap-5 items-start">
          <div className="bg-green-900 text-green-100 rounded-lg px-3 py-2 text-center min-w-[60px]">
            <div className="text-xs uppercase tracking-wide">TBD</div>
            <div className="text-2xl font-bold">—</div>
          </div>
          <div>
            <div className="font-semibold text-white">Draft Day</div>
            <div className="text-sm text-gray-400 mt-1">
              Annual fantasy draft — date and location TBD.
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex gap-5 items-start">
          <div className="bg-green-900 text-green-100 rounded-lg px-3 py-2 text-center min-w-[60px]">
            <div className="text-xs uppercase tracking-wide">TBD</div>
            <div className="text-2xl font-bold">—</div>
          </div>
          <div>
            <div className="font-semibold text-white">Regular Season End</div>
            <div className="text-sm text-gray-400 mt-1">
              Last week of regular season matchups.
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex gap-5 items-start">
          <div className="bg-green-900 text-green-100 rounded-lg px-3 py-2 text-center min-w-[60px]">
            <div className="text-xs uppercase tracking-wide">TBD</div>
            <div className="text-2xl font-bold">—</div>
          </div>
          <div>
            <div className="font-semibold text-white">Championship Week</div>
            <div className="text-sm text-gray-400 mt-1">
              Playoffs culminate — champion crowned.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
