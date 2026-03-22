const sections = [
  {
    title: "League Format",
    icon: "🏟️",
    gradient: "from-red-700 to-red-500",
    items: [
      "Number of teams: TBD",
      "Regular season length: TBD weeks",
      "Playoff teams: TBD",
      "Championship week: TBD",
    ],
  },
  {
    title: "Roster Settings",
    icon: "📋",
    gradient: "from-gray-600 to-gray-500",
    items: ["QB: 1", "RB: 2", "WR: 2", "TE: 1", "Flex (RB/WR/TE): 1", "K: 1", "DEF: 1", "Bench: TBD"],
  },
  {
    title: "Scoring",
    icon: "🎯",
    gradient: "from-amber-600 to-yellow-500",
    items: [
      "Passing TD: 4 pts",
      "Rushing/Receiving TD: 6 pts",
      "Every 25 passing yards: 1 pt",
      "Every 10 rushing/receiving yards: 1 pt",
      "Interception thrown: −2 pts",
      "Fumble lost: −2 pts",
    ],
  },
  {
    title: "Trade & Waiver Rules",
    icon: "🔄",
    gradient: "from-red-800 to-red-600",
    items: ["Trade deadline: TBD", "Waiver type: TBD", "Waiver reset: TBD"],
  },
  {
    title: "Dues & Payouts",
    icon: "💰",
    gradient: "from-amber-500 to-yellow-400",
    items: ["Entry fee: TBD", "1st place: TBD", "2nd place: TBD", "Other prizes: TBD"],
  },
];

export default function RulesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
          League
        </p>
        <h1 className="text-3xl font-black text-white uppercase">📋 Rules</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Official rules and settings for Parsons Run Fantasy Football.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-red-800/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-9 h-9 rounded-lg bg-gradient-to-br ${section.gradient} flex items-center justify-center text-base shadow-md`}
              >
                {section.icon}
              </div>
              <h2 className="font-black text-white uppercase tracking-wide text-sm">
                {section.title}
              </h2>
            </div>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item} className="text-sm text-gray-500 flex gap-2 items-start">
                  <span className="text-red-600 mt-0.5 font-bold">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
