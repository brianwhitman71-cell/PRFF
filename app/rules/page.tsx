const sections = [
  {
    title: "League Format",
    items: [
      "Number of teams: TBD",
      "Regular season length: TBD weeks",
      "Playoff teams: TBD",
      "Championship week: TBD",
    ],
  },
  {
    title: "Roster Settings",
    items: [
      "QB: 1",
      "RB: 2",
      "WR: 2",
      "TE: 1",
      "Flex (RB/WR/TE): 1",
      "K: 1",
      "DEF: 1",
      "Bench: TBD",
    ],
  },
  {
    title: "Scoring",
    items: [
      "Passing TD: 4 pts",
      "Rushing/Receiving TD: 6 pts",
      "Every 25 passing yards: 1 pt",
      "Every 10 rushing/receiving yards: 1 pt",
      "Interception thrown: -2 pts",
      "Fumble lost: -2 pts",
    ],
  },
  {
    title: "Trade & Waiver Rules",
    items: [
      "Trade deadline: TBD",
      "Waiver type: TBD",
      "Waiver reset: TBD",
    ],
  },
  {
    title: "Dues & Payouts",
    items: [
      "Entry fee: TBD",
      "1st place: TBD",
      "2nd place: TBD",
      "Other prizes: TBD",
    ],
  },
];

export default function RulesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">📋 League Rules</h1>
      <p className="text-gray-400">
        Official rules and settings for the Parsons Run Fantasy Football league.
        Update these to match your league's configuration.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5"
          >
            <h2 className="font-semibold text-green-400 mb-3">
              {section.title}
            </h2>
            <ul className="space-y-1.5">
              {section.items.map((item) => (
                <li key={item} className="text-sm text-gray-300 flex gap-2">
                  <span className="text-green-600">•</span>
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
