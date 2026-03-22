"use client";

import { useRouter } from "next/navigation";

export default function StandingsTable({
  years,
  selectedYear,
}: {
  years: number[];
  selectedYear?: number;
}) {
  const router = useRouter();

  if (years.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
        Season
      </label>
      <select
        value={selectedYear ?? years[0]}
        onChange={(e) => router.push(`/leaderboard?year=${e.target.value}`)}
        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm font-semibold focus:outline-none focus:border-amber-500 cursor-pointer"
      >
        {years.map((y) => (
          <option key={y} value={y} className="bg-gray-900 text-white">
            {y} Season
          </option>
        ))}
      </select>
    </div>
  );
}
