import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  {
    href: "/leaderboard",
    label: "Standings",
    description: "Current league standings and scores",
    icon: "🏆",
    gradient: "from-amber-500 to-yellow-600",
  },
  {
    href: "/events",
    label: "Events",
    description: "Draft day, playoffs & key dates",
    icon: "📅",
    gradient: "from-red-700 to-red-500",
  },
  {
    href: "/rules",
    label: "Rules",
    description: "Scoring, roster & league rules",
    icon: "📋",
    gradient: "from-gray-600 to-gray-500",
  },
  {
    href: "/photos",
    label: "Media",
    description: "Photos from league events",
    icon: "📸",
    gradient: "from-red-600 to-amber-500",
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
        <div className="absolute inset-0 dot-pattern pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-red-800/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-700/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-3">
            Official League Site
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-3 leading-tight uppercase tracking-tight">
            Parsons Run
            <br />
            <span className="bg-gradient-to-r from-red-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              Fantasy Football
            </span>
          </h1>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
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
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
          >
            <div className="text-2xl font-black text-white">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest font-semibold">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* Loser Sign */}
      <section className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <Image
          src="/loser-sign.jpg"
          alt="Parsons Run Fantasy Football Last Place Loser yard sign"
          width={1280}
          height={960}
          className="w-full object-cover max-h-[480px]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-1">
            League Tradition
          </p>
          <h2 className="text-2xl font-black text-white uppercase leading-tight">
            Last Place Gets the Sign
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Finish last and the whole neighborhood knows it.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4">
          Navigate
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className="gradient-card group p-5 block">
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.gradient} flex items-center justify-center text-xl mb-3 shadow-lg`}
              >
                {link.icon}
              </div>
              <div className="font-bold text-white uppercase tracking-wide text-sm group-hover:text-amber-400 transition-colors">
                {link.label}
              </div>
              <div className="text-sm text-gray-600 mt-1">{link.description}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
