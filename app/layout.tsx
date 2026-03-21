import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parsons Run Fantasy Football",
  description: "The official site of the Parsons Run Fantasy Football league",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/events", label: "Events" },
  { href: "/rules", label: "Rules" },
  { href: "/photos", label: "Photos" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100">
        <header className="bg-green-900 border-b border-green-700 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white hover:text-green-300 transition-colors">
              🏈 PRFF
              <span className="ml-2 text-sm font-normal text-green-300 hidden sm:inline">
                Parsons Run Fantasy Football
              </span>
            </Link>
            <nav className="flex gap-1 flex-wrap justify-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-md text-sm font-medium text-green-100 hover:bg-green-700 hover:text-white transition-colors"
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

        <footer className="bg-gray-900 border-t border-gray-800 text-center text-sm text-gray-500 py-4">
          © {new Date().getFullYear()} Parsons Run Fantasy Football
        </footer>
      </body>
    </html>
  );
}
