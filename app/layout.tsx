import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PRFF — Parsons Run Fantasy Football",
  description: "The official site of the Parsons Run Fantasy Football league",
};

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/leaderboard", label: "Standings" },
  { href: "/events", label: "Events" },
  { href: "/rules", label: "Rules" },
  { href: "/photos", label: "Media" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        {/* Top nav */}
        <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md bg-black/40">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg tracking-tight text-white hover:opacity-80 transition-opacity"
            >
              <span className="text-2xl">🏈</span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                PRFF
              </span>
            </Link>

            <nav className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
          {children}
        </main>

        <footer className="border-t border-white/10 text-center text-sm text-gray-600 py-5">
          © {new Date().getFullYear()} Parsons Run Fantasy Football · PRFF
        </footer>
      </body>
    </html>
  );
}
