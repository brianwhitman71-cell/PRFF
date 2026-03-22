const events = [
  {
    label: "Draft Day",
    description: "Annual fantasy draft — date and location TBD.",
    icon: "🎯",
    gradient: "from-red-700 to-red-500",
  },
  {
    label: "Regular Season End",
    description: "Last week of regular season matchups.",
    icon: "🏟️",
    gradient: "from-gray-600 to-gray-500",
  },
  {
    label: "Championship Week",
    description: "Playoffs culminate — champion crowned.",
    icon: "🏆",
    gradient: "from-amber-600 to-yellow-500",
  },
];

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-1">
          Schedule
        </p>
        <h1 className="text-3xl font-black text-white uppercase">📅 Events</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Important dates, deadlines, and league events.
        </p>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.label}
            className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-start gap-4 hover:border-red-800/50 transition-colors"
          >
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${event.gradient} flex items-center justify-center text-xl shadow-lg flex-shrink-0`}
            >
              {event.icon}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-white uppercase tracking-wide text-sm">{event.label}</span>
                <span className="text-xs bg-white/10 text-gray-500 px-2 py-0.5 rounded-full font-semibold uppercase">
                  TBD
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
