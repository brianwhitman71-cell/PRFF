import Link from "next/link";

const quickLinks = [
  {
    href: "/leaderboard",
    label: "Leaderboard",
    description: "Current standings and scores",
    icon: "🏆",
  },
  {
    href: "/events",
    label: "Events",
    description: "Important dates and upcoming events",
    icon: "📅",
  },
  {
    href: "/rules",
    label: "Rules",
    description: "League rules and scoring settings",
    icon: "📋",
  },
  {
    href: "/photos",
    label: "Photos",
    description: "Memories from league events",
    icon: "📸",
  },
];

export default function Home() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-extrabold text-white mb-3">
          Parsons Run
          <br />
          <span className="text-green-400">Fantasy Football</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Welcome to the official home of the PRFF league. Stay up to date on
          standings, events, and more.
        </p>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="text-xl font-semibold text-gray-300 mb-4">
          Quick Links
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-green-600 hover:bg-gray-800 transition-all group"
            >
              <div className="text-3xl mb-2">{link.icon}</div>
              <div className="font-semibold text-white group-hover:text-green-400 transition-colors">
                {link.label}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {link.description}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
