import { getSleeperStandings, type StandingsResult } from "./sleeper";
import { cbsFetch } from "./cbs";

export async function getStandings(): Promise<StandingsResult | null> {
  const leagueId = process.env.SLEEPER_LEAGUE_ID;

  if (leagueId) {
    return getSleeperStandings(leagueId);
  }

  // Fallback: CBS Sports API
  try {
    const data = await cbsFetch("standings?");
    const raw = data?.body?.standings ?? [];
    const year: number = data?.body?.season ?? new Date().getFullYear();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const standings = raw.map((entry: any, i: number) => ({
      rank: i + 1,
      team: entry.team?.alias ?? entry.team?.name ?? "—",
      owner: entry.team?.owners?.[0]?.name ?? "—",
      wins: String(entry.wins ?? "—"),
      losses: String(entry.losses ?? "—"),
      pointsFor: String(entry.points_for ?? "—"),
      pointsAgainst: String(entry.points_against ?? "—"),
    }));

    return { standings, year };
  } catch {
    return null;
  }
}
