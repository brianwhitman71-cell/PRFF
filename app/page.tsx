import Link from "next/link";

const quickLinks = [
  {
    href: "/leaderboard",
    label: "Standings",
    description: "Current league standings and scores",
    icon: "🏆",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    href: "/events",
    label: "Events",
    description: "Draft day, playoffs & key dates",
    icon: "📅",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    href: "/rules",
    label: "Rules",
    description: "Scoring, roster & league rules",
    icon: "📋",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    href: "/photos",
    label: "Media",
    description: "Photos from league events",
    icon: "📸",
    gradient: "from-green-500 to-teal-500",
  },
];

const stats = [
  { label: "Teams", value: "—" },
  { label: "Season", value: "2025" },
  { label: "Champion", value: "TBD" },
  { label: "Weeks Played", value: "—" },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative text-center py-16 overflow-hidden">
        {/* Dot pattern background */}
        <div className="absolute inset-0 dot-pattern pointer-events-none" />

        {/* Gradient blobs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">
            Welcome to
          </p>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-3 leading-tight">
            Parsons Run
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Fantasy Football
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-lg mx-auto">
            The official home of the PRFF league. Standings, events, rules, and
            more — all in one place.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center"
          >
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-0.5 uppercase tracking-wide">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
          Navigate
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className="gradient-card group p-5 block">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center text-xl mb-3 shadow-lg`}
              >
                {link.icon}
              </div>
              <div className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                {link.label}
              </div>
              <div className="text-sm text-gray-500 mt-1">{link.description}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
